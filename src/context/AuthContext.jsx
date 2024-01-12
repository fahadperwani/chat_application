import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";
import { poster } from "../utils";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

        await poster("http://localhost:4000/api/user", temp);
        // await fetch("http://localhost:4000/api/user", {
        //   method: "POST",
        //   body: temp,
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // });
        setUser({
          name: newUser.displayName,
          dp: newUser.photoURL,
          _id: newUser.uid,
          email: newUser.email,
        });
      }
    });

    return () => unSubscribe();
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        signout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(AuthContext);
