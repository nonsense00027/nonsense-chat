import React, { forwardRef, Ref } from "react";
import { doc } from "firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";

import { db } from "~/configs/firebase/firebase";

import useCurrentUser from "~/shared/hooks/useCurrentUser";
import { User } from "~/shared/models";

interface MessageProps {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
  attachments?: {
    type: string;
    data: string[];
  };
}

const Message = forwardRef((props: MessageProps, ref: Ref<HTMLDivElement>) => {
  const { text, userId, attachments } = props;

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
      <div
        ref={ref}
        className={`flex items-end justify-end gap-2 my-2 self-end w-4/6`}
      >
        <div className="flex flex-col">
          {text.split(" ").join("").length !== 0 ? (
            <div className="py-1 px-3 w-fit self-end rounded-full bg-gray-300">
              <p>{text}</p>
            </div>
          ) : null}
          {attachments ? (
            <div className="pt-1">
              {attachments.data.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="w-full object-contain rounded-md cursor-pointer"
                  loading="lazy"
                />
              ))}
            </div>
          ) : null}
        </div>
        <img src={userData?.photoURL} className="h-7 w-7 rounded-full" alt="" />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-end gap-2 my-2 w-4/6">
      <img src={userData?.photoURL} className="h-7 w-7 rounded-full" alt="" />
      <div>
        {text.split(" ").join("").length !== 0 ? (
          <div className="py-1 px-3 rounded-full bg-primary text-white w-fit">
            <p>{text}</p>
          </div>
        ) : null}
        {attachments ? (
          <div className="pt-1">
            {attachments.data.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
                className="w-full object-contain rounded-md cursor-pointer"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default Message;
