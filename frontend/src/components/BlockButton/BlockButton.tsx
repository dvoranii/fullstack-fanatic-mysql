import { useContext, useEffect, useState } from "react";
import { isUserBlocked, blockUser, unblockUser } from "../../services/blockService";
import { useCsrfToken } from "../../hooks/useCsrfToken";
import {Button} from "./BlockButton.styled"
import { UserContext } from "../../context/UserContext";

interface BlockButtonProps {
  userId: number;
  onBlockStatusChange?: (isBlocked: boolean) => void;
  setIsFollowing?: React.Dispatch<React.SetStateAction<boolean>>;
  setFollowersCount?:React.Dispatch<React.SetStateAction<number>>;
  isFollowing?: boolean;
}


const BlockButton: React.FC<BlockButtonProps> = ({ 
  userId, 
  onBlockStatusChange, 
  setIsFollowing,
  setFollowersCount,
  isFollowing
 }) => {
  const csrfToken = useCsrfToken();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refreshBlockStatus } = useContext(UserContext);

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

        isFollowing && setIsFollowing?.(false);
        isFollowing && setFollowersCount?.(prev => Math.max(0, prev - 1));

        
        await blockUser(userId, csrfToken, refreshBlockStatus);
        setIsBlocked(true);
      }
      if (onBlockStatusChange) {
        onBlockStatusChange(!isBlocked);
      }
    } catch (error) {
      console.error("Error toggling block status:", error);

      if (!isBlocked && isFollowing) {
        setIsFollowing?.(true);
        setFollowersCount?.(prev => prev + 1);
      }
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