import styled from "styled-components";

// Modal Overlay (covers the background)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  /* z-index: 999; */
`;

// Modal Content (the modal itself)
export const ModalContent = styled.div`
  position: fixed; // Fixed to stay in the center of the screen
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #007bff;
`;

// Avatar Container (position it absolutely in the top-right corner of the modal)
export const AvatarContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
`;

// User Avatar (styling for the avatar image)
export const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
`;

// Message Form container (below the avatar)
export const MessageForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px; // Add margin so the form is below the avatar
`;

// Input field for the subject
export const InputField = styled.input`
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

// Text area for the message
export const TextArea = styled.textarea`
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px;
  height: 100px;
  margin-bottom: 10px;
  font-size: 14px;
  resize: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

// Send button
export const SendButton = styled.button`
  background-color: #14213d;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #0f1a2e;
  }
`;
