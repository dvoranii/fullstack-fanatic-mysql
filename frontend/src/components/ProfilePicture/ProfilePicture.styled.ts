import styled from "styled-components";

export const StyledProfilePicture = styled.img<{
  width: string;
  border: string;
  bg?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 50%;
  border: ${(props) => props.border};
  background-color: ${(props) => props.bg};
  object-fit: cover;
`;
