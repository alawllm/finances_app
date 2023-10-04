import { db } from "./firebase-auth.config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const collectionRef = collection(db, "records");

//basic CRUD methods
//adds a collection
export const addRecord = (collectionRef, data) => {
  return addDoc(collectionRef, data);
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

export const getRecord = (id) => {
  const recordsDoc = doc(db, "records", id);
  return getDoc(recordsDoc);
};
