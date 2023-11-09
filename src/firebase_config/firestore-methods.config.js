import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase-auth.config";

//records methods
const recordsRef = collection(db, "records");

//adds new item to the records collection
export const addRecord = (newDocument) => {
  return addDoc(recordsRef, newDocument);
};

export const updateRecord = (id, updatedRecord) => {
  const recordDoc = doc(db, "records", id);
  return updateDoc(recordDoc, updatedRecord);
};

export const deleteRecord = (id) => {
  const recordDoc = doc(db, "records", id);
  return deleteDoc(recordDoc);
};

//retrieving records for the current id and space
export const getRecordsDataInSpace = async (uid, currentSpaceId) => {
  const queryContent = query(
    recordsRef,
    where("uid", "==", uid),
    where("space", "==", currentSpaceId),
  );
  try {
    //getDocs - fetching document snapshots
    const querySnapshot = await getDocs(queryContent);
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

export const getAllRecordsData = async (uid) => {
  const queryContent = query(recordsRef, where("uid", "==", uid));
  try {
    //getDocs - fetching document snapshots
    const querySnapshot = await getDocs(queryContent);
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

//retrieving user data for the current id
export const getUserData = async (uid) => {
  const recordsRef = collection(db, "users");
  const queryContent = query(recordsRef, where("uid", "==", uid));
  try {
    const querySnapshot = await getDocs(queryContent);
    console.log(querySnapshot);
    const userMap = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return userMap;
  } catch (error) {
    console.log("error getting user data", error);
  }
};

//collections methods
const spacesRef = collection(db, "collections");

//adds new item to the records collection
export const addSpace = (newSpaceData) => {
  return addDoc(spacesRef, newSpaceData);
};

//retrieving collections for the current uid
export const getSpacesData = async (uid) => {
  const queryContent = query(spacesRef, where("uid", "==", uid));
  try {
    //getDocs - fetching document snapshots
    const querySnapshot = await getDocs(queryContent);
    //turning array of elements into the categoryMap object
    const spacesMap = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return spacesMap;
  } catch (error) {
    console.log("error getting spaces data", error);
  }
};

export const deleteSpace = (id) => {
  const spaceDoc = doc(db, "collections", id);
  return deleteDoc(spaceDoc);
};
