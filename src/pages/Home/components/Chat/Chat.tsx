import { User } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "~/shared/hooks/useCurrentUser";
import useGetUserInfo from "~/shared/hooks/useGetUserInfo";
import { formatConversationId } from "~/shared/utils";

interface ChatProps {
  id: string;
  message?: string;
  participants?: string[];
  lastMessageUser?: string;
}

function Chat(props: ChatProps) {
  const { id, message, participants, lastMessageUser } = props;

  const navigate = useNavigate();

  const { data } = useCurrentUser();

  const { data: userInfo } = useGetUserInfo({ userId: getUserId() });

  function getUserId() {
    if (!participants) return id;

    const currentUser = data as User;

    const userId = participants.filter((item) => item !== currentUser.uid)[0];
    return userId;
  }

  const handleClick = () => {
    const currentUser = data as User;

    navigate(`conversations/${formatConversationId(currentUser.uid, id)}`, {
      replace: true,
    });
  };

  function isLastMessageUserMe() {
    if (!lastMessageUser || !data) return null;
    if (lastMessageUser === data.uid) return "You: ";
    return null;
  }
  return (
    <div
      className="p-2 hover:bg-gray cursor-pointer transition-all duration-150 ease-out rounded-md"
      onClick={handleClick}
    >
      <div className="flex gap-2 items-center">
        <img
          src={userInfo?.photoURL}
          alt=""
          className="w-12 h-12 rounded-full object-contain shadow-sm"
        />
        <div>
          <h1 className="font-medium">{userInfo?.displayName}</h1>
          {message ? (
            <p className="text-sm">
              {isLastMessageUserMe()}
              {message.slice(0, 35)}
              {message.length > 35 && "..."}
            </p>
          ) : (
            <p className="text-sm italic opacity-40">Start a conversation</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
