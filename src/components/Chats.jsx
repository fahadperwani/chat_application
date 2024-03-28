import React, { useCallback, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fetcher } from "../utils";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addChat, addMessage, setChats } from "../store/action";

function Chats({ isLink }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  // const [chats, setChats] = useState([]);
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

  const addNewMessage = useCallback(
    ({ message }) => {
      console.log(JSON.stringify(chats));
      dispatch(
        setChats(
          chats?.map((chat) => {
            console.log("Chat:  " + JSON.stringify(chat._id));
            console.log("MessageId:  " + JSON.stringify(message));
            if (chat._id == message.chat) {
              console.log(
                "JSON: " + JSON.stringify([...chat.messages, message])
              );
              chat.messages = [...chat.messages, message];
              chat.lastMessage = message;
            }
            return chat;
          })
        )
      );
    },
    [chats]
  );

  useEffect(() => {
    socket.on("message-from-server", addNewMessage);

    socket.on("update-last-message", addNewMessage);

    socket.on("request-accepted-from-server", (chat) => {
      dispatch(addChat(chat));
    });

    socket.on("typing-started-from-server", (chatId) => {
      setTypingId(chatId);
    });

    socket.on("typing-stopped-from-server", (chatId) => {
      setTypingId(null);
    });

    return () => {
      socket.off("message-from-server", addNewMessage);
      socket.off("update-last-message", addNewMessage);
      socket.off("typing-started-from-server");
      socket.off("typing-stopped-from-server");
    };
  }, [socket]);

  useEffect(() => {
    if (user) {
      fetcher(
        process.env.REACT_APP_BACKEND_URL + "/api/messages/chats/" + user._id
      ).then((data) => {
        // setChats(data)
        dispatch(setChats(data));
      });
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
                  <img
                    src={chat.friend.dp}
                    className="grow-1"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
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
