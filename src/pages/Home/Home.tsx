import React from "react";
import { Outlet } from "react-router-dom";

import Chats from "./components/Chats/Chats";

function Home() {
  return (
    <div className="">
      <Chats />

      <div className="pl-[350px] max-w-[1080px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
