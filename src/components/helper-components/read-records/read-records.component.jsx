import { useContext, useEffect, useState } from "react";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteDocument,
  getDocuments,
  updateDocument,
} from "../../../firebase_config/firestore-records.config";
import TableRow from "../table-row/table-row.component";
import UpdateRow from "../update-row/update-row.component";


const ReadRecords = () => {
  //is the update button clicked?
  const [isClicked, setIsClicked] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});
  //retrieving downloaded data from the database
  const { records, setRecords } = useContext(RecordsContext);
  console.log("records", records);
  //user id
  const { uid } = useContext(UserContext);

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
  const handleUpdate = async (clickedRecord) => {
    if (!clickedRecord) {
      return;
    }
    await updateDocument(clickedRecord.id, clickedRecord);
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
      <div className="flex flex-col justify-start text-center h-full m-10">
        <h1 className="text-center font-bold text-2xl text-blue-700 mb-5">
          Review records
        </h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price (€)</th>
              <th className="px-4 py-2">Purchased</th>
              <th className="px-4 py-2 text-gray-500">Update</th>
              <th className="px-4 py-2 text-gray-500">Delete</th>
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
                <UpdateRow clickedRecord={clickedRecord} handleUpdate={handleUpdate} />
              </>
            )}
          </tbody>
        </table>
        
      </div>
     
    </>
  );
};

export default ReadRecords;
