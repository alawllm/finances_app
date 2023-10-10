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

const collectionRef = collection(db, "records");

//basic CRUD methods
//adds a collection
export const addRecord = (newDocument) => {
  return addDoc(collectionRef, newDocument);
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
  return getDocs(collectionRef);
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
  const collectionRef = collection(db, "records");
  const q = query(collectionRef ,where("uid", "==", uid));
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
