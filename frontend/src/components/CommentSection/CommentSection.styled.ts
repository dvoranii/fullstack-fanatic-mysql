import styled from "styled-components";

export const CommentSectionTitle = styled.h3`
  text-transform: uppercase;
  color: #333333;
`;

export const Comment = styled.ul`
  list-style: none;
  padding: 1.2rem;
  margin-top: 1.2rem;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

export const CommentSectionWrapperOuter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentSectionWrapperInner = styled.ul`
  padding-left: 0px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormTextArea = styled.textarea`
  width: 300px;
  margin-top: 1.2rem;
`;

export const FormButton = styled.button`
  margin-top: 1.2rem;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  transition: all 150ms ease;
  font-weight: bold;
  letter-spacing: 0.25px;

  &:hover {
    cursor: pointer;
    background-color: darkgray;
    color: white;
  }
`;

export const CommentContentWrapper = styled.div`
  padding: 0.8rem;
`;

export const CommentButtonsWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
