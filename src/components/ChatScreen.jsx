import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import HomeScreen from "../HomeScreen";
import { fetcher, poster } from "../utils";
import { useLocation, useParams } from "react-router-dom";
import { useGoogleAuth } from "../context/AuthContext";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function ChatScreen() {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const [val, setVal] = useState("");
  const socket = useSelector((state) => state.socket);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      chat: chatId,
      content: val,
    };
    const res = await poster("http://localhost:4000/api/messages/send", msg);
    const result = await res.json();
    socket.emit("send-message", {
      reciever: state.chat.friend._id,
      chatId,
      message: result,
    });
    setMessages([...messages, result]);
    setVal("");
  };

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log(scrollRef);
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", (message) => {
        setMessages([...messages, message.message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    fetcher("http://localhost:4000/api/messages/chat/" + chatId).then(
      (data) => {
        setMessages(data);
      }
    );
  }, [chatId]);
  return (
    <HomeScreen>
      <div className="relative basis-3/4 shadow-xl bg-white flex flex-col overflow-auto">
        <div className="sticky top-0 flex items-center space-x-2 border-b-2 py-2 px-4 shadow-xl bg-white z-10">
          <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
            {state.chat && <img src={state.chat.friend.dp} alt="" />}
          </div>
          <h2 className="font-bold text-lg">
            {state.chat && state.chat.friend.name}
          </h2>
        </div>
        <div className="chats flex flex-col flex-1 ">
          {messages.map((message, idx) => (
            <div
              ref={idx === messages.length - 1 ? scrollRef : null}
              className={`${
                message.sender === user?._id
                  ? "bg-blue-400 rounded-br-none text-white self-end"
                  : "bg-blue-100 rounded-bl-none"
              } p-4 pb-6 m-4 max-w-[75%] break-normal rounded-lg relative min-w-20 w-fit`}
            >
              {message.content}
              <div
                className={`time absolute right-3 bottom-1 opacity-70  text-xs ${
                  message.sent ? "text-gray-50" : "text-gray-600"
                }`}
              >
                {format(new Date(message.createdAt), "hh:mm")}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSend}
          className="sticky bg-white left-0 bottom-0 p-4 flex justify-center items-center w-full space-x-3 shadow-black shadow-2xl"
        >
          <input
            type="text"
            id="message"
            placeholder="Type Message"
            className="w-1/2 py-2 px-4 border-2 rounded-lg"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </HomeScreen>
  );
}

export default ChatScreen;
