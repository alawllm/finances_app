import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase-auth.config";

const recordsRef = collection(db, "records");
// const collectionsRef = collection(db, "collections");

//basic CRUD methods
//adds a collection
export const addRecord = (newDocument) => {
  return addDoc(recordsRef, newDocument);
};

export const updateDocument = (id, updatedRecord) => {
  const recordDoc = doc(db, "records", id);
  return updateDoc(recordDoc, updatedRecord);
};

export const deleteDocument = (id) => {
  const recordDoc = doc(db, "records", id);
  return deleteDoc(recordDoc);
};
export const getAllDocuments = () => {
  return getDocs(recordsRef);
};

//get document snapshot
export const getDocSnapshot = (id) => {
  const recordsDoc = doc(db, "records", id);
  //fetching document snapshot
  return getDoc(recordsDoc);
};

//retrieving categories and documents from firebase
//for the current user id
export const getDocuments = async (uid) => {
  const recordsRef = collection(db, "records");
  const q = query(recordsRef, where("uid", "==", uid));
  try {
    //getDocs - fetching document snapshots
    const querySnapshot = await getDocs(q);
    //turning array of elements into the categoryMap object
    const recordsMap = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return recordsMap;
  } catch (error) {
    console.log("error getting documents", error);
  }
};

export const getUserData = async (uid) => {
  const recordsRef = collection(db, "users");
  const q = query(recordsRef, where("uid", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const userMap = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(userMap);
    return userMap;
  } catch (error) {
    console.log("error getting user data", error);
  }
};
