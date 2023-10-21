import { createContext, useEffect, useState } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../firebase_config/firebase-auth.config";
import { getUserData } from "../firebase_config/firestore-methods.config";

//the value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  uid: null,
  setUid: () => null,
  userName: null,
});

//the component
//wraps around the components that need the values inside
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [uid, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  //current user - userDocRef from the Firestore database
  const value = { currentUser, setCurrentUser, uid, setUserId, userData };
  console.log("current user", currentUser);
  console.log("user id", uid);
  console.log("userData", userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth();
      }
      //set to either authenticated user or null
      setCurrentUser(user);
      if (user) {
        setUserId(user.uid);
        const userMap = await getUserData(user.uid);
        setUserData(userMap[0]);
        console.log("user map", userMap);
      }
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
