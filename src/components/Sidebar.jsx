import React from "react";
import { IoChatbubblesSharp, IoPersonAddSharp } from "react-icons/io5";

function Sidebar() {
  return (
    <div className="bg-white basis-1/5 p-5">
      <div className="profile flex items-center space-x-2 border-b-2 pb-3">
        <div className="image w-10 h-10 rounded-full bg-slate-400"></div>
        <h2 className="font-bold text-lg">Display Name</h2>
      </div>
      <div className="options mt-8">
        <div className="option flex space-x-2 rounded-full p-2 hover:bg-blue-400 shadow-md mb-5">
          <IoChatbubblesSharp color="gray" size={25} />
          <div className="font-bold text-gray-500 text-lg">Chat</div>
        </div>
        <div className="option flex space-x-2 rounded-full p-2 hover:bg-blue-400 shadow-md">
          <IoPersonAddSharp color="gray" size={25} />
          <div className="text-lg font-bold text-gray-500">Add Friend</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
