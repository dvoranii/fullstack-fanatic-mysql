import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const DropdownWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isdropdownvisible",
})<{ isdropdownvisible: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 220px;
  z-index: 1000;
  opacity: ${(props) => (props.isdropdownvisible ? 1 : 0)};
  visibility: ${(props) => (props.isdropdownvisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (max-width: 915px) {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
  }
`;

export const ProfilePictureAndInfoWrapper = styled.div`
  display: flex;
  @media (max-width: 915px) {
    display: none;
  }
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
  padding: 5px 10px;
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

  @media (max-width: 915px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

export const DropdownItem = styled.button`
  padding: 8px 0;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  transition: 150ms ease;
  /* padding-left: 0.8rem; */

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }

  @media (max-width: 915px) {
    padding-left: 0.5rem 0 0 0.8rem;
    font-size: 1rem;
  }
`;

export const AccountTitle = styled.p`
  font-weight: bold;

  @media (max-width: 915px) {
    display: none;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;

  @media (max-width: 915px) {
    display: none;
  }
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  @media (max-width: 915px) {
    span {
      font-size: 14px;
    }
    img {
      width: 30px;
    }
  }
`;

export const ProfileIconImg = styled.img`
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`;
