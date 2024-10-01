import styled from "styled-components";

export const CommentSectionTitle = styled.h3`
  text-transform: uppercase;
  color: #333333;
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
  height: 500px;
  overflow-y: auto;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const FormTextArea = styled.textarea`
  min-width: 200px;
  min-height: 130px;
  max-height: 200px;
  max-width: 600px;
  height: clamp(100px, 6vw, 250px);
  width: 30vw;
  margin-top: 1.2rem;
  padding: 10px;
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

export const SeeMoreButton = styled.button`
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: darkblue;
  }
`;

export const CommentTextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`;

export const ProfilePictureWrapper = styled.div`
  padding-right: 20px;
  img {
    margin-top: -30px;
  }
`;

export const RepliesWrapper = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
`;
