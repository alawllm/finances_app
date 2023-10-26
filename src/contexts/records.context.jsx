import { createContext, useContext, useEffect, useState } from "react";

import { getRecordsData } from "../firebase_config/firestore-methods.config";

import { UserContext } from "./user.context";

export const RecordsContext = createContext({
  records: [],
  setRecords: () => {},
});

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { uid } = useContext(UserContext);
  console.log(records);
  //download the records initially
  useEffect(() => {
    const getRecordsMap = async () => {
      const recordsMap = await getRecordsData(uid);
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
  //value that is stored on the context
  const value = { records, setRecords };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
};
