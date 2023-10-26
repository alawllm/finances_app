import { createContext, useContext, useEffect, useState } from "react";

import { getCollectionsData } from "../firebase_config/firestore-methods.config";

import { UserContext } from "./user.context";

export const CollectionsContext = createContext({
  collections: [],
  setCollections: () => {},
});

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const { uid } = useContext(UserContext);
  console.log(collections);
  //get collections for the current uid initially
  useEffect(() => {
    const getCollectionsMap = async () => {
      const collectionsMap = await getCollectionsData(uid);
      setCollections(collectionsMap);
    };
    getCollectionsMap();
  }, [uid]);
  const value = { collections, setCollections };
  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
};
