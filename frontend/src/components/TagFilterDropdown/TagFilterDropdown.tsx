import { useState } from 'react';
import { FilterTag } from '../../types/FilterTag';
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
import { TagPill } from '../TagPill/TagPill';

interface TagFilterDropdownProps {
  availableTags: FilterTag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
  filterMode: 'AND' | 'OR';
  onFilterModeChange: (mode: 'AND' | 'OR') => void;
  className?: string;
}

export const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll,
  filterMode,
  onFilterModeChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer className={className}>
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
                      showRemove={true}
                      onRemove={() => onTagToggle(tagId)}
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