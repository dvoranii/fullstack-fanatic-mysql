import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const TermsContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #888;
  padding-bottom: 10px;
`;

export const Section = styled.div`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${colors.black};
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;
