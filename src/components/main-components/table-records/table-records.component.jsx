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
import TableHeader from "../../helper-components/table-header/table-header.component";
import TableRow from "../../helper-components/table-row/table-row.component";

const TableRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});

  const { records, setRecords } = useContext(RecordsContext);

  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const getUpdatedAndSetState = async (uid, spaceId) => {
    const updatedRecords = await getRecordsData(uid, spaceId);
    setRecords(updatedRecords);
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
    setClickedRecord(null);
  };

  const handleDeleteAndUpdate = async (id) => {
    await deleteRecord(id);
    await getUpdatedAndSetState(uid, currentSpace.id);
    setIsDeleted(true);
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

  //handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
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
          <>
            {/* here input for filtering  */}
            <table className="table-auto">
              <thead>
                <tr>
                  <TableHeader
                    text={isSmallScreen ? "Cat" : "Category"}
                    textColor="text-black"
                  />
                  <TableHeader text="Item" textColor="text-black" />
                  <TableHeader text="Price" textColor="text-black" />
                  <TableHeader text="Date" textColor="text-black" />
                  <TableHeader text="Edit" textColor="text-blue-700" />
                  <TableHeader
                    text={isSmallScreen ? "Del" : "Delete"}
                    textColor="text-blue-700"
                  />
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <TableRow
                    key={record.id}
                    record={record}
                    handleClickUpdate={handleClickUpdate}
                    handleDeleteAndUpdate={handleDeleteAndUpdate}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}
        {isDeleted ? (
          <p className="mt-4 text-left text-base text-red-500">
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
