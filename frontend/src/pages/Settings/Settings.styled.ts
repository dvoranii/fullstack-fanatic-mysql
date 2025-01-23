import styled from "styled-components";

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 250px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  user-select: none;

  nav ul {
    list-style: none;
    padding: 0;
    margin: 20px 0 0;

    li {
      margin-bottom: 10px;

      a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

export const Content = styled.main`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
`;

export const SettingItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  user-select: none;

  b {
    display: inline-block;
    width: 150px;
    color: #333;
  }

  .edit-btn {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    transition: all 150ms ease;

    &:hover {
      filter: brightness(0.9);
    }

    img {
      width: 16px;
    }
  }

  .help-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: default;

    img {
      width: 16px;
    }
  }
`;

export const ViewButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProfileWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const ProfileName = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

export const LinkButton = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ChangePasswordFormWrapper = styled.div`
  position: relative;

  .cancel-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    padding: 10px;
    transition: all 150ms ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;
