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
}
const SearchBar: React.FC<SearchBarProps> = ({ width, paddingLeft }) => {
  return (
    <SearchBarWrapperOuter style={{ paddingLeft }}>
      <SearchBarWrapperInner style={{ width }}>
        <SearchIconWrapper>
          <SearchIconImg src={SearchIcon} />
        </SearchIconWrapper>

        <SearchInputWrapper>
          <input type="text" placeholder="Search..." />
        </SearchInputWrapper>
      </SearchBarWrapperInner>
    </SearchBarWrapperOuter>
  );
};

export default SearchBar;
