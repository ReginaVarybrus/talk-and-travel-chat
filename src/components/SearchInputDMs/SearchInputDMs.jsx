import { useChatContext } from '@/providers/ChatProvider';

import {
  AutocompleteInput,
  AutocompleteInputStyled,
  IconSearch,
} from '../SearchInput/SearchInputStyled';

const SearchInputDMs = () => {
  const { searchedValue, setSearchedValue } = useChatContext();

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchedValue(value);
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
