// import { useContext, createContext, useState, useEffect } from "react";
// import {
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
//   signInWithRedirect,
// } from "firebase/auth";
// import { auth } from "../firebase";
// import { poster } from "../utils";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         googleSignIn,
//         signout,
//         user,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useGoogleAuth = () => useContext(AuthContext);
