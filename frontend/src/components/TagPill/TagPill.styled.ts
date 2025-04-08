import { styled } from "styled-components";


// In TagPill.styled.ts
export const Pill = styled.span<{ color: string; isActive: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${(props) => props.isActive ? props.color : 'transparent'};
  color: ${(props) => props.isActive ? 'white' : props.color};
  border: 2px solid ${(props) => props.color};
  font-size: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const RemoveButton = styled.button`
  margin-left: 6px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0 0 0 4px;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;