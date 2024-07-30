import styled from "styled-components";

export const CommentSectionTitle = styled.h3`
  text-transform: uppercase;
  color: #333333;
`;

export const Comment = styled.li`
  list-style: none;
  padding: 1.2rem;
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

export const CommentWrapper = styled.div`
  border: 1px solid black;
`;

export const CommentSectionWrapperOuter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentSectionWrapperInner = styled.ul`
  padding-left: 0px;
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const LikesWrapper = styled.div`
  padding: 0 0 1.2rem 1.8rem;
  display: flex;
  align-items: center;

  img {
    cursor: pointer;
    margin-right: 0.5rem;
    width: 25px;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const FormTextArea = styled.textarea`
  min-width: 50%;
  max-width: 100%;
  min-height: 100px;
  max-height: 250px;
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
  height: fit-content;

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
