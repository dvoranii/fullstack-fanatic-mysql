import { Helmet } from "react-helmet-async";
import { useState, useEffect, useContext } from "react";
import {
  SearchBarWrapper,
  UserListWrapper,
  NetworkDefaultContent,
  NetworkIconWrapper,
  FilterOption,
  FilterOptionWrapper,
} from "./Network.styled";
import SearchBar from "../../components/SearchBar/SearchBar";
import NetworkIcon from "../../assets/images/networking-image.png";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import { searchUsers } from "../../services/networkService";
import { User } from "../../types/User/User";
import UserList from "../../components/UserList/UserList";
import { UserContext } from "../../context/UserContext";
import {
  followUser,
  unfollowUser,
  fetchFollowing,
} from "../../services/followService";
import { PageWrapper } from "../../PageWrapper.styled";
import { useCsrfToken } from "../../hooks/useCsrfToken";

export const NetworkPage: React.FC = () => {
  const csrfToken = useCsrfToken();
  const userContext = useContext(UserContext);
  const loggedInUser = userContext?.profile;

  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"name" | "profession">(
    "name"
  );

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        if (loggedInUser) {
          const followingData = await fetchFollowing(loggedInUser.id);
          const followingIds = followingData.map((user: User) => user.id);
          setFollowing(followingIds);
        }
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowingList();
  }, [loggedInUser]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      setMessage("No users found");
      return;
    }

    setIsSearching(true);
    setMessage("");
    try {
      const users = await searchUsers(query, activeFilter);
      if (users.length === 0) {
        setMessage("No users found");
      }
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("An error occured while searching");
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilterChange = (filter: "name" | "profession") => {
    setActiveFilter(filter);
  };

  const handleFollow = async (userId: number) => {
    try {
      const status = await followUser(userId, csrfToken);
      if (status === 200) {
        setFollowing((prev) => [...prev, userId]);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId: number) => {
    setFollowing((prev) => prev.filter((id) => id !== userId));
    try {
      const status = await unfollowUser(userId, csrfToken);
      if (status !== 200) {
        setFollowing((prev) => [...prev, userId]);
      }
    } catch (error) {
      setFollowing((prev) => [...prev, userId]);
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = (userId: number) => following.includes(userId);

  return (
    <>
      <Helmet>
        <title>Network - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Utilize our database of users to connect with real-world professionals."
        />
      </Helmet>
      <TitleBanner textContent="Network" />
      <SearchBarWrapper>
        <SearchBar onSearchChange={handleSearch} className="network-search" />
        <FilterOptionWrapper>
          <span>Search by:</span>
          <FilterOption
            isActive={activeFilter === "name"}
            onClick={() => handleFilterChange("name")}
          >
            User Name
          </FilterOption>
          &nbsp;&nbsp;|
          <FilterOption
            isActive={activeFilter === "profession"}
            onClick={() => handleFilterChange("profession")}
          >
            User Profession
          </FilterOption>
        </FilterOptionWrapper>
      </SearchBarWrapper>

      <PageWrapper>
        <UserListWrapper>
          {isSearching ? (
            <p>Loading...</p>
          ) : users.length > 0 ? (
            <UserList
              users={users}
              loggedInUserId={loggedInUser?.id}
              isFollowing={isFollowing}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
              removeUserAfterUnfollow={false}
              hideButtons={!loggedInUser}
            />
          ) : message ? (
            <p>{message}</p>
          ) : (
            <NetworkDefaultContent>
              <h3>
                Utilize our database of users to connect with real-world
                professionals
              </h3>
              <NetworkIconWrapper>
                <img
                  src={NetworkIcon}
                  alt="Network Image"
                  width="128"
                  height="128"
                />
              </NetworkIconWrapper>
            </NetworkDefaultContent>
          )}
          <div style={{ height: "0px" }}>&nbsp;</div>
        </UserListWrapper>
      </PageWrapper>
      <div style={{ height: "0px" }}>&nbsp;</div>
    </>
  );
};

export default NetworkPage;
