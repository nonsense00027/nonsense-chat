import { User } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "~/shared/hooks/useCurrentUser";
import { formatConversationId } from "~/shared/utils";

interface SearchItemProps {
  id: string;
  photo: string;
  displayName: string;
  resetSearch: Function;
}

function SearchItem(props: SearchItemProps) {
  const { id, photo, displayName, resetSearch } = props;

  const navigate = useNavigate();

  const { data } = useCurrentUser();

  const handleClick = () => {
    const currentUser = data as User;

    navigate(`conversations/${formatConversationId(currentUser.uid, id)}`, {
      replace: true,
    });

    resetSearch();
  };

  return (
    <div
      className="p-2 hover:bg-gray cursor-pointer transition-all duration-150 ease-out rounded-md"
      onClick={handleClick}
    >
      <div className="flex gap-2 items-center">
        <img
          src={photo}
          alt=""
          className="w-12 h-12 rounded-full object-contain shadow-sm"
        />
        <div>
          <h1 className="font-medium">{displayName}</h1>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
