import React from "react";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";

function HomeScreen({ children, isLink = false }) {
  return (
    <div className="App w-full h-screen bg-gray-400 text-gray-300 flex gap-2 flex-col xl:flex-row  max-h-screen">
      <Sidebar />
      <main className="xl:basis-4/5 h-full flex overflow-hidden">
        <Chats isLink={isLink} />
        {children}
      </main>
    </div>
  );
}

export default HomeScreen;
