import React, { useEffect, useState } from "react";
import HomeScreen from "../HomeScreen";
import { IoPersonAddSharp } from "react-icons/io5";
import { fetcher, poster } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, updateRequests } from "../store/action";

function AddFriend() {
  const [val, setVal] = useState("");
  const [search, setSearch] = useState(null);
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const socket = useSelector((state) => state.socket);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/user/" + val
    );
    const data = await res.json();
    setSearch(data);
  };

  const handleSendRequest = async () => {
    console.log({
      senderId: user._id,
      recieverId: search.user?._id,
    });
    await poster(process.env.REACT_APP_BACKEND_URL + "/api/friend/request", {
      senderId: user._id,
      recieverId: search.user._id,
    });
    socket.emit("friend-request-sent", {
      senderId: user._id,
      recieverId: search.user?._id,
    });
    dispatch(updateRequests([...user.requestsSent, search.user._id]));
    setVal("");
  };

  const handleAccept = async (_id, index) => {
    console.log(_id);
    const chat = await poster(
      process.env.REACT_APP_BACKEND_URL + "/api/friend/accept",
      {
        senderId: _id,
        recieverId: user._id,
      }
    );
    const data = await chat.json();
    socket.emit("request-accepted", data);
    setRequests(requests.filter((request) => request._id !== _id));
  };

  useEffect(() => {
    if (user) {
      fetcher(
        process.env.REACT_APP_BACKEND_URL + "/api/friend/requests/" + user._id
      ).then((res) => setRequests(res.requests));
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("friend-request-from-server", (user) => {
        setRequests([...requests, user]);
      });

      return () => socket.off("friend-request-from-server");
    }
  }, [socket]);

  useEffect(() => {
    if (notification) dispatch(setNotification(false));
  }, [notification]);
  return (
    <HomeScreen isLink={true}>
      <div className="flex-1 bg-gray-700 p-4">
        <h1 className="font-bold text-4xl mt-10">Add Friend</h1>
        <form className="py-8 flex space-x-4">
          <input
            placeholder="example@xyz.com"
            type="text"
            name="add"
            id="add"
            value={val}
            autoComplete="off"
            onChange={(e) => setVal(e.target.value)}
            className="md:w-[350px]  outline-none bg-white text-black text-lg py-2 px-4 rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 border-2"
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
                <img src={search.user.dp} alt="" referrerpolicy="no-referrer" />
              </div>
              <h2 className="font-bold text-lg mr">{search.user.name}</h2>
              <div className="min-w-36 flex justify-end hover:text-blue-500">
                {user &&
                user.friends &&
                (user.friends.includes(search?.user?._id) ||
                  user._id == search.user._id) ? (
                  <></>
                ) : user.requestsSent &&
                  user.requestsSent.includes(search.user._id) ? (
                  <p className="text-xs text-green-700">Request Sent</p>
                ) : (
                  <IoPersonAddSharp
                    onClick={handleSendRequest}
                    cursor={"pointer"}
                    size={25}
                    className=""
                  />
                )}
              </div>
            </div>
          ) : (
            <div>User Not Found</div>
          )
        ) : null}

        <div className="requests">
          <h2 className="font-bold text-2xl mt-10">Requests</h2>
          {requests.length > 0 ? (
            requests.map((request, idx) => {
              return (
                <div className="flex space-x-2 items-center my-5">
                  <div className="image w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
                    <img src={request.dp} alt="" referrerpolicy="no-referrer" />
                  </div>
                  <h2 className="font-bold text-lg mr">{request.name}</h2>
                  <div className="w-40 flex justify-end ">
                    <button
                      onClick={() => handleAccept(request._id, idx)}
                      className="text-white bg-blue-500 cursor-pointer py-2 px-4 rounded-md active:scale-95 justify"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No requests</div>
          )}
        </div>
      </div>
    </HomeScreen>
  );
}

export default AddFriend;
