import {
  SearchBarWrapperInner,
  SearchBarWrapperOuter,
  SearchIconWrapper,
  SearchIconImg,
  SearchInputWrapper,
} from "./SearchBar.styled";
import SearchIcon from "../../assets/images/search-icon.png";
import { useState, useMemo } from "react";
import { debounce } from "../../utils/debounce";

interface SearchBarProps {
  width?: string;
  paddingLeft?: string;
  onSearchChange?: (value: string) => void;
  onChange?: (value: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  width,
  paddingLeft,
  onSearchChange,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedOnChange = useMemo(() => {
    return debounce((value: string) => {
      if (onChange) {
        onChange(value);
      }
    }, 300);
  }, [onChange]);

  const handleSearch = () => {
    if (inputValue.trim() && onSearchChange) {
      onSearchChange(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    debouncedOnChange(value);
  };

  return (
    <SearchBarWrapperOuter style={{ paddingLeft }}>
      <SearchBarWrapperInner style={{ width }}>
        <SearchIconWrapper onClick={handleSearch}>
          <SearchIconImg src={SearchIcon} />
        </SearchIconWrapper>

        <SearchInputWrapper>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </SearchInputWrapper>
      </SearchBarWrapperInner>
    </SearchBarWrapperOuter>
  );
};

export default SearchBar;
