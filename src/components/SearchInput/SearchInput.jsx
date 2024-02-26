import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataCountryToBackend } from '@/redux-store/AuthOperations/AuthOperations.js';
import {
  getUserId,
  getPersistedToken,
} from '@/redux-store/AuthOperations/selectors';

import mapData from '@/data/countries.json';
import Icons from '../Icons/Icons';
import {
  AutocompleteInputStyled,
  AutocompleteInput,
  IconSearch,
  ListWrapper,
  ListItems,
  Item,
  Flag,
  ScrollBar,
} from './SearchInputStyled';

const SearchInput = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [showItem, setShowItem] = useState(false);
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
  };

  const handleCountryClick = country => {
    const countryData = {
      name: country.properties.ADMIN,
      flagCode: country.properties.code,
    };

    setSearchedValue(country.properties.ADMIN);
    setShowItem(false);
    dispatch(
      sendDataCountryToBackend({ userId, countryDto: countryData, token })
    );
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
            <ScrollBar>
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
            </ScrollBar>
          </ListItems>
        </ListWrapper>
      )}
    </AutocompleteInputStyled>
  );
};

export default SearchInput;
