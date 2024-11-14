import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ProfilePictureAndInfoWrapper = styled.div`
  padding: 10px;
  display: flex;
`;

export const ProfileInfoWrapper = styled.div`
  padding-left: 0.4rem;
`;

export const ProfileName = styled.p`
  font-size: 16px;
  margin-top: 0.4rem;
  font-weight: 600;
`;

export const ProfileProfession = styled.p`
  font-size: 14px;
  color: #222;
  margin-top: 0.25rem;
`;

export const ViewProfileButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ViewProfileButton = styled(NavLink)`
  background-color: #ffb923;
  border: none;
  border-radius: 20px;
  color: #222;
  padding: 4px 10px;
  margin-top: 0.8rem;
  text-align: center;
  width: 75%;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 8px;
  transition: 150ms ease;

  &:hover {
    background-color: darkorange;
    color: #eee;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;
`;

export const AccountTitle = styled.p`
  font-weight: bold;
`;

export const DropdownItem = styled(NavLink)`
  padding: 8px;
  transition: 150ms ease;
  &:hover {
    background-color: #f0f0f0;
  }

  &.inbox-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const DropdownItemLogoutBtn = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  transition: 150ms ease;
  padding: 10px 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const UserProfiledropdownWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
