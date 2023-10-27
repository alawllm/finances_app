import { createContext, useContext, useEffect, useState } from "react";

import { getRecordsData } from "../firebase_config/firestore-methods.config";

import { SpacesContext } from "./spaces.context";
import { UserContext } from "./user.context";

export const RecordsContext = createContext({
  records: [],
  setRecords: () => {},
});

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);
  //download the records initially
  useEffect(() => {
    const getRecordsMap = async () => {
      const recordsMap = await getRecordsData(uid, currentSpace.id);
      setRecords(recordsMap);
    };
    getRecordsMap();
  }, [uid, currentSpace.id]);

  const value = { records, setRecords };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
};
