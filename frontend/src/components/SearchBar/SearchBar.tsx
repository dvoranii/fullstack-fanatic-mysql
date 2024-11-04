import {
  SearchBarWrapperInner,
  SearchBarWrapperOuter,
  SearchIconWrapper,
  SearchIconImg,
  SearchInputWrapper,
} from "./SearchBar.styled";
import SearchIcon from "../../assets/images/search-icon.png";
import { useState } from "react";

interface SearchBarProps {
  width?: string;
  paddingLeft?: string;
  onSearchChange?: (value: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  width,
  paddingLeft,
  onSearchChange,
}) => {
  const [inputValue, setInputValue] = useState("");

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
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </SearchInputWrapper>
      </SearchBarWrapperInner>
    </SearchBarWrapperOuter>
  );
};

export default SearchBar;
