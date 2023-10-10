import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteDocument,
  getDocuments,
  updateDocument,
} from "../../../firebase_config/firestore-records.config";
import TableRow from "../../helper-components/table-row/table-row.component";
import UpdateRow from "../../helper-components/update-row/update-row.component";

const ReadRecords = () => {
  //is the update button clicked?
  const [isClicked, setIsClicked] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});
  //retrieving downloaded data from the database
  const { records, setRecords } = useContext(RecordsContext);
  console.log("records", records);
  //user id
  const { uid } = useContext(UserContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  //delete document by id
  const handleClickDelete = async (id) => {
    await deleteDocument(id);
    //get documents for the current user
    const updatedRecords = await getDocuments(uid);
    //setRecords communicated with the context
    setRecords(updatedRecords);
  };

  //set clicked to true when the update button is clicked
  //retrieve document by id, pass to handleUpdate
  const handleClickUpdate = async (clickedRecord) => {
    setIsClicked(true);
    //pass the id of the clicked record, download the record
    setClickedRecord(clickedRecord);
    console.log("handleClickUpdate", clickedRecord);
  };

  //update document by id
  const handleUpdate = async (updatedRecord) => {
    if (!clickedRecord) {
      return;
    }
    await updateDocument(updatedRecord.id, updatedRecord);
    //get documents for the current user
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
    setIsClicked(false);
    setClickedRecord(null);
  };

  //useEffect runs every time the setRecordsMap or user id changes
  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getDocuments(uid);
      setRecords(updatedRecords);
    };
    updateRec();
    //new records fetched every time the user changes or the records are updated
  }, [setRecords, uid]);

  return (
    <>
      <div className="m-10 flex h-full flex-col justify-start text-center">
        <h1 className="mb-5 text-center text-2xl font-bold text-blue-700">
          Review records
        </h1>
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="px-4 py-2">
                {isSmallScreen ? "Cat" : "Category"}
              </th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price (€)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-2 py-2 text-gray-500">Edit</th>
              <th className="px-2 py-2 text-gray-500">
                {isSmallScreen ? "Del" : "Delete"}
              </th>
            </tr>
          </thead>
          <tbody>
            <></>
            {records.map((record) => (
              <TableRow
                key={record.id}
                record={record}
                handleClickUpdate={handleClickUpdate}
                handleClickDelete={handleClickDelete}
              />
            ))}
            {isClicked && (
              <>
                <UpdateRow
                  clickedRecord={clickedRecord}
                  handleUpdate={handleUpdate}
                />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReadRecords;
