import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "../firebase_config/firebase-auth.config";

//the value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  uid: null,
  setUid: () => null,
});

//the component
//wraps around the components that need the values inside
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [uid, setUserId] = useState(null);
  //current user - userDocRef from the Firestore database
  const value = { currentUser, setCurrentUser, uid, setUserId };
  console.log('current user',currentUser)
  console.log('user id',uid)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user){
            createUserDocumentFromAuth()
        }
      //set to either authenticated user or null
      setCurrentUser(user);
      setUserId(user.uid)
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
