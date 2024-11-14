import { Badge } from "./NotificationBadge.styled";

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  positionAbsolute?: boolean;
  topOffset?: string;
  rightOffset?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 9,
  positionAbsolute = false,
  topOffset = "0",
  rightOffset = "0",
}) => {
  if (count <= 0) return null;

  return (
    <Badge
      positionAbsolute={positionAbsolute}
      style={{
        top: topOffset,
        right: rightOffset,
      }}
    >
      {count > maxCount ? `${maxCount}+` : count}
    </Badge>
  );
};

export default NotificationBadge;
