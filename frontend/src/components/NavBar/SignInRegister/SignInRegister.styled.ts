import styled from "styled-components";

// export const SignInRegisterTextWrapper = styled.div``;
export const SignInRegisterWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  align-items: center;
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 30px;
  transition: all 250ms ease;

  &:hover {
    background: black;
    color: white;

    img {
      filter: invert(1);
    }
  }
`;

export const ProfileImg = styled.img`
  width: 40px;
  /* margin-right: 2.4rem; */

  @media (max-width: 915px) {
    margin-right: 0;
  }
`;
