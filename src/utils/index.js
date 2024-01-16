import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

export const fetcher = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const poster = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};

export const signout = async () => {
  await signOut(auth);
};
