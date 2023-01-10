import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import React, { forwardRef, Ref, useEffect } from "react";
import { QueryCache, useQueryClient } from "react-query";
import { db } from "~/configs/firebase/firebase";
import useCurrentUser from "~/shared/hooks/useCurrentUser";
import { User } from "~/shared/models";
import { collectIdsAndDocs } from "~/shared/utils";

interface MessageProps {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
}

const Message = forwardRef((props: MessageProps, ref: Ref<HTMLDivElement>) => {
  const { text, userId } = props;

  const { data: currentUser } = useCurrentUser();

  const usersRef = doc(db, "users", userId);

  const { data } = useFirestoreDocument(
    ["messages", "message", userId],
    usersRef
  );

  const userData = data ? ({ id: data.id, ...data.data() } as User) : null;

  const isCurrentUser = () => userId === currentUser?.uid;

  if (isCurrentUser()) {
    return (
      <div ref={ref} className={`flex items-center gap-2 my-2 self-end`}>
        <div className="py-1 px-3 rounded-full bg-gray-300">
          <p>{text}</p>
        </div>
        <img src={userData?.photoURL} className="h-7 w-7 rounded-full" alt="" />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-center gap-2 my-2 ">
      <img src={userData?.photoURL} className="h-7 w-7 rounded-full" alt="" />
      <div className="py-1 px-3 rounded-full bg-primary text-white">
        <p>{text}</p>
      </div>
    </div>
  );
});

export default Message;
