import { createContext, useContext, useEffect, useState } from "react";

import { getSpacesData } from "../firebase_config/firestore-methods.config";

import { UserContext } from "./user.context";

export const SpacesContext = createContext({
  spaces: [],
  setSpaces: () => {},
  currentSpace: null,
  setCurrentSpace: () => {},
});

export const SpacesProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const [currentSpace, setCurrentSpace] = useState({});
  const { uid } = useContext(UserContext);

  useEffect(() => {
    const getSpacesMap = async () => {
      const spacesMap = await getSpacesData(uid);
      setSpaces(spacesMap);
    };
    getSpacesMap();
  }, [uid]);
  const value = { spaces, setSpaces, currentSpace, setCurrentSpace };
  return (
    <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
  );
};
