import { createContext, useContext, useEffect, useState } from "react";

import { getCollectionsData } from "../firebase_config/firestore-methods.config";

import { UserContext } from "./user.context";

export const SpacesContext = createContext({
  spaces: [],
  setSpaces: () => {},
});

export const SpacesProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const { uid } = useContext(UserContext);
  console.log(spaces);
  //get collections for the current uid initially
  useEffect(() => {
    const getSpacesMap = async () => {
      const spacesMap = await getCollectionsData(uid);
      setSpaces(spacesMap);
    };
    getSpacesMap();
  }, [uid]);
  const value = { spaces, setSpaces };
  return (
    <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
  );
};
