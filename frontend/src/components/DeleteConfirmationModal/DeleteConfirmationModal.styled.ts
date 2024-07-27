import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export const ModalContentText = styled.p`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

export const Button = styled.button`
  margin: 20px 10px;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  background-color: #14213d;
  color: white;
  letter-spacing: 0.25px;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.35);
  transition: all 250ms ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px) scale(1.025);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.55);
  }

  &:active {
    transform: translateY(0px) scale(1);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  }
`;
