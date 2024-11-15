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
    const { value } = e.target;
    setSearchedValue(value);

    setFilteredPrivateChats(
      dataUserChats.filter(chat => {
        const fullName = chat.companion.userName.toLowerCase();
        const [firstName, lastName] = fullName.split(' ');
        return (
          fullName.startsWith(value.toLowerCase()) ||
          (firstName && firstName.startsWith(value.toLowerCase())) ||
          (lastName && lastName.startsWith(value.toLowerCase()))
        );
      })
    );
  };

  return (
    <AutocompleteInputStyled>
      <AutocompleteInput
        type="text"
        value={searchedValue}
        onChange={handleSearchChange}
        placeholder="Search contact..."
      />
      <IconSearch />
    </AutocompleteInputStyled>
  );
};

export default SearchInputDMs;
