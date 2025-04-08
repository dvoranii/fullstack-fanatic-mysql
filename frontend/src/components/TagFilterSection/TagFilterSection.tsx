import {TutorialTag} from "../../types/Tutorial/Tutorial";
import { TagPill } from "../TagPill/TagPill";

interface TagFilterSectionProps {
    selectedTags: string[];
    onTagToggle: (tagId: string) => void;
    availableTags: TutorialTag[];
    tagCounts: Record<string, number>
}

export const TagFilterSection: React.FC<TagFilterSectionProps> = ({
    selectedTags,
    onTagToggle,
    availableTags,
    tagCounts
}) => {

    const tagsByCategory = availableTags.reduce((acc, tag) => {
        const category = tag.category || "uncategorized";
        if (!acc[category]) acc[category] = [];
        acc[category].push(tag);
        return acc;
      }, {} as Record<string, TutorialTag[]>);

      return (
        <div className="tag-filter-section">
          {Object.entries(tagsByCategory).map(([category, tags]) => (
            <div key={category} className="tag-category">
              <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <div className="tag-group">
                {tags.map((tag) => (
                  <TagPill
                    key={tag.id}
                    tag={tag}
                    isActive={selectedTags.includes(tag.id)}
                    onClick={() => onTagToggle(tag.id)}
                  >
                    {tag.label} ({tagCounts[tag.id] || 0})
                  </TagPill>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
}