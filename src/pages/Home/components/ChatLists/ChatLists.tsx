import React from "react";
import { IChat, User } from "~/shared/models";
import Chat from "../Chat/Chat";

interface ChatListsProps {
  chats: IChat[];
}

function ChatLists({ chats }: ChatListsProps) {
  return (
    <div className="px-2">
      {chats.map((chat) => (
        <Chat
          key={chat.id}
          id={chat.id}
          participants={chat.participants}
          message={chat.lastMessage?.text || undefined}
          lastMessageUser={chat.lastMessage?.user || undefined}
        />
      ))}
    </div>
  );
}

export default ChatLists;
