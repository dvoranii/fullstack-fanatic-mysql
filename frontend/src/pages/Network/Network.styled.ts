import { styled } from "styled-components";
import { colors } from "../../GlobalStyles";

export const SearchBarWrapper = styled.div`
  margin-top: 40px;
`;

export const UserListWrapper = styled.div``;

export const NetworkDefaultContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    padding-top: 2.4rem;
    text-align: center;
    font-family: "Anybody";
  }
`;

export const NetworkIconWrapper = styled.div`
  user-select: none;
  img {
    width: clamp(80px, 10vw, 128px);
    height: auto;
    padding-top: 2.4rem;
  }
`;

export const FilterOption = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  cursor: pointer;
  margin-left: 10px;
  color: ${colors.primary};
`;
export const FilterOptionWrapper = styled.div`
  padding-left: 120px;
  padding-top: 0.4rem;
`;
