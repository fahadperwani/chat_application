import React from "react";
import { IoChatbubblesSharp, IoPersonAddSharp } from "react-icons/io5";
import { useGoogleAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const { user, signout } = useGoogleAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white basis-1/5 p-5">
      <div className="profile flex items-center space-x-2 border-b-2 pb-3">
        <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
          {user && <img src={user.dp} referrerpolicy="no-referrer" />}
        </div>
        <h2 className="font-bold text-lg">
          {user ? user.name : "Display Name"}
        </h2>
        <div className="hover:text-blue-500 cursor-pointer flex justify-end flex-1">
          <FiLogOut onClick={handleSignOut} size={20} />
        </div>
      </div>
      <div className="options mt-8">
        <div className="option sm:hidden flex space-x-2 p-2 text-gray-500 hover:text-blue-400 hover:border-blue-400 shadow-md mb-5">
          <IoChatbubblesSharp color="" size={25} />
          <div className="font-bold  text-lg">Chat</div>
        </div>
        <Link to={"/add-friend"} relative="path">
          <div className="option flex space-x-2 p-2 text-gray-500 hover:text-blue-400 hover:border-blue-400 shadow-md mb-5">
            <IoPersonAddSharp size={25} />
            <div className="text-lg font-bold">Add Friend</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
