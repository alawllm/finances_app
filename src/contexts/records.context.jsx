import { createContext, useContext, useEffect, useState } from "react";

import {
  getAllRecordsData,
  getRecordsDataInSpace,
} from "../firebase_config/firestore-methods.config";

import { SpacesContext } from "./spaces.context";
import { UserContext } from "./user.context";

export const RecordsContext = createContext({
  records: [],
  setRecords: () => {},
});

export const RecordsProvider = ({ children }) => {
  const [recordsInSpace, setRecordsInSpace] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);

  //download the records for specific space and all records initially
  useEffect(() => {
    const getRecordsInSpaceMap = async () => {
      const recordsMap = await getRecordsDataInSpace(uid, currentSpace.id);
      setRecordsInSpace(recordsMap);
    };
    const getAllRecordsMap = async () => {
      const recordsMap = await getAllRecordsData(uid, currentSpace.id);
      setAllRecords(recordsMap);
    };
    getAllRecordsMap();
    getRecordsInSpaceMap();
  }, [uid, currentSpace.id]);

  const value = {
    recordsInSpace,
    setRecordsInSpace,
    allRecords,
    setAllRecords,
  };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
};
