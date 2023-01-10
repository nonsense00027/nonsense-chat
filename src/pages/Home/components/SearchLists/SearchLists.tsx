import React from "react";
import { IUser } from "~/shared/models";
import SearchItem from "../SearchItem/SearchItem";

interface SearchListsProps {
  lists: IUser[];
  resetSearch: Function;
}

function SearchLists({ lists, resetSearch }: SearchListsProps) {
  return (
    <div className="px-2">
      {lists.map((item) => (
        <SearchItem
          key={item.id}
          id={item.id}
          photo={item.photoURL}
          displayName={item.displayName}
          resetSearch={resetSearch}
        />
      ))}
    </div>
  );
}

export default SearchLists;
