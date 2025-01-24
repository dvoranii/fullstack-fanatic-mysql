import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #888;
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 375px) {
    img {
      width: 50px;
      height: auto;
    }
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const TextArea = styled.textarea`
  font-family: Arial, Helvetica, sans-serif;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: none;
`;

export const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 250ms ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const MaxCharCountText = styled.p`
  font-size: 12px;
  text-align: right;
  margin-top: 4px;
  position: absolute;
  right: 0;
  bottom: -20px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 1.2rem;
  @media screen and (max-width: 375px) {
    margin-top: 0.4rem;
  }
`;
