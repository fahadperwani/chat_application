import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFriend from "./components/AddFriend";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./LoginPage";
import HomeScreen from "./HomeScreen";
import { useEffect } from "react";
import { useGoogleAuth } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetcher } from "./utils";

function App() {
  const { user, setUser } = useGoogleAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (newUser) => {
      console.log(newUser);
      if (newUser && !user) {
        const res = await fetcher(
          "http://localhost:4000/api/user/" + newUser.email
        );
        setUser(res.user);
      }
    });

    // return () => unSubscribe();
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/chat/:chatId" element={<ChatScreen />} />
        <Route path="/add-friend" element={<AddFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
