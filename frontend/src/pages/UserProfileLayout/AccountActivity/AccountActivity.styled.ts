import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../../GlobalStyles";

export const AccountActivityWrapperOuter = styled.div`
  background-color: #eee;
  position: relative;

  img.settings-gear {
    max-width: 45px;
    position: absolute;
    right: 24px;
    top: 24px;
    background-color: ${colors.primary};
    padding: 6px;
    border-radius: 50%;
    transition: all 250ms ease;

    &:hover {
      filter: brightness(1.25);
    }
  }
`;

export const UserAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 20px 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const AccountActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 4.2rem;
  margin-top: 4.2rem;
  padding: 24px;

  @media screen and (max-width: 1130px) {
    gap: 2.4rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AccountActivityTitle = styled.h2`
  font-size: 1.6rem;
  padding: 1.2rem 0 1.2rem 0;
  font-family: "Alata";
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;

  background: ${colors.secondary};
  color: #222;
  text-transform: uppercase;
`;

export const Section = styled.div`
  width: clamp(250px, 45%, 450px);
  background-color: #fff;
  border-radius: 10px;
  height: fit-content;
  padding: 20px 40px 60px 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: 75vw;
  }
`;

export const SectionTitle = styled.h3`
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: center;
  color: #031f2a;
  letter-spacing: 1px;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #ccc;
`;

export const CommentHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .no-comments {
    width: 100%;
    text-align: center;
    color: #333;
    font-style: italic;
  }
`;

export const CommentItem = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

export const CommentText = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const CommentLink = styled.a`
  color: #007bff;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const ViewMoreCommentsLink = styled(Link)`
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
