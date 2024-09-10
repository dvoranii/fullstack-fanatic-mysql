import styled from "styled-components";

interface DropdownProps {
  isOpen: boolean;
}

// Keep existing styles for the profile button wrapper
export const SignInRegisterWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  align-items: center;
  border: 2px solid black;
  padding: 8px 16px;
  border-radius: 30px;
  transition: all 250ms ease;
  position: relative; // Add position relative to handle dropdown positioning

  &:hover {
    background: #14213d;
    color: white;

    img {
      filter: invert(1);
    }
  }

  button {
    border: none;
    border-radius: 30px;
    padding: 8px;

    &:hover {
      cursor: pointer;
    }
  }
`;

// Profile Image styling stays the same
export const ProfileImg = styled.img`
  width: 30px;

  @media (max-width: 915px) {
    margin-right: 0;
  }
`;

// New dropdown menu wrapper styling
export const DropdownMenuWrapper = styled.div<DropdownProps>`
  position: absolute;
  top: 60px; // Adjust this depending on where you want the dropdown to appear
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 100;
  transition: opacity 250ms ease;
  opacity: ${(props) =>
    props.isOpen ? 1 : 0}; // Animation for fade-in/fade-out
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
`;

// Dropdown menu content styling
export const DropdownMenu = styled.div`
  padding: 10px;
`;

// User information wrapper inside dropdown
export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const UserName = styled.h3`
  font-size: 1.1rem;
  margin: 5px 0;
`;

export const UserProfession = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const ViewProfileButton = styled.button`
  background-color: #ffb100;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 200ms ease;

  &:hover {
    background-color: #ff8c00;
  }
`;

// Account options like "Settings", "Subscriptions", "Help"
export const AccountOptions = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const AccountOptionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 200ms ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Logout button at the bottom of the dropdown
export const LogoutButton = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  background-color: #e63946;
  color: white;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #d62828;
  }
`;
