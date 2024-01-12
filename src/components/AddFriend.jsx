import React, { useState } from "react";
import HomeScreen from "../HomeScreen";
import { IoPersonAddSharp } from "react-icons/io5";
import { poster } from "../utils";
import { useGoogleAuth } from "../context/AuthContext";

function AddFriend() {
  const [val, setVal] = useState("");
  const [search, setSearch] = useState(null);
  const { user } = useGoogleAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/user/" + val);
    const data = await res.json();
    setSearch(data);
  };

  const handleSendRequest = async () => {
    console.log({
      senderId: user._id,
      recieverId: search.user?._id,
    });
    poster("http://localhost:4000/api/friend/request", {
      senderId: user._id,
      recieverId: search.user?._id,
    });
  };
  return (
    <HomeScreen>
      <div className="flex-1 bg-white p-4">
        <h1 className="font-bold text-4xl mt-10">Add Friend</h1>
        <form className="py-8 flex space-x-4">
          <input
            placeholder="example@xyz.com"
            type="text"
            name="add"
            id="add"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-[350px] outline-none bg-white text-lg py-2 px-4 rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 border-2"
          />
          <button
            className="bg-blue-500 text-white text-lg py-2 px-4 rounded-md active:scale-95"
            type="submit"
            onClick={handleClick}
          >
            Search
          </button>
        </form>

        {search ? (
          search.user ? (
            <div className="flex space-x-2 items-center">
              <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
                <img src={search.user.dp} alt="" />
              </div>
              <h2 className="font-bold text-lg mr">{search.user.name}</h2>
              <div className="w-20 flex justify-end hover:text-blue-500 cursor-pointer">
                <IoPersonAddSharp
                  onClick={handleSendRequest}
                  size={25}
                  className=""
                />
              </div>
            </div>
          ) : (
            <div>User Not Found</div>
          )
        ) : null}

        <div className="requests">
          <h2 className="font-bold text-2xl mt-10">Requests</h2>
          <div className="flex space-x-2 items-center my-5">
            <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
              {/* <img src={search.user.dp} alt="" /> */}
            </div>
            <h2 className="font-bold text-lg mr">Display Name</h2>
            <div className="w-40 flex justify-end ">
              <button className="text-white bg-blue-500 cursor-pointer py-2 px-4 rounded-md active:scale-95 justify">
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeScreen>
  );
}

export default AddFriend;
