import React from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "~/configs/firebase/firebase";
import { collectIdsAndDocs } from "../utils";
import useCurrentUser from "./useCurrentUser";
import { IChat } from "../models";

function useGetChats() {
  const { data: currentUser } = useCurrentUser();

  const ref = query(
    collection(db, "chats"),
    where("participants", "array-contains", currentUser?.uid)
  );

  const { data, ...others } = useFirestoreQuery(["users"], ref, {
    subscribe: true,
  });

  const availableChats = data
    ? (data.docs.map(collectIdsAndDocs) as IChat[])
    : [];

  return { data: availableChats, ...others };
}

export default useGetChats;
