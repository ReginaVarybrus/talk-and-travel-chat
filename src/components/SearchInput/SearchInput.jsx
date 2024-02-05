import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
import {
  AutocompleteInputWrapper,
  AutocompleteInput,
  IconSearch,
  ListWrapper,
  ListItems,
  Item,
  Flag,
} from './SearchInputStyled';
import { sendDataCountryToBackend} from '../../redux-store/AuthOperations/AuthOperations.js';
// import { addCountryRoom } from '../../redux-store/slices/roomSlise.js';
import { getUserId, getPersistedToken } from 'redux-store/AuthOperations/selectors';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import Icons from '../Icons/Icons';
import mapData from '../../data/countries.json';

export default function SearchInput({socket}) {
  const [searchedValue, setSearchedValue] = useState('');
  const [showItem, setShowItem] = useState(false);
  // const [socket, setSocket] = useState(null);
  // const [selectedCountryRooms, setSelectedCountryRooms] = useState([]);
  const autoCompleteRef = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const token = useSelector(getPersistedToken);

  const filterCountries = mapData.features.filter(name =>
    name.properties.ADMIN.toLowerCase().includes(searchedValue.toLowerCase())
  );

  const handleChange = event => {
    setSearchedValue(event.target.value);
    if (event.target.value !== '') {
      event.target.style.border = '1px solid var(--color-blue-4)';
    } else {
      event.target.style.border = '1px solid var(--color-grey-7)';
    }
    console.log(event.target.value);
  };

  const handleCountryClick = country => {
    const countryData = {
      name: country.properties.ADMIN,
      flagCode: country.properties.code,
    };

    if (socket) {
      socket.emit('createRoom', country);
    }

    setSearchedValue(country.properties.ADMIN);
    setShowItem(false);
    // dispatch(addCountryRoom(country));
    dispatch(sendDataCountryToBackend({userId, countryDto: countryData, token}));
    console.log('data to send', countryData);
    // console.log('choose country', country.properties.ADMIN);
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target)
      ) {
        setShowItem(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   const socketInstance = io(''); 

  //   socketInstance.on('updateRoomList', (rooms) => {
  //     setSelectedCountryRooms(rooms);
  //   });

  //   setSocket(socketInstance);

  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // }, []);

  return (
    <AutocompleteInputWrapper ref={autoCompleteRef}>
      <AutocompleteInput
        type="text"
        value={searchedValue}
        onClick={() => setShowItem(!showItem)}
        onChange={handleChange}
        placeholder="Search..."
      />
      <IconSearch>
        <Icons name="search" fill="var(--color-grey-7)" size="16" />
      </IconSearch>

      {showItem && (
        <ListWrapper>
          <ListItems>
            <SimpleBar style={{ maxHeight: 570 }} autoHide={false}>
              {filterCountries === 0 ? (
                <p>BlaBla</p>
              ) : (
                <>
                  {filterCountries.map((country, index) => (
                    <Item
                      key={index}
                      onClick={() => handleCountryClick(country)}
                    >
                      <Flag
                        loading="lazy"
                        width="32"
                        srcSet={`https://flagcdn.com/w40/${country.properties.code}.png 2x`}
                        src={`https://flagcdn.com/w20/${country.properties.code}.png`}
                        alt={`${country.properties.ADMIN} flag`}
                      />
                      <p>{country.properties.ADMIN}</p>
                    </Item>
                  ))}
                </>
              )}
            </SimpleBar>
          </ListItems>
        </ListWrapper>
      )}
    </AutocompleteInputWrapper>
  );
}
