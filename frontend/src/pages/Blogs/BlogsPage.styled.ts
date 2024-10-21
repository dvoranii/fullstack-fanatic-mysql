import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../GlobalStyles";

export const BlogList = styled.div`
  display: grid;
  row-gap: 1.2rem;
`;

export const BlogItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
`;

export const BlogContent = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
  padding-left: 1.2rem;

  h2 {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
    max-width: 80%;
  }
`;

export const BlogActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 60px;
`;

export const FreeBadge = styled.div`
  background: linear-gradient(
    315deg,
    rgba(34, 185, 50, 1) 23%,
    rgba(157, 233, 165, 1) 50%,
    rgba(34, 185, 50, 1) 77%
  );
  border: 1px;
  border-radius: 5px;
  font-size: 0.9rem;
  clip-path: polygon(0 0, 100% 0, 85% 48%, 100% 100%, 0 100%, 15% 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;

  p {
    color: white;
    text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black,
      -1px -1px 0 black;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1rem;
  }
`;

export const PremiumBadge = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 175, 43, 1) 10%,
    rgba(255, 222, 166, 1) 50%,
    rgba(255, 175, 43, 1) 83%
  );
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  p {
    font-family: "Alata", sans-serif;
    text-transform: uppercase;
    font-size: 1rem;
    color: ${colors.white};
    text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black,
      -1px -1px 0 black;
    letter-spacing: 1px;
    margin: 0;
  }

  img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
`;

export const BlogImgWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  user-select: none;
  img {
    max-width: 100px;
    padding: 10px;
  }
`;

export const SeeMoreButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
