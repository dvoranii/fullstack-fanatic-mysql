import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";
import WaveEffectBG from "../../../assets/images/wave-effect-bg.jpg";

export const MobileTopWrapper = styled.div`
  height: 50%;
  padding-top: 2.4rem;
  padding-bottom: 4.8rem;
  background-image: linear-gradient(
      rgba(255, 255, 255, 075),
      rgba(255, 255, 255, 0.25)
    ),
    url(${WaveEffectBG});
  background-size: cover;
  background-repeat: no-repeat;
`;
export const MobileBottomWrapper = styled.div`
  height: 50%;
  background-color: ${colors.secondary};
  border-top: 4px solid ${colors.primary};
`;
