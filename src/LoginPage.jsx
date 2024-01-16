import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { googleSignIn, poster } from "./utils";
import { useDispatch } from "react-redux";
import { set_User } from "./store/action";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    } finally {
      // navigate("/");
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        console.log(newUser);
        const temp = {
          name: newUser.displayName,
          dp: newUser.photoURL,
          _id: newUser.uid,
          email: newUser.email,
        };

        const res = await poster("http://localhost:4000/api/user", temp);
        const { user } = await res.json();
        dispatch(set_User(user));
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, []);

  return (
    <div className="m-auto py-20 w-fit">
      <h1 className="font-bold text-4xl text-center">Login</h1>
      <button
        onClick={handleSignIn}
        className="flex my-4 bg-blue-500 items-center text-white text-sm py-2 px-4 rounded-md active:scale-95 gap-2"
      >
        <FaGoogle />
        Sign In With Google
      </button>
    </div>
  );
}

export default LoginPage;
