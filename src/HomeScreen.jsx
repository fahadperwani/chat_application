import React, { useEffect } from "react";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";
import { useGoogleAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetcher } from "./utils";

function HomeScreen({ children }) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, async (newUser) => {
  //     if (!newUser) navigate("/login");
  //     else if (!user) {
  //       const res = await fetcher(
  //         "http://localhost:4000/api/user/" + newUser.email
  //       );
  //       setUser(res.user);
  //     }
  //   });

  //   // return () => unSubscribe();
  // }, []);
  return (
    <div className="App h-screen w-screen bg-slate-200 flex gap-2">
      <Sidebar />
      <main className="basis-4/5 flex">
        <Chats />
        {children}
      </main>
    </div>
  );
}

export default HomeScreen;
