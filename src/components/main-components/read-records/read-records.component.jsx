import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteDocument,
  getDocuments,
  updateDocument,
} from "../../../firebase_config/firestore-records.config";
import ModalUpdate from "../../helper-components/modal-update/modal-update.component";
import TableRow from "../../helper-components/table-row/table-row.component";

const ReadRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});

  const { records, setRecords } = useContext(RecordsContext);
  console.log("records", records);

  const { uid } = useContext(UserContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const handleClickDelete = async (id) => {
    await deleteDocument(id);
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
  };

  const handleClickUpdate = async (clickedRecord) => {
    setIsModalOpen(true);
    setClickedRecord(clickedRecord);
    console.log("update click, open modal");
  };

  const handleUpdate = async (updatedRecord) => {
    if (!clickedRecord) {
      return;
    }
    await updateDocument(updatedRecord.id, updatedRecord);
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
    setClickedRecord(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("close modal");
  };

  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getDocuments(uid);
      setRecords(updatedRecords);
    };
    updateRec();
  }, [setRecords, uid]);

  return (
    <>
      <div className="m-10 flex h-full flex-col justify-start text-center">
        <h1 className="mb-5 text-center text-2xl font-bold text-blue-700">
          Review records
        </h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-md p-2 font-bold text-black">
                {isSmallScreen ? "Cat" : "Category"}
              </th>
              <th className="text-md p-2 font-bold text-black">Item</th>
              <th className="text-md p-2 font-bold text-black">Price (€)</th>
              <th className="text-md p-2 font-bold text-black">Date</th>
              <th className="text-md p-2 font-bold text-gray-600">Edit</th>
              <th className="text-md p-2 font-bold text-gray-600">
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
          </tbody>
        </table>
        {isModalOpen && (
          <>
            <ModalUpdate
              clickedRecord={clickedRecord}
              handleUpdate={handleUpdate}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ReadRecords;
