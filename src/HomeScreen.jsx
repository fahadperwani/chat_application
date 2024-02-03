import React, { useEffect } from "react";
import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetcher } from "./utils";

function HomeScreen({ children, isLink = false }) {
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
    <div className="App w-full h-screen bg-slate-200 flex gap-2 flex-col xl:flex-row  max-h-screen">
      <Sidebar />
      <main className="xl:basis-4/5 h-full flex overflow-hidden">
        <Chats isLink={isLink} />
        {children}
      </main>
    </div>
  );
}

export default HomeScreen;
