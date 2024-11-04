import { useChatContext } from '@/providers/ChatProvider';

import {
  AutocompleteInput,
  AutocompleteInputStyled,
  IconSearch,
} from '../SearchInput/SearchInputStyled';

const SearchInputDMs = () => {
  const {
    dataUserChats,
    setFilteredPrivateChats,
    searchedValue,
    setSearchedValue,
  } = useChatContext();

  const handleSearchChange = e => {
    const value = e.target.value.toLowerCase();
    setSearchedValue(value);
    setFilteredPrivateChats(
      dataUserChats.filter(chat =>
        chat.companion.userName.toLowerCase().startsWith(value)
      )
    );
  };

  return (
    <AutocompleteInputStyled>
      <AutocompleteInput
        type="text"
        value={searchedValue}
        onChange={handleSearchChange}
        placeholder="Search companion..."
      />
      <IconSearch />
    </AutocompleteInputStyled>
  );
};

export default SearchInputDMs;
