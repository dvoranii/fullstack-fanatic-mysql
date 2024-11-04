import React, { useState } from "react";
import {
  SearchBarWrapper,
  UserListWrapper,
  NetworkDefaultContent,
  NetworkIconWrapper,
  FilterOption,
  FilterOptionWrapper,
} from "./Network.styled";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import SearchBar from "../../components/SearchBar/SearchBar";
import NetworkIcon from "../../assets/images/networking-icon.png";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import { searchUsers } from "../../services/networkService";
import { User } from "../../types/User/User";

export const NetworkPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"name" | "profession">(
    "name"
  );

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
  return (
    <>
      <TitleBanner textContent="Network" />
      <SearchBarWrapper>
        <SearchBar onSearchChange={handleSearch} />
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

      <UserListWrapper>
        {isSearching ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  <ProfilePicture
                    src={user.profile_picture || ""}
                    alt={user.name}
                    width={"50"}
                    border={"1px solid black"}
                  />
                  <p>{user.name}</p>
                  <p>{user.profession || "No profession listed"}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : message ? (
          <p>{message}</p>
        ) : (
          <NetworkDefaultContent>
            <h3>
              Utilize our database of users to connect with real-world
              professionals
            </h3>
            <NetworkIconWrapper>
              <img src={NetworkIcon} alt="Network Image" />
            </NetworkIconWrapper>
          </NetworkDefaultContent>
        )}
      </UserListWrapper>
    </>
  );
};

export default NetworkPage;
