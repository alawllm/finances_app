//AUTHENTICATION
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  //observable listener - hooking in into a stream of events
  onAuthStateChanged,
} from "firebase/auth";

//FIRESTORE
import {
  getFirestore,
  //retrieves documents from the database
  doc,
  //getting one doc from firestore
  getDoc,
  //setting the document's data
  setDoc,
  //gives the collection
  collection,
  writeBatch,
} from "firebase/firestore";

//firebase configuration object
const firebaseConfig = {
  //this API key is not a secret one - can be exposed
  apiKey: "AIzaSyDGegtdlP2c5ylHlvSrhfaf5v8RbTmqBws",
  authDomain: "finance-app-96b77.firebaseapp.com",
  projectId: "finance-app-96b77",
  storageBucket: "finance-app-96b77.appspot.com",
  messagingSenderId: "760796879529",
  appId: "1:760796879529:web:54e16f54f2eeb5fb8367b8",
};

// initialize Firebase
//every CRUD action happens using this firebaseApp instance
const firebaseApp = initializeApp(firebaseConfig);

//inizializing user auth
//auth objects - provides methods for managing user authentication states
export const auth = getAuth(firebaseApp);
console.log("auth", auth);
//initializing database
//returns auth object of the firestore database
export const db = getFirestore(firebaseApp);
console.log("db", db);

//creating a collection
//adding initial data
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  //storing collections as separate documents
  //writeBatch - adding objects with one transaction - passing batch to the database
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //get document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

//creating user reference in the firestore database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  //checking if there is an existing user reference
  //doc - document reference
  const userDocRef = doc(db, "users", userAuth.uid);

  //get user data from the firestore database
  //getDoc - reads the document pointed by document reference
  const userSnapshot = await getDoc(userDocRef);

  //if userData does not exist, create/ set the document with the data from userAuth
  //data saved in the collection in the firestore database
  if (!userSnapshot.exists()) {
    const { displayName, email, uid } = userAuth;
    //new date object
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        uid,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

//creating auth user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

//signing in auth user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//returns back signout
export const signOutUser = async () => await signOut(auth);

//returns observer listener
//if the user has signed in, its a auth change
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
