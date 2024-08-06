import styled from "styled-components";

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
    /* background: transparent; */

    &:hover {
      cursor: pointer;
      /* color: white; */
    }
  }
`;

export const ProfileImg = styled.img`
  width: 30px;

  @media (max-width: 915px) {
    margin-right: 0;
  }
`;
