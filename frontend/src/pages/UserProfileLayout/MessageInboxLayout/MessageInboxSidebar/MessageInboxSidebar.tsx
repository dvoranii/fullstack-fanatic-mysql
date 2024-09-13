import { SidebarContainer } from "./MessageInboxSidebar.styled";
import SidebarButton from "./SidebarButtons/SidebarButtons";

const MessageInboxSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarButton></SidebarButton>
    </SidebarContainer>
  );
};

export default MessageInboxSidebar;
