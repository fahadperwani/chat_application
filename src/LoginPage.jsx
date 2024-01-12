import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { user, googleSignIn, googleSignUp } = useGoogleAuth();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

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
