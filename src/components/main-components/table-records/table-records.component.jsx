import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { RecordsContext } from "../../../contexts/records.context";
import { SpacesContext } from "../../../contexts/spaces.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteRecord,
  getRecordsData,
  updateRecord,
} from "../../../firebase_config/firestore-methods.config";
import Header from "../../helper-components/header/header.component";
import ModalUpdate from "../../helper-components/modal-update/modal-update.component";
import TableRow from "../../helper-components/table-row/table-row.component";

const TableRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});

  const { records, setRecords } = useContext(RecordsContext);

  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const handleClickDelete = async (id) => {
    await deleteRecord(id);
    //update documents after the one has been deleted
    const updatedRecords = await getRecordsData(uid, currentSpace.id);
    setRecords(updatedRecords);
    setIsDeleted(true);
  };

  const handleClickUpdate = async (clickedRecord) => {
    setIsModalOpen(true);
    setClickedRecord(clickedRecord);
  };

  const handleUpdate = async (updatedRecord) => {
    if (!clickedRecord) {
      return;
    }
    await updateRecord(updatedRecord.id, updatedRecord);
    const updatedRecords = await getRecordsData(uid, currentSpace.id);
    setRecords(updatedRecords);
    setClickedRecord(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getRecordsData(uid, currentSpace.id);
      setRecords(updatedRecords);
    };
    updateRec();
  }, [setRecords, uid, currentSpace.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the message component
      if (!event.target.closest(".text-sky-500")) {
        setIsDeleted(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="m-10 flex h-full flex-col justify-start text-center">
        {currentSpace && (
          <Header text={`current space: ${currentSpace.title}`} />
        )}
        {records.length === 0 ? (
          <p className="mt-12 text-2xl text-yellow-600">
            Sorry, no records yet.
          </p>
        ) : (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-md p-2 font-bold text-black">
                  {isSmallScreen ? "Cat" : "Category"}
                </th>
                <th className="text-md p-2 font-bold text-black">Item</th>
                <th className="text-md p-2 font-bold text-black">Cost</th>
                <th className="text-md p-2 font-bold text-black">Date</th>
                <th className="text-md p-2 font-bold text-blue-400">Edit</th>
                <th className="text-md p-2 font-bold text-blue-400">
                  {isSmallScreen ? "Del" : "Delete"}
                </th>
              </tr>
            </thead>
            <tbody>
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
        )}
        {isDeleted ? (
          <p className="mt-4 text-left text-lg text-red-500">
            Succesfully deleted.
          </p>
        ) : (
          ""
        )}
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

export default TableRecords;
