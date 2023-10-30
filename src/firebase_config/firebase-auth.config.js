import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  //observable listener - hooking in into a stream of events
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  //this API key is not a secret one - can be exposed
  apiKey: "AIzaSyDGegtdlP2c5ylHlvSrhfaf5v8RbTmqBws",
  authDomain: "finance-app-96b77.firebaseapp.com",
  projectId: "finance-app-96b77",
  storageBucket: "finance-app-96b77.appspot.com",
  messagingSenderId: "760796879529",
  appId: "1:760796879529:web:54e16f54f2eeb5fb8367b8",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //get document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  //doc - document reference
  const userDocRef = doc(db, "users", userAuth.uid);

  //getDoc - reads the document pointed by document reference
  const userSnapshot = await getDoc(userDocRef);

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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

//if the user has signed in, its a auth change
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
