import { Routes, Route, HashRouter } from "react-router-dom";
import AddFriend from "./components/AddFriend";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./LoginPage";
import HomeScreen from "./HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetcher } from "./utils";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, setSocket, set_User } from "./store/action";
import PrivateRoutesLayout from "./layouts/PrivateRoutesLayout";
import Loading from "./components/Loading";

function App() {
  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (newUser) => {
      if (newUser && !user) {
        const res = await fetcher(
          process.env.REACT_APP_BACKEND_URL + "/api/user/" + newUser.email
        );
        console.log("Res : " + JSON.stringify(res));
        dispatch(set_User(res.user));
      }
      setLoading(false);
    });

    if (user && !socket) {
      const socket = io(process.env.REACT_APP_BACKEND_SOCKET, {
        query: { id: user._id },
      });
      dispatch(setSocket(socket));
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("friend-request-from-server", () => {
        dispatch(setNotification(true));
      });
      return () => socket.off("friend-request-from-server");
    }
  }, [socket]);
  return (
    <HashRouter>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route element={<PrivateRoutesLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/chat/:chatId" element={<ChatScreen />} />
            <Route path="/add-friend" element={<AddFriend />} />
          </Route>
        </Routes>
      )}
    </HashRouter>
  );
}

export default App;
