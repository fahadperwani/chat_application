import ChatScreen from "./components/ChatScreen";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App h-screen bg-slate-200 flex gap-2">
      <Sidebar />

      <main className="basis-4/5 flex">
        <Chats />
        <ChatScreen />
      </main>
    </div>
  );
}

export default App;
