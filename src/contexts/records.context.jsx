import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../firebase_config/firebase-auth.config";

export const CategoriesContext = createContext({
  categories: [],
});

export const CategoriesProvider = ({ children }) => {
  const [recordsMap, setRecordsMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const recordsMap = await getCategoriesAndDocuments();
      console.log("category map", recordsMap);
      setRecordsMap(recordsMap);
    };
    getCategoriesMap();

    //adding initial data
    // const addCollections = async() => {
    //   const add = await addCollectionAndDocuments('records', MOCK_DATA);
    //   setCategoriesMap(add)
    // }
    // addCollections();
  }, []);

  const value = { recordsMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
