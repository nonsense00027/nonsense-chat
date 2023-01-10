import React from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "~/configs/firebase/firebase";
import { collectIdsAndDocs } from "../utils";
import useCurrentUser from "./useCurrentUser";
import { IUser } from "../models";

interface UseSearchUsersProps {
  searchStr: string;
}
function useSearchUsers({ searchStr }: UseSearchUsersProps) {
  const { data: currentUser } = useCurrentUser();

  const ref = query(
    collection(db, "users"),
    where("searchKeywords", "array-contains", searchStr),
    where("id", "!=", currentUser?.uid)
  );

  const { data, ...others } = useFirestoreQuery(["users", searchStr], ref);

  const searchUsers = data?.docs.map(collectIdsAndDocs) as IUser[];

  return { data: searchUsers, ...others };
}

export default useSearchUsers;
