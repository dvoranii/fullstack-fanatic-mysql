import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const DropdownWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 200px;
  z-index: 1000;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const ProfileName = styled.p`
  font-size: 14px;
  font-weight: bold;
`;
export const ProfileProfession = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-top: 0.25rem;
`;

export const ViewProfileButton = styled(NavLink)`
  background-color: #ffb923;
  border: none;
  border-radius: 20px;
  color: white;
  padding: 5px 10px;
  margin-top: 0.8rem;
  text-align: center;
  width: 100%;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    background-color: darkorange;
  }
`;

export const DropdownItem = styled.button`
  padding: 8px 0;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;
`;

export const ProfileIconImg = styled.img`
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`;
