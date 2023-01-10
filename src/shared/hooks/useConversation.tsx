import React, { useEffect } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

import { db } from "~/configs/firebase/firebase";

import { IMessage } from "../models";
import { collectIdsAndDocs } from "../utils";
import { useQueryClient } from "react-query";
import { flushSync } from "react-dom";

interface UseConversationProps {
  id: string;
  success: Function;
}

function useConversation({ id, success }: UseConversationProps) {
  const ref = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp", "asc")
  );

  const { data, ...others } = useFirestoreQuery(
    ["conversation", id],
    ref,
    {
      subscribe: true,
    },
    {
      onSuccess: (data) => {
        // flushSync(() => {
        //   success();
        // });
        // console.log("success", data.docs.map(collectIdsAndDocs));
      },
    }
  );

  const messages = data && (data.docs.map(collectIdsAndDocs) as IMessage[]);

  return { data: messages, ...others };
}

export default useConversation;
