import React, { useEffect } from "react";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";
import { useGoogleAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function HomeScreen({ children }) {
  const navigate = useNavigate();
  const { setUser } = useGoogleAuth();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
  }, []);
  return (
    <div className="App h-screen bg-slate-200 flex gap-2">
      <Sidebar />
      <main className="basis-4/5 flex">
        <Chats />
        {children}
      </main>
    </div>
  );
}

export default HomeScreen;
