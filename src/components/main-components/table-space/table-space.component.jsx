import { useContext, useEffect, useState } from "react";

import { RecordsContext } from "../../../contexts/records.context";
import { SpacesContext } from "../../../contexts/spaces.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteRecord,
  getRecordsDataInSpace,
  updateRecord,
} from "../../../firebase_config/firestore-methods.config";
import Header from "../../helper-components/header/header.component";
import ModalUpdate from "../../helper-components/modal-update/modal-update.component";
import Table from "../../helper-components/table/table.component";

const TableRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});

  //informations out of the context
  const { recordsInSpace, setRecordsInSpace } = useContext(RecordsContext);
  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);

  const getUpdatedAndSetState = async (uid, spaceId) => {
    const updatedRecords = await getRecordsDataInSpace(uid, spaceId);
    setRecordsInSpace(updatedRecords);
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
    await getUpdatedAndSetState(uid, currentSpace.id);
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
      const updatedRecords = await getRecordsDataInSpace(uid, currentSpace.id);
      setRecordsInSpace(updatedRecords);
    };
    updateRec();
  }, [setRecordsInSpace, uid, currentSpace.id]);

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
        <Table
          records={recordsInSpace}
          handleClickUpdate={handleClickUpdate}
          handleDeleteAndUpdate={handleDeleteAndUpdate}
        />
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
            />
          </>
        )}
      </div>
    </>
  );
};

export default TableRecords;
