import { TutorialTag } from "../../types/Tutorial/Tutorial";
import {Pill, RemoveButton} from "./TagPill.styled";

interface TagPillProps {
    tag: TutorialTag;
    isActive?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    onRemove?: () => void;
    showRemove?: boolean;
}

export const TagPill: React.FC<TagPillProps> = ({
    tag,
    isActive = false,
    onClick,
    onRemove,
    showRemove,
    children
}) => {

    const fallbackColor = "#6c757d";
    const pillColor = tag.color || fallbackColor;

    return(
        <Pill
        color = {pillColor}
        isActive={isActive}
        onClick={onClick}
        aria-label={`Filtered by ${tag.label}`}
        title={tag.label}
        >
        {children || tag.label}
        {showRemove && (
            <RemoveButton
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                }}
                aria-label={`Remove ${tag.label} filter`}
            >
                ×
            </RemoveButton>
        )}
        </Pill>
    )
}