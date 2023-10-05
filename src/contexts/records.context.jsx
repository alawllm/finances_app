import { createContext, useEffect,useState } from "react";

import { getDocuments } from "../firebase_config/firestore-records.config";

export const RecordsContext = createContext({
  categories: [],
});

export const RecordsProvider = ({ children }) => {
  const [recordsMap, setRecordsMap] = useState({});

  useEffect(() => {
    const getRecordsMap = async () => {
      const recordsMap = await getDocuments();
      console.log("records map", recordsMap);
      setRecordsMap(recordsMap);
    };
    getRecordsMap();

    //adding initial data
    // const addCollections = async() => {
    //   const add = await addCollectionAndDocuments('records', MOCK_DATA);
    //   setCategoriesMap(add)
    // }
    // addCollections();
  }, []);

  const value = { recordsMap };

  return (
    <RecordsContext.Provider value={value}>
      {children}
    </RecordsContext.Provider>
  );
};
