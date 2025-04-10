import { useEffect, useState } from "react";
import { isUserBlocked, blockUser, unblockUser } from "../../services/blockService";
import { useCsrfToken } from "../../hooks/useCsrfToken";
import {Button} from "./BlockButton.styled"

interface BlockButtonProps {
  userId: number;
  onBlockStatusChange?: (isBlocked: boolean) => void;
}


const BlockButton: React.FC<BlockButtonProps> = ({ userId, onBlockStatusChange }) => {
  const csrfToken = useCsrfToken();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const blocked = await isUserBlocked(userId);
        setIsBlocked(blocked);
        if (onBlockStatusChange) {
          onBlockStatusChange(blocked);
        }
      } catch (error) {
        console.error("Error checking block status:", error);
      }
    };

    checkBlockStatus();
  }, [userId, onBlockStatusChange]);

  const handleToggleBlock = async () => {
    setIsLoading(true);
    try {
      if (isBlocked) {
        await unblockUser(userId, csrfToken);
        setIsBlocked(false);
      } else {
        await blockUser(userId, csrfToken);
        setIsBlocked(true);
      }
      if (onBlockStatusChange) {
        onBlockStatusChange(!isBlocked);
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      isblocked={isBlocked} 
      onClick={handleToggleBlock} 
      disabled={isLoading}
    >
     <span>{isLoading ? "Processing..." : isBlocked ? "Unblock User" : "Block User"}</span>
  </Button>
  );

};

export default BlockButton;