import React from "react";
import { Link } from "react-router-dom";
import {
  UserListWrapper,
  EmptyMessage,
  FollowButtonsWrapper,
  UserLinkWrapperInner,
  UserInfoWrapper,
} from "./UserList.styled";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { User } from "../../types/User/User";
import MessageModalButton from "../MessageModalButton/MessageModalButton";

interface UserListProps {
  users: User[];
  loggedInUserId?: number;
  isFollowing: (userId: number) => boolean;
  handleFollow: (userId: number) => void;
  handleUnfollow: (userId: number) => void;
  removeUserAfterUnfollow?: boolean;
  hideButtons?: boolean;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loggedInUserId,
  isFollowing,
  handleFollow,
  handleUnfollow,
  removeUserAfterUnfollow = false,
  hideButtons = false,
}) => {
  return (
    <UserListWrapper>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                <UserLinkWrapperInner>
                  <ProfilePicture
                    src={user.profile_picture || ""}
                    alt={user.name}
                    width={"60px"}
                    border={"1px solid black"}
                  />
                  <UserInfoWrapper>
                    <h4>{user.name}</h4>
                    <h5>{user.profession}</h5>
                  </UserInfoWrapper>
                </UserLinkWrapperInner>
              </Link>

              {!hideButtons && (
                <FollowButtonsWrapper>
                  {loggedInUserId && (
                    <>
                      {isFollowing(user.id) ? (
                        <button
                          onClick={() => {
                            handleUnfollow(user.id);
                            if (removeUserAfterUnfollow) {
                              users.splice(users.indexOf(user), 1);
                            }
                          }}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button onClick={() => handleFollow(user.id)}>
                          Follow
                        </button>
                      )}
                    </>
                  )}
                  <MessageModalButton
                    userId={user.id.toString()}
                    variant="simple"
                  />
                </FollowButtonsWrapper>
              )}
            </li>
          ))
        ) : (
          <EmptyMessage>No users to display</EmptyMessage>
        )}
      </ul>
    </UserListWrapper>
  );
};

export default UserList;
