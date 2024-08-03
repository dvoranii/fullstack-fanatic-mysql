import styled from "styled-components";
import checkIcon from "../../../assets/images/check-icon.png";
import { colors } from "../../../global.styled";

export const TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0 10px;

  input[type="checkbox"] {
    display: none;
  }

  label {
    font-size: 0.8rem;
    position: relative;
    padding-left: 29px;
    display: flex;
    align-items: center;

    .checkbox-label {
      cursor: pointer;
      margin-right: 5px;
      user-select: none;
    }

    .terms-link {
      color: ${colors.primary};
      text-decoration: underline;
      cursor: pointer;
      pointer-events: auto;
      user-select: none;
    }

    &:hover::before {
      cursor: pointer;
    }
  }

  label::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${colors.white};
  }

  label::after {
    content: "";
    display: none;
    position: absolute;
    left: 7%;
    top: 6%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background-image: url(${checkIcon});
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  input[type="checkbox"]:checked + label::after {
    display: block;
  }
`;
