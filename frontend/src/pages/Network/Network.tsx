import {
  NetworkTitleBanner,
  SearchBarWrapper,
  UserListWrapper,
  NetworkDefaultContent,
  NetworkIconWrapper,
} from "./Network.styled";
import SearchBar from "../../components/SearchBar/SearchBar";
import NetworkIcon from "../../assets/images/networking-icon.png";

export const NetworkPage: React.FC = () => {
  return (
    <>
      <NetworkTitleBanner>
        <h2>Network</h2>
      </NetworkTitleBanner>

      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <UserListWrapper>
        <NetworkDefaultContent>
          <h3>
            Utilize our database of users to connect with real-world<br></br>
            professionals
          </h3>
          <NetworkIconWrapper>
            <img src={NetworkIcon} alt="Network Image" />
          </NetworkIconWrapper>
        </NetworkDefaultContent>
      </UserListWrapper>
    </>
  );
};

export default NetworkPage;
