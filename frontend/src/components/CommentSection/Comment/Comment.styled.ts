import styled from "styled-components";
import discardIcon from "../../../assets/images/discard-icon.png";

interface CommentWrapperProps {
  isreply: boolean;
}

export const CommentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isreply",
})<CommentWrapperProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ isreply }) => (isreply ? "column" : "row")};
  padding: ${({ isreply }) => (isreply ? "0.5rem 0 0.5rem 2rem" : "1rem 0")};
  border-bottom: ${({ isreply }) => (isreply ? "none" : "1px solid #ddd")};
  margin-left: ${({ isreply }) => (isreply ? "0" : "0")};
`;

export const ProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Username = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  color: #333;
`;

export const CommentItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const CommentContentWrapper = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.4rem;
  img {
    width: 25px;
    cursor: pointer;
    margin-right: 0.5rem;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ReplyFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const FormButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const TrashBinButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background-color: red;
  color: #fff;
  border: none;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${discardIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  &:hover {
    background-color: darkred;
  }
`;
