import React from "react";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "~/configs/firebase/firebase";
import { User } from "../models";

interface UseGetUserInfoProps {
  userId: string;
}

function useGetUserInfo({ userId }: UseGetUserInfoProps) {
  const usersRef = doc(db, "users", userId);

  const { data, ...others } = useFirestoreDocument(["users", userId], usersRef);

  const userData = data ? ({ id: data.id, ...data.data() } as User) : null;

  return { data: userData, ...others };
}

export default useGetUserInfo;
