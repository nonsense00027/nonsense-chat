import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useConversation from "~/shared/hooks/useConversation";

import Header from "./components/Header/Header";
import MessageLists from "./components/MessageLists/MessageLists";
import SendInput from "./components/SendInput/SendInput";

function Conversation() {
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { conversationId } = useParams();

  if (!conversationId) {
    navigate("/");
    return <div></div>;
  }

  const { data, isFetching } = useConversation({ id: conversationId });

  function scrollToBottom() {
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // useEffect(()=>{

  // },[])

  if (isFetching) {
    return <div></div>;
  }

  return (
    <div className="flex h-screen flex-col">
      {/* <div className="fixed top-0 left-0 w-full pl-[370px] max-w-[1080px] z-50"> */}
      <div className="w-full max-w-[1080px]">
        <Header />
      </div>
      {/* <div className="px-4 pt-20 pb-32 relative h-full bg-gray min-h-screen"> */}
      <div className="bg-gray px-4 flex-1 overflow-scroll">
        <MessageLists messages={data} />
        <div ref={bottomDivRef} />
      </div>

      {/* <div className="fixed bottom-0 left-0 w-full pl-[370px] max-w-[1080px] bg-gray"> */}
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
