import { createContext, useContext,useEffect, useState } from "react";

import { getDocuments } from "../firebase_config/firestore-records.config";

import { UserContext } from "./user.context";

export const RecordsContext = createContext({
  records: [],
  setRecords: () => {},
});

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const {uid} = useContext(UserContext);

  //download the records initially
  useEffect(() => {
    const getRecordsMap = async () => {
      const recordsMap = await getDocuments(uid);
      setRecords(recordsMap);
    };
    getRecordsMap();

    //adding initial data
    // const addCollections = async() => {
    //   const add = await addCollectionAndDocuments('records', MOCK_DATA);
    //   setCategoriesMap(add)
    // }
    // addCollections();
  }, [uid]);

  const value = { records, setRecords };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
};
