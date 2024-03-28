import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import HomeScreen from "../HomeScreen";
import { fetcher, poster } from "../utils";
import { useLocation, useParams } from "react-router-dom";
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
  const [friendTyping, setFriendTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  const chats = useSelector((state) => state.chats);

  function timeoutFunction() {
    setTyping(false);
    socket.emit("typing-stopped", { chatId, id: state.chat.friend._id });
  }

  const handleInput = (e) => {
    setVal(e.target.value);
    console.log(typing);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { chatId, id: state.chat.friend._id });
      setTimeOut(setTimeout(timeoutFunction, 1000));
    } else {
      clearTimeout(timeOut);
      setTimeOut(setTimeout(timeoutFunction, 1000));
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      chat: chatId,
      content: val,
    };
    const res = await poster(
      process.env.REACT_APP_BACKEND_URL + "/api/messages/send",
      msg
    );
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
      // scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", ({ message }) => {
        console.log(messages.length);
        console.log(...messages);
        setMessages([...messages, message]);
        return () => socket.off("message-from-server");
      });

      socket.on("typing-started-from-server/" + chatId, () => {
        setFriendTyping(true);
        return () => socket.off("typing-started-from-server/" + chatId);
      });

      socket.on("typing-stopped-from-server/" + chatId, () => {
        setFriendTyping(false);
        return () => socket.off("typing-stopped-from-server/" + chatId);
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    console.log(chatId);
    console.log("Chats: " + JSON.stringify(chats));
    let msgs = [];
    chats?.forEach((chat) => {
      if (chat._id == chatId) {
        console.log("Chat: " + JSON.stringify(chat.messages));
        msgs = chat.messages;
        // return chat.messages;
      }
    });
    // console.log("Messages: " + JSON.stringify(msgs));
    setMessages(msgs);
    // fetcher(
    //   process.env.REACT_APP_BACKEND_URL + "/api/messages/chat/" + chatId
    // ).then((data) => {
    //   setMessages(data);
    // });
  }, [chatId]);
  return (
    <HomeScreen isLink={true}>
      <div className="relative basis-3/4 shadow-xl bg-gray-700 flex flex-col overflow-auto sm:flex-1">
        <div className="sticky top-0 flex items-center space-x-2 bg-gray-800 border-b-2 py-2 px-4 shadow-xl z-10">
          <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
            {state.chat && <img src={state.chat.friend.dp} alt="" />}
          </div>
          <h2 className="font-bold text-lg">
            {state.chat && state.chat.friend.name}
            {friendTyping && (
              <p className="text-xs text-gray-200 font-bold">Typing....</p>
            )}
          </h2>
        </div>
        <div className="chats flex flex-col flex-1 ">
          {messages.map((message, idx) => {
            console.log("message: " + JSON.stringify(message));
            return (
              <div
                // ref={idx === messages.length - 1 ? scrollRef : null}
                className={`${
                  message.sender === user?._id
                    ? "bg-blue-600 rounded-br-none text-white self-end"
                    : "bg-blue-950 rounded-bl-none"
                } p-4 pb-6 m-4 max-w-[75%] break-normal rounded-lg relative min-w-20 w-fit`}
              >
                {message.content}
                <div
                  className={`time absolute right-3 bottom-1 opacity-70  text-xs ${
                    message.sent ? "text-gray-50" : "text-gray-50"
                  }`}
                >
                  {format(new Date(message.createdAt), "hh:mm")}
                </div>
              </div>
            );
          })}
          <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
        </div>
        <form
          onSubmit={handleSend}
          className="sticky left-0 bottom-0 p-4 flex justify-center items-center w-full space-x-3 bg-gray-700 shadow-white shadow-2xl"
        >
          <input
            type="text"
            id="message"
            placeholder="Type Message"
            autoComplete="off"
            className="w-1/2 py-2 px-4 border-2 rounded-lg flex-1 outline-none  text-gray-800"
            value={val}
            onChange={handleInput}
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
