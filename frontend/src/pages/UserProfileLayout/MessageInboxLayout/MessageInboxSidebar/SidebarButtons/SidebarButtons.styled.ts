import styled from "styled-components";

export const IconBGWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2.2rem;
`;

export const IconBG = styled.div`
  background-color: #14213d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: 150ms ease;

  &:first-child {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  &:nth-child(2) {
    padding: 10px;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

export const IconImg = styled.img`
  width: 100%;
  height: 100%;
`;
