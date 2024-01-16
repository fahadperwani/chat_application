import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFriend from "./components/AddFriend";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./LoginPage";
import HomeScreen from "./HomeScreen";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetcher } from "./utils";
import { Socket, io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, set_User } from "./store/action";

function App() {
  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      console.log("Id: " + socket.id);
      socket.on("hello-from-server", () => {
        console.log("Hello from server");
      });
    }
  }, [socket]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser && !user) {
        const res = await fetcher(
          "http://localhost:4000/api/user/" + newUser.email
        );
        console.log("Res user: " + res.user);
        dispatch(set_User(res.user));
      }
    });

    if (user && !socket) {
      const socket = io("http://localhost:4000", { query: { id: user._id } });
      dispatch(setSocket(socket));
      console.log(Socket);
    }
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
