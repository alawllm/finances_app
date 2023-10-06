import { useContext, useEffect } from "react";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import { deleteDocument } from "../../../firebase_config/firestore-records.config";
import { getDocuments } from "../../../firebase_config/firestore-records.config";
import { updateDocument } from "../../../firebase_config/firestore-records.config";
import TableRow from "../table-row/table-row.component";

const ReadRecords = () => {
  //retrieving downloaded data from the database
  const { records, setRecords } = useContext(RecordsContext);
  const { uid } = useContext(UserContext);

  //delete document by id
  const handleClickDelete = async (id) => {
    await deleteDocument(id);
    //get documents for the current user
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
  };

  //update document by id
  const handleClickUpdate = async (id, updatedDocument) => {
    await updateDocument(id, updatedDocument);
    //get documents for the current user
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
  };

  //useEffect runs every time the setRecordsMap or user id changes
  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getDocuments(uid);
      setRecords(updatedRecords);
    };
    updateRec();
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
              <th className="px-4 py-2">Delete</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {/* //Object.keys makes an array out of the object  */}
            <></>
            {records.map((record) => (
              <TableRow
                key={record.id}
                record={record}
                onDelete={handleClickDelete}
                onUpdate={handleClickUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReadRecords;
