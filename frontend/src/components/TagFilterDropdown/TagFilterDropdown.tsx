import { useState } from 'react';
import { TagPill } from '../TagPill/TagPill';
import { TutorialTag } from '../../types/Tutorial/Tutorial';
import { 
    DropdownContainer,
    DropdownToggle,
    Arrow,
    DropdownContent,
    FilterModeToggle,
    TagSection,
    TagList,
    ClearButton,
    SelectedTagsHeader
  } from './TagFilterDropdown.styled';

interface TagFilterDropdownProps {
  availableTags: TutorialTag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
  filterMode: 'AND' | 'OR';
  onFilterModeChange: (mode: 'AND' | 'OR') => void;
}

export const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll,
  filterMode,
  onFilterModeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedTags.length > 0 
            ? `${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''} selected`
            : 'Filter by Tags'}
        </span>
        <Arrow className={isOpen ? 'open' : ''}>▼</Arrow>
      </DropdownToggle>
      
      {isOpen && (
        <DropdownContent>
          <FilterModeToggle>
            <span>Filter Mode:</span>
            <button
              className={filterMode === 'OR' ? 'active' : ''}
              onClick={() => onFilterModeChange('OR')}
            >
              ANY (OR)
            </button>
            <button
              className={filterMode === 'AND' ? 'active' : ''}
              onClick={() => onFilterModeChange('AND')}
            >
              ALL (AND)
            </button>
          </FilterModeToggle>
          
          {selectedTags.length > 0 && (
            <TagSection className="selected-tags">
              <SelectedTagsHeader>
                <h4>Selected Tags</h4>
                <ClearButton onClick={onClearAll}>Clear All</ClearButton>
              </SelectedTagsHeader>
              <TagList>
                {selectedTags.map(tagId => {
                  const tag = availableTags.find(t => t.id === tagId);
                  return tag ? (
                    <TagPill
                      key={tagId}
                      tag={tag}
                      isActive={true}
                      onClick={() => onTagToggle(tagId)}
                    />
                  ) : null;
                })}
              </TagList>
            </TagSection>
          )}

          <TagSection className="available-tags">
            <h4>Available Tags</h4>
            <TagList>
              {availableTags
                .filter(tag => !selectedTags.includes(tag.id))
                .map(tag => (
                  <TagPill
                    key={tag.id}
                    tag={tag}
                    isActive={false}
                    onClick={() => onTagToggle(tag.id)}
                  />
                ))}
            </TagList>
          </TagSection>
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};