import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import useDebounce from "~/shared/hooks/useDebounce";
import useSearchUsers from "~/shared/hooks/useSearchUsers";

import ChatLists from "../ChatLists/ChatLists";
import useGetChats from "~/shared/hooks/useGetChats";
import SearchLists from "../SearchLists/SearchLists";

function Chats() {
  const [search, setSearch] = useState<string>("");

  const debouncedValue = useDebounce({ value: search, delay: 500 });

  const { data: searchLists } = useSearchUsers({ searchStr: debouncedValue });

  const { data: availableChats, isFetching } = useGetChats();

  function isSearching() {
    if (search.length > 0) return true;
  }

  function resetSearch() {
    setSearch("");
  }

  if (isFetching) {
    return <div></div>;
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-[350px] bg-white shadow-sm z-50">
      {/* CHATS HEADER */}
      <div className="pb-8">
        <h1 className="text-3xl font-bold p-2">Chats</h1>

        {/* SEARCH BAR */}
        <form className="my-2">
          <div className="px-3">
            <div className="bg-gray flex p-2 rounded-full border border-gray-200 shadow-sm">
              <MagnifyingGlassIcon className="h-5 w-5 opacity-40" />
              <input
                type="search"
                className="bg-transparent flex-1 focus:outline-none px-2"
                placeholder="Search someone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      {isSearching() ? (
        <SearchLists resetSearch={resetSearch} lists={searchLists || []} />
      ) : (
        <ChatLists chats={availableChats} />
      )}
    </div>
  );
}

export default Chats;
