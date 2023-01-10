import React, { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import useConversation from "~/shared/hooks/useConversation";
import useConversationInfo from "~/shared/hooks/useConversationInfo";

import Header from "./components/Header/Header";
import MessageLists from "./components/MessageLists/MessageLists";
import SendInput from "./components/SendInput/SendInput";

function Conversation() {
  const chatComponentRef = useRef<HTMLDivElement>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { conversationId } = useParams();

  if (!conversationId) {
    navigate("/");
    return <div></div>;
  }

  const { data: convo, status: convoStatus } = useConversationInfo({
    id: conversationId,
  });

  const { data: messages, status: messagesStatus } = useConversation({
    id: conversationId,
    success: scrollToBottom,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.refetchQueries(["conversation", conversationId]);
    };
  }, [conversationId]);

  function scrollToBottom() {
    console.log("scrolling");
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (messagesStatus !== "success" || !chatComponentRef.current) return;
    chatComponentRef.current.scrollTop = chatComponentRef.current.scrollHeight;
  }, [messagesStatus]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen flex-col">
      <div className="w-full max-w-[1080px]">
        <Header />
      </div>
      <div
        ref={chatComponentRef}
        className="bg-gray px-4 flex-1 overflow-scroll"
      >
        <MessageLists messages={messages || []} />
        <div ref={bottomDivRef} />
      </div>

      <div className="w-full max-w-[1080px] bg-gray">
        <div className="p-6">
          <SendInput
            conversationId={conversationId}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  );
}

export default Conversation;
