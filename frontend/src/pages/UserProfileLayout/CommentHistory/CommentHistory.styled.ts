import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const CommentItem = styled.div`
  padding: 28px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentTextWrapper = styled.div`
  width: 100%;
`;

export const CommentTimeCreation = styled.time`
  font-size: 12px;
  font-style: italic;
`;

export const CommentText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.5;
`;

export const CommentLink = styled.a`
  font-size: 14px;
  color: ${colors.white};
  text-decoration: none;
  background-color: ${colors.primary};
  padding: 8px;
  border-radius: 4px;
  height: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  background-color: #ffe6e6;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid red;
  border-radius: 4px;
`;

export const CommentHistoryWrapper = styled.div`
  height: 600px;
  overflow-y: auto;
`;
