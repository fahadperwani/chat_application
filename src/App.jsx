import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFriend from "./components/AddFriend";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./LoginPage";
import HomeScreen from "./HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/chat/:chat" element={<ChatScreen />} />
        <Route path="/add-friend" element={<AddFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
