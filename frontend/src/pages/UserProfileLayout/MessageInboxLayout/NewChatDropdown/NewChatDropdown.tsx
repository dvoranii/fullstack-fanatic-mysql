import { useContext, useEffect, useState } from "react";
import { NewChatDropdownWrapper } from "./NewChatDropdown.styled";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import {
  fetchFollowers,
  fetchFollowing,
} from "../../../../services/followService";
import { UserContext } from "../../../../context/UserContext";
import { User } from "../../../../types/User/User";
import { UserContextType } from "../../../../types/User/UserContextType";

interface NewChatDropdownProps {
  isVisible: boolean;
  onUserSelect: (userId: number) => void;
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
        <div style={{ padding: "10px" }}>
          {filteredChatList.length > 0 ? (
            filteredChatList.map((user) => (
              <div
                key={user.id}
                style={{ cursor: "pointer", padding: "8px 0" }}
                onClick={() => onUserSelect(user.id)}
              >
                {user.name}
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </Dropdown>
    </NewChatDropdownWrapper>
  );
};

export default NewChatDropdown;
