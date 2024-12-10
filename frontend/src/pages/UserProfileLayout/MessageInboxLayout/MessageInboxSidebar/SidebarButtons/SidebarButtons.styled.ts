import styled from "styled-components";

export const IconBGWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2.2rem;
  user-select: none;

  @media screen and (max-width: 981px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 0;
    padding: 20px;
  }

  @media screen and (max-width: 375px) {
    padding: 4px;
  }
`;

export const IconBG = styled.div`
  background-color: #14213d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
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
  height: auto;
`;
