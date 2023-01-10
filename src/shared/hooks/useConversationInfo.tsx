import React from "react";
import { doc } from "firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";

import { db } from "~/configs/firebase/firebase";

import { IConversation } from "../models";

interface UseConversationInfoProps {
  id: string;
}

function useConversationInfo({ id }: UseConversationInfoProps) {
  const ref = doc(db, "chats", id);

  const { data, ...others } = useFirestoreDocument(["chats", id], ref);

  const conversationData = data
    ? ({ id: data.id, ...data.data() } as IConversation)
    : null;

  return { data: conversationData, ...others };
}

export default useConversationInfo;
