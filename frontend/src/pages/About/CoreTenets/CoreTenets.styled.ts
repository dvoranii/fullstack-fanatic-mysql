import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

interface ListSectionTitleWrapperProps {
  offset?: string;
  width?: string;
}

export const CoreTenetsWrapper = styled.div`
  width: 100%;
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.035);
  background-image: linear-gradient(
      rgba(245, 245, 245, 1),
      rgba(255, 255, 255, 0.88)
    ),
    url("https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/hexagonal-line-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2.4rem 0rem 8.4rem 0rem;
  position: relative;

  .elipse-solid {
    position: absolute;
    bottom: 0;
    transform: scaleX(-1);
    width: 170px;
    opacity: 0.9;
  }
  h3 {
    text-align: center;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    font-weight: bold;
    color: ${colors.primary};
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    width: fit-content;
    font-family: "Anybody", sans-serif;
    margin: 0 auto 2.4rem auto;
  }

  ol {
    margin-inline-start: 1.2rem;
    margin-top: 1.2rem;

    li {
      padding-top: 1.2rem;
    }

    div {
      font-weight: 100;
      margin-top: 0.5rem;
    }
  }

  @media screen and (max-width: 1035px) {
    h3 {
      br {
        display: none;
      }
    }
  }
`;

export const SubtitleWrapper = styled.div`
  width: 70%;
  padding: 0 20px;
  margin: 0 auto 2.4rem auto;

  @media screen and (max-width: 937px) {
    width: 90%;
  }
`;

export const CoreTenetsWrapperInner = styled.div`
  display: flex;
  gap: 2.4rem;
  padding-top: 1.2rem;
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;

  @media screen and (max-width: 656px) {
    flex-direction: column;
  }
`;

export const ListSectionTitleWrapper = styled.div<ListSectionTitleWrapperProps>`
  width: fit-content;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  h4 {
    text-align: center;
    width: fit-content;
    position: relative;
    z-index: 2;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    border-bottom: 2px solid ${colors.primary};
  }
`;
export const TenetListSection = styled.div``;

export const TenetLisItemTitle = styled.p`
  font-weight: bold;
`;

export const CTABtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3.2rem;
  user-select: none;

  a {
    font-size: 1.4rem;
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${colors.white};
    font-family: "Alata", sans-serif;
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    border-radius: 30px;
    transition: all 250ms ease;

    &:hover {
      cursor: pointer;
      background-color: ${colors.secondary};
      color: ${colors.primary};
    }
  }
`;
