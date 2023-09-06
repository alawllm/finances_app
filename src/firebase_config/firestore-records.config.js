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

const recordsCollectionRef = collection(db, "records");

//basic CRUD methods
//pass new record to the collection
export const addRecord = (newRecord) => {
  return addDoc(recordsCollectionRef, newRecord);
};
export const updateRecord = (id, updatedRecord) => {
  const recordDoc = doc(db, "records", id);
  return updateDoc(recordDoc, updatedRecord);
};
export const deleteRecord = (id) => {
  const recordDoc = doc(db, "records", id);
  return deleteDoc(recordDoc);
};
export const getAllRecords = () => {
  return getDocs(recordsCollectionRef);
};

export const getRecord = (id) => {
  const recordsDoc = doc(db, "records", id);
  return getDoc(recordsDoc);
};
