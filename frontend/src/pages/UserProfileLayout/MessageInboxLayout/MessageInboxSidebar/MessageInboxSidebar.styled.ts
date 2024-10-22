import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 100%;
  background-color: #ffc107;
  margin-right: 20px;
  box-sizing: border-box;
  height: 100%;
  border-radius: 14px;

  p {
    padding: 5px;
  }

  @media screen and (max-width: 981px) {
    margin-bottom: 20px;
    height: 70px;
  }
`;
