import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors';
import { useFetch } from '@/hooks/useFetch.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import mapData from '@/data/countries.json';
import {
  AutocompleteInputStyled,
  AutocompleteInput,
  IconSearch,
  ListItemsStyled,
  Item,
  Flag,
  ScrollBar,
  Text,
} from './SearchInputStyled';
import ModalCreateRoom from '../ModalCreateRoom/ModalCreateRoom';

const SearchInput = ({ setCurrentCountryRoom, onDataReceived }) => {
  const [open, setOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [createdCountries, setCreatedCountries] = useState([]);
  const [dataToCreate, setDataToCreate] = useState({});
  const [showItem, setShowItem] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const autoCompleteRef = useRef(null);
  const userId = useSelector(getUser)?.id;

  const { responseData } = useFetch(ULRs.countries);

  const {
    subscribeToCountryRoom,
    createCountryRoom,
    updateCountryRoom,
    isConnected,
  } = useWebSocket();

  useEffect(() => {
    if (isConnected && selectedCountry) {
      subscribeToCountryRoom(selectedCountry, onDataReceived);
      setCurrentCountryRoom(selectedCountry);
      console.log('Subscribe succesfull');
    }
  }, [isConnected, selectedCountry]);

  useEffect(() => {
    if (responseData) {
      setCreatedCountries(responseData);
    }
  }, [responseData]);

  const filterCountries = mapData.features.filter(name =>
    name.properties.ADMIN.toLowerCase().includes(searchedValue.toLowerCase())
  );

  const handleChange = event => {
    const { value } = event.target;
    setSearchedValue(value);
    if (event.target.value !== '') {
      event.target.style.border = '1px solid var(--color-blue-4)';
    } else {
      event.target.style.border = '1px solid var(--color-grey-7)';
    }
  };

  const handleClick = () => setShowItem(!showItem);

  const handleCountryClick = country => {
    const countryName = country.properties.ADMIN;
    setSelectedCountry(countryName);
    const selectedItem = createdCountries.find(
      item => item.name === countryName
    );

    const dataToUpdate = {
      id: selectedItem ? selectedItem.id : null,
      userId,
    };

    setSearchedValue(countryName);
    setShowItem(false);

    if (selectedItem) {
      updateCountryRoom(countryName, dataToUpdate);
    } else {
      setOpen(true);
      setDataToCreate({
        userId,
        name: countryName,
        flagCode: country.properties.code,
      });
    }

    setSearchedValue('');
  };

  const handleCreateCountryRoom = () => {
    createCountryRoom(dataToCreate.name, dataToCreate);
    setSelectedCountry(dataToCreate.name);
    setOpen(false);
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

  return (
    <AutocompleteInputStyled ref={autoCompleteRef}>
      <AutocompleteInput
        type="text"
        value={searchedValue}
        onClick={handleClick}
        onChange={handleChange}
        placeholder="Search..."
      />
      <IconSearch />
      {showItem && (
        <ListItemsStyled>
          <ScrollBar>
            {!filterCountries.length ? (
              <Text>
                Sorry, the room for this country does not exist, try creating
                one yourself
              </Text>
            ) : (
              <>
                {filterCountries.map(country => (
                  <Item
                    key={country.properties.code}
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
          </ScrollBar>
        </ListItemsStyled>
      )}
      <ModalCreateRoom
        open={open}
        setOpen={setOpen}
        handleCreateCountryRoom={handleCreateCountryRoom}
        selectedCountry={selectedCountry}
      />
    </AutocompleteInputStyled>
  );
};

export default SearchInput;
