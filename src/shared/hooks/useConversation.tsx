import React from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

import { db } from "~/configs/firebase/firebase";

import { IMessage } from "../models";
import { collectIdsAndDocs } from "../utils";

interface UseConversationProps {
  id: string;
}

function useConversation({ id }: UseConversationProps) {
  const ref = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp", "asc")
  );

  const { data, ...others } = useFirestoreQuery(["conversation", id], ref, {
    subscribe: true,
  });

  const messages = data ? (data.docs.map(collectIdsAndDocs) as IMessage[]) : [];

  return { data: messages, ...others };
}

export default useConversation;
