import React from "react";

const messages = [
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfjsdhfadfkslhsdklhkasdflhkljdfhjdfhjkasdfhjkncmxnz,vhklfhsdaiohfiwehefiowashiufhadskjh",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: false,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: false,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: false,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: false,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: true,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
  {
    sent: false,
    message:
      "fskjlsdjkldfjkljfkljsdkljdfkljklasdfjklsdfjklsdfjkldfjakljdfklsjdfkljklajkldfj",
  },
];

function ChatScreen() {
  return (
    <div className="relative basis-3/4 shadow-xl bg-white flex flex-col overflow-auto">
      <div className="sticky top-0 flex items-center space-x-2 border-b-2 py-2 px-4 shadow-xl bg-white z-10">
        <div className="image w-10 h-10 rounded-full bg-slate-400"></div>
        <h2 className="font-bold text-lg">Display Name</h2>
      </div>
      <div className="chats flex flex-col ">
        {messages.map((message) => (
          <div
            className={`${
              message.sent ? "bg-blue-500 text-white self-end" : "bg-blue-100"
            } p-4 m-4 max-w-[75%] break-normal rounded-lg relative`}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
            quisquam culpa ducimus facere doloremque dolore velit omnis
            molestias! Dignissimos blanditiis velit harum aliquam, adipisci sunt
            numquam suscipit nesciunt, exercitationem ab corrupti temporibus non
            laudantium earum minima quidem a quo itaque explicabo ea animi!
            Laudantium debitis animi cupiditate deleniti tempora praesentium!
            <div
              className={`time absolute right-5 bottom-1 opacity-70  text-sm ${
                message.sent ? "text-gray-50" : "text-gray-600"
              }`}
            >
              04:00
            </div>
          </div>
        ))}
      </div>
      <form className="sticky bg-white left-0 bottom-0 p-4 flex justify-center items-center w-full space-x-3">
        <input
          type="text"
          id="message"
          placeholder="Type Message"
          className="w-1/2 py-2 px-4 border-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
