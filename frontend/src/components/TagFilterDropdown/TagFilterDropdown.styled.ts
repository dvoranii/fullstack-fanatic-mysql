import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 350px;
  padding-left: 60px;
  padding-top: 12px;
`;

export const DropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
    border-color: #ccc;
  }
`;

export const Arrow = styled.span`
  transition: transform 0.2s;
  font-size: 0.8rem;
  
  &.open {
    transform: rotate(180deg);
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 60px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-height: 400px;
  overflow-y: auto;
`;

export const FilterModeToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
  font-size: 0.9rem;
  
  button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
    
    &.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    &:hover:not(.active) {
      background: #f0f0f0;
    }
  }
`;

export const TagSection = styled.div`
  margin-bottom: 15px;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

export const SelectedTagsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px 5px;
  border-radius: 3px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;