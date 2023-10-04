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

const collectionRef = collection(db, "collections");

//basic CRUD methods
export const addRecord = (newRecord) => {
  return addDoc(collectionRef, newRecord);
};
export const updateRecord = (id, updatedRecord) => {
  const recordDoc = doc(db, "collections", id);
  return updateDoc(recordDoc, updatedRecord);
};
export const deleteRecord = (id) => {
  const recordDoc = doc(db, "collections", id);
  return deleteDoc(recordDoc);
};
export const getAllRecords = () => {
  return getDocs(collectionRef);
};

export const getRecord = (id) => {
  const recordsDoc = doc(db, "collections", id);
  return getDoc(recordsDoc);
};
