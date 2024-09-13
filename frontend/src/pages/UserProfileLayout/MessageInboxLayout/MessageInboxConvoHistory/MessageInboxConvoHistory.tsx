import { useState } from "react";
import {
  ConvoHistoryContainer,
  ReadFilterWrapper,
} from "./MessageInboxConvoHistory.styled";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const MessageInboxConvoHistory: React.FC = () => {
  const [boldSpan, setBoldSpan] = useState("read");
  const toggleBold = (selectedSpan: string) => {
    setBoldSpan(selectedSpan);
  };
  return (
    <ConvoHistoryContainer>
      <SearchBar></SearchBar>
      <ReadFilterWrapper>
        <p>
          <span
            onClick={() => toggleBold("read")}
            className={boldSpan === "read" ? "bold" : "normal"}
          >
            READ
          </span>
          &nbsp;|&nbsp;
          <span
            onClick={() => toggleBold("unread")}
            className={boldSpan === "unread" ? "bold" : "normal"}
          >
            UNREAD
          </span>
        </p>
      </ReadFilterWrapper>
    </ConvoHistoryContainer>
  );
};

export default MessageInboxConvoHistory;
