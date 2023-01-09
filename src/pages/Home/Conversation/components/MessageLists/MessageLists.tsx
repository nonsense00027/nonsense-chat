import React from "react";
import FlipMove from "react-flip-move";

import { IMessage } from "~/shared/models";

import Message from "../Message/Message";

interface MessageListsProps {
  messages: IMessage[];
}

function MessageLists({ messages }: MessageListsProps) {
  return (
    <FlipMove className="flex flex-col">
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          text={message.message}
          timestamp={message.timestamp}
          userId={message.userId}
        />
      ))}
    </FlipMove>
  );
}

export default React.memo(MessageLists);