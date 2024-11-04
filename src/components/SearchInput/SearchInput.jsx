import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import { routesPath } from '@/routes/routesConfig';
import PropTypes from 'prop-types';
import { useFetch } from '@/hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '@/providers/ChatProvider';
import { axiosClient } from '@/services/api';
import URLs from '@/constants/constants';
import { TbUsers } from 'react-icons/tb';

import {
  AutocompleteInputStyled,
  AutocompleteInput,
  IconSearch,
  ListItemsStyled,
  Item,
  Flag,
  ScrollBar,
  Text,
  NameAndCountStyleBox,
} from './SearchInputStyled';
import Loader from '../Loader/Loader';

const SearchInput = ({
  setChatData,
  setIsSubscribed,
  setIsShowJoinBtn,
  setIsChatVisible,
  setParticipantsAmount,
}) => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [showItem, setShowItem] = useState(false);
  const autoCompleteRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const { subscriptionRooms } = useChatContext();

  const fetchCountryList = async () => {
    setIsFetching(true);
    try {
      const response = await axiosClient.get(URLs.getCountries, {
        params: {
          size: 1000,
        },
      });

      const { content } = response.data;

      setCountries(content);
      return content;
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const { responseData } = useFetch(
    selectedCountry ? URLs.getMainCountryChatByName(selectedCountry) : null
  );
  const lowerCaseSearch = searchedValue.toLowerCase();

  const sortedData = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const startsWithFilter = sortedData.filter(item =>
    item.name.toLowerCase().startsWith(lowerCaseSearch)
  );

  const containsFilter = sortedData.filter(
    item =>
      !item.name.toLowerCase().startsWith(lowerCaseSearch) &&
      item.name.toLowerCase().includes(lowerCaseSearch)
  );

  const filterCountries = [...startsWithFilter, ...containsFilter];

  useEffect(() => {
    if (responseData) {
      setChatData(responseData);
      setParticipantsAmount(responseData.usersCount);
      setIsSubscribed(true);
    }
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

  const handleClick = () => {
    fetchCountryList();
    setShowItem(!showItem);
  };
  const handleCountryClick = country => {
    const countryName = country.name;
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
        placeholder="Search country..."
      />
      <IconSearch />
      {showItem && (
        <ListItemsStyled>
          <ScrollBar>
            {isFetching ? (
              <Loader size={40} />
            ) : !filterCountries.length ? (
              <Text>
                Sorry, the room for this country does not exist, try creating
                one yourself
              </Text>
            ) : (
              <>
                {filterCountries.map(country => (
                  <Item
                    key={country.id}
                    onClick={() => handleCountryClick(country)}
                  >
                    <NameAndCountStyleBox>
                      <Flag
                        loading="lazy"
                        width="48"
                        srcSet={`https://flagcdn.com/${country.country.flagCode.toLowerCase()}.svg 2x`}
                        src={`https://flagcdn.com/${country.country.flagCode.toLowerCase()}.svg`}
                        alt={`${country.name} flag`}
                      />
                      <p>{country.name}</p>
                    </NameAndCountStyleBox>
                    <span>
                      <TbUsers />
                      {country.usersCount}
                    </span>
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
  setParticipantsAmount: PropTypes.func,
};

export default SearchInput;
