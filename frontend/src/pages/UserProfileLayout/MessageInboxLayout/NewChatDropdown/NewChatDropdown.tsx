import { useContext, useEffect, useState } from "react";
import {
  NewChatDropdownWrapper,
  UserItemsWrapper,
  UserItems,
} from "./NewChatDropdown.styled";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import {
  fetchFollowers,
  fetchFollowing,
} from "../../../../services/followService";
import { UserContext } from "../../../../context/UserContext";
import { User } from "../../../../types/User/User";
import { UserContextType } from "../../../../types/User/UserContextType";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface NewChatDropdownProps {
  isVisible: boolean;
  onUserSelect: (user: User) => void;
}

const NewChatDropdown: React.FC<NewChatDropdownProps> = ({
  isVisible,
  onUserSelect,
}) => {
  const { profile } = useContext(UserContext) as UserContextType;
  const loggedInUserId = profile?.id;

  const [chatList, setChatList] = useState<User[]>([]);
  const [filteredChatList, setFilteredChatList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchChatList = async () => {
      try {
        const [followers, following] = await Promise.all([
          fetchFollowers(loggedInUserId),
          fetchFollowing(loggedInUserId),
        ]);

        const combinedList = [
          ...followers,
          ...following.filter(
            (followingUser) =>
              !followers.some((follower) => follower.id === followingUser.id)
          ),
        ];

        setChatList(combinedList);
        setFilteredChatList(combinedList);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, [loggedInUserId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = chatList.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChatList(filtered);
    } else {
      setFilteredChatList(chatList);
    }
  }, [searchTerm, chatList]);

  return (
    <NewChatDropdownWrapper>
      <Dropdown isVisible={isVisible} width="220px">
        <SearchBar
          width="100%"
          paddingLeft="0px"
          onChange={(value) => setSearchTerm(value)}
        />
        <UserItemsWrapper>
          {filteredChatList.length > 0 ? (
            filteredChatList.map((user) => (
              <UserItems key={user.id} onClick={() => onUserSelect(user)}>
                <ProfilePicture
                  src={user.profile_picture || "/default-profile.png"}
                  alt={`${user.name}'s Profile Picture`}
                  width="35px"
                  border="2px solid #ccc"
                />
                {user.name}
              </UserItems>
            ))
          ) : (
            <p>No users available</p>
          )}
        </UserItemsWrapper>
      </Dropdown>
    </NewChatDropdownWrapper>
  );
};

export default NewChatDropdown;
