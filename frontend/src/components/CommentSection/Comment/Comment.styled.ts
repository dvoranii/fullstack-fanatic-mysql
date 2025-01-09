import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

interface CommentWrapperProps {
  isreply: boolean;
}

export const CommentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isreply",
})<CommentWrapperProps>`
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  flex-direction: row;
  position: relative;

  ${({ isreply }) =>
    isreply &&
    `
    &:last-child {
      border-bottom: none;
    }

    &:before {
    content: '';
    position: absolute;
    left: -4.8rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #ddd;
    }
  `}
`;

export const ProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  max-width: 60px;

  @media screen and (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
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
  min-width: 240px;
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
  margin-top: 0.4rem;
  img {
    width: 25px;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 20px;
      margin-right: 0.2rem;
    }
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

export const FormButton = styled.button<{
  variant?: "submit" | "edit" | "default";
}>`
  border-radius: 4px;
  background: ${({ variant }) =>
    variant === "submit"
      ? `${colors.secondary}`
      : variant === "edit"
      ? `${colors.primary}`
      : "none"};
  padding: ${({ variant }) =>
    variant === "submit" ? "8px" : variant === "edit" ? "8px" : "none"};
  color: #fff;
  border: none;
  height: 40px;
  cursor: pointer;
  transition: all 150ms ease;
  &:hover {
    filter: brightness(0.8);
  }

  img {
    margin-top: 1.2rem;
    width: 25px;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 20px;
    }
  }
`;

export const TrashBinButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: none;
  color: #fff;
  border: none;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/comment/discard-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  transition: 150ms ease;
  &:hover {
    filter: brightness(0.8);
  }
`;
