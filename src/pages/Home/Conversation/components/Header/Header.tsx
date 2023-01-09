import React from "react";
import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";

function Header() {
  return (
    <header className="bg-white w-full h-16 flex items-center px-4 shadow-sm justify-between">
      <h1 className="font-semibold">Mckeen</h1>
      <div className="flex space-x-4">
        <PhoneIcon className="conversation-header-icon" />
        <VideoCameraIcon className="conversation-header-icon" />
        <EllipsisVerticalIcon className="conversation-header-icon" />
      </div>
    </header>
  );
}

export default Header;
