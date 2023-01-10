import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "~/configs/firebase/firebase";

import useConversationInfo from "~/shared/hooks/useConversationInfo";
import { IMessage } from "~/shared/models";
import { collectIdsAndDocs } from "~/shared/utils";

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

  const ref = query(
    collection(db, "chats", conversationId, "messages"),
    orderBy("timestamp", "asc")
  );

  const [value, loading, error] = useCollection(ref, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  function scrollToBottom() {
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (loading || !chatComponentRef.current) return;
    chatComponentRef.current.scrollTop = chatComponentRef.current.scrollHeight;
  }, [loading]);

  useEffect(() => {
    scrollToBottom();
  }, [value]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="w-full max-w-[1080px]">
        <Header />
      </div>
      <div
        ref={chatComponentRef}
        className="bg-gray px-4 flex-1 overflow-scroll"
      >
        <MessageLists
          messages={(value?.docs.map(collectIdsAndDocs) as IMessage[]) || []}
        />
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
