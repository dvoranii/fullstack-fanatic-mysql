import {
  SearchBarWrapper,
  SearchIconWrapper,
  SearchIconImg,
  SearchInputWrapper,
} from "./SearchBar.styled";
import SearchIcon from "../../assets/images/search-icon.png";

const SearchBar: React.FC = () => {
  return (
    <>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <SearchIconImg src={SearchIcon} />
        </SearchIconWrapper>

        <SearchInputWrapper>
          <input type="text" placeholder="Search conversations..." />
        </SearchInputWrapper>
      </SearchBarWrapper>
    </>
  );
};

export default SearchBar;
