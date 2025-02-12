import styled from "styled-components";


interface VisibilityProps {
  $isVisible: boolean;
}

export const WarningBarWrapper = styled.div<VisibilityProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ff4d4f;
  color: #ffffff;
  padding: 50px 20px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 1000;
  border-radius: 4px 4px 0 0;
  user-select: none;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${props => props.$isVisible ? '0' : '70%'});
  opacity: ${props => props.$isVisible ? '1' : '0.75'};

  img {
    width: 40px;
  }

  @media screen and (max-width: 589px) {
  transform: translateY(${props => props.$isVisible ? '0' : '80%'});
  }
`;

export const WarningBarWrapperInner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;

`;

export const CloseBtnWrapper = styled.div<VisibilityProps>`
position: absolute;
right: 0;
top: 0;
padding: 10px;
// transform: ${props => props.$isVisible ? 'rotate(0)' : 'rotate(-45deg)'};

button {
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  transition: all 150ms ease;

  &:hover {
  cursor: pointer;
  opacity: 0.75;
  }
}
`;