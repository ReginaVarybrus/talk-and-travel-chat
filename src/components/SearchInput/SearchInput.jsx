import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig';
import PropTypes from 'prop-types';
import { getUser } from '@/redux-store/selectors.js';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
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
  setParticipantsAmount,
}) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [showItem, setShowItem] = useState(false);
  const autoCompleteRef = useRef(null);
  const userId = useSelector(getUser)?.id;
  const { responseData: dataMainCountryChat } = useFetch(
    selectedCountry ? ULRs.getMainCountryChatByName(selectedCountry, '') : null
  );
  const { responseData: dataUserCountries } = useFetch(
    ULRs.userCountries(userId, '')
  );
  const filterCountries = mapData.features.filter(name =>
    name.properties.ADMIN.toLowerCase().includes(searchedValue.toLowerCase())
  );

  useEffect(() => {
    if (dataMainCountryChat) {
      setChatData(dataMainCountryChat);
      setParticipantsAmount(dataMainCountryChat.usersCount);
      setIsSubscribed(true);
    }
  }, [dataMainCountryChat, setChatData]);

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
    const nameOfCountry = dataUserCountries.find(
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
    setIsChatVisible(true);
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
                    key={country.properties.ADMIN}
                    onClick={() => handleCountryClick(country)}
                  >
                    <Flag
                      loading="lazy"
                      width="48"
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
    </AutocompleteInputStyled>
  );
};

SearchInput.propTypes = {
  setChatData: PropTypes.func,
  setIsSubscribed: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
  setIsChatVisible: PropTypes.func,
};

export default SearchInput;
