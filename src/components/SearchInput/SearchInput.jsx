import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataCountryToBackend } from '@/redux-store/AuthOperations/AuthOperations.js';
import { getUser } from '@/redux-store/selectors';

import mapData from '@/data/countries.json';
import {
  AutocompleteInputStyled,
  AutocompleteInput,
  IconSearch,
  ListWrapper,
  ListItems,
  Item,
  Flag,
  ScrollBar,
  Text,
} from './SearchInputStyled';

const SearchInput = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [showItem, setShowItem] = useState(false);
  const autoCompleteRef = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(getUser)?.id;

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
    const countryData = {
      name: country.properties.ADMIN,
      flagCode: country.properties.code,
    };

    setSearchedValue(country.properties.ADMIN);
    setShowItem(false);
    dispatch(sendDataCountryToBackend({ userId, countryDto: countryData }));
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
        <ListWrapper>
          <ListItems>
            <ScrollBar>
              {!filterCountries.length ? (
                <Text>
                  Sorry, the room for this country does not exist, try creating
                  one yourself
                </Text>
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
