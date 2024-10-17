import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { routesPath } from '@/routes/routesConfig';
import PropTypes from 'prop-types';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/constants/constants';
import mapData from '@/data/countries.json';
import { useNavigate } from 'react-router-dom';
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

const SearchInput = ({
  setChatData,
  setIsSubscribed,
  setIsShowJoinBtn,
  setIsChatVisible,
  subscriptionRooms,
  setParticipantsAmount,
}) => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [showItem, setShowItem] = useState(false);
  const autoCompleteRef = useRef(null);
  const { responseData } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry) : null
  );

  const filterCountries = mapData.filter(name =>
    name.properties.admin.toLowerCase().includes(searchedValue.toLowerCase())
  );

  useEffect(() => {
    if (responseData) {
      setChatData(responseData);
      setParticipantsAmount(responseData.usersCount);
      setIsSubscribed(true);
    }
    // console.log('map data', mapData);
  }, [responseData, setChatData]);

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
    const countryName = country.properties.admin;
    setSelectedCountry(countryName);
    const nameOfCountry = subscriptionRooms.find(
      item => item.name === countryName
    );
    if (nameOfCountry) {
      setIsShowJoinBtn(false);
    } else {
      setIsShowJoinBtn(true);
    }

    setSearchedValue(countryName);
    setShowItem(false);
    navigate(routesPath.ROOMS);
    if (!isDesktop) {
      setIsChatVisible(true);
    }
    setSearchedValue('');
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
                    key={country.properties.admin}
                    onClick={() => handleCountryClick(country)}
                  >
                    <Flag
                      loading="lazy"
                      width="48"
                      srcSet={`https://flagcdn.com/w40/${country.properties.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${country.properties.code.toLowerCase()}.png`}
                      alt={`${country.properties.admin} flag`}
                    />
                    <p>{country.properties.admin}</p>
                  </Item>
                ))}
              </>
            )}
          </ScrollBar>
        </ListItemsStyled>
      )}
    </AutocompleteInputStyled>
  );
};

SearchInput.propTypes = {
  setChatData: PropTypes.func,
  setIsSubscribed: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
  setIsChatVisible: PropTypes.func,
  subscriptionRooms: PropTypes.array,
  setParticipantsAmount: PropTypes.func,
};

export default SearchInput;
