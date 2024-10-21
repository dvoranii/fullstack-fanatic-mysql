import {
  SearchBarWrapperInner,
  SearchBarWrapperOuter,
  SearchIconWrapper,
  SearchIconImg,
  SearchInputWrapper,
} from "./SearchBar.styled";
import SearchIcon from "../../assets/images/search-icon.png";

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
  return (
    <SearchBarWrapperOuter style={{ paddingLeft }}>
      <SearchBarWrapperInner style={{ width }}>
        <SearchIconWrapper>
          <SearchIconImg src={SearchIcon} />
        </SearchIconWrapper>

        <SearchInputWrapper>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </SearchInputWrapper>
      </SearchBarWrapperInner>
    </SearchBarWrapperOuter>
  );
};

export default SearchBar;
