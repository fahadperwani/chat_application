import React from "react";
import { IoSearchSharp } from "react-icons/io5";

function Chats() {
  return (
    <div className=" bg-white basis-1/4 px-5 flex-col flex overflow-auto">
      <form className="sticky border-b-2 py-4 mb-2 top-0 z-10 bg-white">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          className="bg-slate-100 rounded-full w-full outline-none text-md shadow-lg py-2 px-4"
        />
        <button
          type="submit"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <IoSearchSharp size={20} />
        </button>
      </form>
      <div className="chats">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map(() => (
          <div className="chat my-4 flex space-x-3 items-center border-b-2 py-1">
            <div className="image w-10 h-10 rounded-full bg-slate-400"></div>
            <h2 className="font-bold text-lg cursor-pointer">Friend's Name</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chats;
