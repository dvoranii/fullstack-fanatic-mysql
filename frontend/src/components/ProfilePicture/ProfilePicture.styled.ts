import styled from "styled-components";

export const StyledProfilePicture = styled.img<{ width: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 50%;
  border: 4px solid white;
  background-color: grey;
  object-fit: cover;
`;
