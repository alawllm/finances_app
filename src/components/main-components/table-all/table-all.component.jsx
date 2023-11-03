import { useContext, useEffect, useState } from "react";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import {
  deleteRecord,
  getAllRecordsData,
  updateRecord,
} from "../../../firebase_config/firestore-methods.config";
import ModalUpdate from "../../helper-components/modal-update/modal-update.component";
import Table from "../../helper-components/table/table.component";

const TableAllRecords = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickedRecord, setClickedRecord] = useState({});

  //informations out of the context
  const { allRecords, setAllRecords } = useContext(RecordsContext);
  const { uid } = useContext(UserContext);

  const calculateTotalPrice = (records) => {
    const totalPrice = records.reduce(
      (sum, item) => sum + Number(item.price),
      0,
    );
    const numItems = records.length;
    console.log(numItems);
    const summary = {
      totalPrice: totalPrice,
      numItems: numItems,
    };
    return summary;
  };
  const summary = calculateTotalPrice(allRecords);

  const getUpdatedAndSetState = async (uid) => {
    const updatedRecords = await getAllRecordsData(uid);
    setAllRecords(updatedRecords);
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
    await getUpdatedAndSetState(uid);
    setIsDeleted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getAllRecordsData(uid);
      setAllRecords(updatedRecords);
    };
    updateRec();
    console.log("set all records");
  }, [setAllRecords, uid]);

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
        <Table
          records={allRecords}
          summary={summary}
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
              isModalOpen={isModalOpen}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TableAllRecords;
