import styled from "styled-components";

export const WarningBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ff4d4f;
  color: #ffffff;
  padding: 50px 20px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 1000;
  border-radius: 4px 4px 0 0;
  user-select: none;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
  }
`;
