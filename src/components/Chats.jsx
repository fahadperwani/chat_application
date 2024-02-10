import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fetcher } from "../utils";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function Chats({ isLink }) {
  const user = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const socket = useSelector((state) => state.socket);
  const [typingId, setTypingId] = useState(null);
  const [searched, setSearched] = useState(null);
  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    if (e.target.value === "") setSearched(chats);
    setSearched(
      chats.filter((chat) =>
        chat.friend.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", (message) => {
        setChats(
          chats.filter((chat) => {
            if (chat._id === message.chatId) {
              chat.lastMessage = message.message;
            }
            return chat;
          })
        );
      });
      socket.on("update-last-message", (message) => {
        setChats(
          chats.filter((chat) => {
            if (chat._id === message.chatId) {
              chat.lastMessage = message.message;
            }
            return chat;
          })
        );
      });
      socket.on("request-accepted-from-server", (chat) => {
        setChats([...chats, chat]);
      });
      socket.on("typing-started-from-server", (chatId) => {
        setTypingId(chatId);
      });
      socket.on("typing-stopped-from-server", (chatId) => {
        setTypingId(null);
      });
    }
  }, [socket, chats]);

  useEffect(() => {
    console.log("Islink: " + isLink);
    if (user) {
      fetcher(
        process.env.REACT_APP_BACKEND_URL + "/api/messages/chats/" + user._id
      ).then((data) => setChats(data));
    }
  }, [user]);

  useEffect(() => {
    setSearched(chats);
  }, [chats]);
  return (
    <div
      className={` bg-gray-800  overflow-x-hidden px-5 flex-col lg:flex overflow-auto min-w-[300px] ${
        isLink ? "sm:hidden" : "sm:flex"
      }`}
    >
      <form className="sticky border-b-2 py-4 mb-2 top-0 z-10 bg-gray-800">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          value={search}
          onChange={handleSearch}
          className="bg-gray-600 rounded-full w-full outline-none text-md shadow-lg py-2 px-4"
        />
        <button
          type="submit"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <IoSearchSharp size={20} />
        </button>
      </form>
      <div className="chats">
        {searched &&
          searched.map((chat) => (
            <Link to={"/chat/" + chat._id} state={{ chat }}>
              <div className="chat my-4 flex space-x-2 border-b-2 py-1 cursor-pointer">
                <div className="image w-10 h-10 rounded-full overflow-hidden bg-slate-400">
                  <img src={chat.friend.dp} className="grow-1" alt="" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{chat.friend.name}</h2>
                  <p className="whitespace-nowrap w-28 text-xs text-gray-500 font-bold truncate">
                    {typingId === chat._id
                      ? "Typing..."
                      : chat.lastMessage && chat.lastMessage.content}
                  </p>
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
