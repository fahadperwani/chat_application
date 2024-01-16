import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../context/AuthContext";
import { fetcher } from "../utils";
import { format } from "date-fns";

function Chats() {
  const { user } = useGoogleAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      fetcher("http://localhost:4000/api/messages/chats/" + user._id).then(
        (data) => setChats(data)
      );
    }
  }, [user]);
  return (
    <div className=" bg-white basis-1/4 overflow-x-hidden px-5 flex-col flex overflow-auto">
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
        {chats.map((chat) => (
          <Link to={"/chat/" + chat._id} state={{ chat }}>
            <div className="chat my-4 flex space-x-2 border-b-2 py-1 cursor-pointer">
              <div className="image w-10 h-10 rounded-full overflow-hidden bg-slate-400">
                <img src={chat.friend.dp} className="grow-1" alt="" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{chat.friend.name}</h2>
                {chat.lastMessage && (
                  <p className="whitespace-nowrap w-28 text-xs text-gray-500 font-bold truncate">
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-400 font-bold ml-auto text-right flex-1">
                {chat.lastMessage &&
                  format(new Date(chat.lastMessage.createdAt), "hh:mm")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Chats;
