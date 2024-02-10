import React from "react";
import { IoChatbubblesSharp, IoPersonAddSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signout } from "../utils";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);
  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 xl:basis-1/5 xl:p-5 px-10 py-3 justify-between xl:justify-normal flex w-screen xl:flex-col xl:h-screen h-30">
      <div className="profile flex items-center space-x-2 xl:border-b-2 xl:pb-3">
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
      <div className="options flex space-x-2 xl:mt-8">
        <Link to={"/add-friend"} className="flex-1" relative="path">
          <div className="option relative flex space-x-2 p-2 items-center  hover:text-blue-400 xl:shadow-md">
            <IoPersonAddSharp size={25} />
            <div className="text-lg font-bold hidden xl:block">Add Friend</div>
            {notification && (
              <div className="w-4 h-4 absolute -top-2 right-0 bg-blue-900 rounded-full shadow-xl z-10"></div>
            )}
          </div>
        </Link>
        <Link to={"/"}>
          <div className="option relative lg:hidden flex space-x-2 p-2 items-center text-gray-500 hover:text-blue-400 xl:shadow-md">
            <IoChatbubblesSharp size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
