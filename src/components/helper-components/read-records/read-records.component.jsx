import { useContext, useEffect } from "react";

import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import { deleteDocument } from "../../../firebase_config/firestore-records.config";
import { getDocuments } from "../../../firebase_config/firestore-records.config";
import ButtonDelete from "../button-delete/button-delete.component";

const ReadRecords = () => {
  //retrieving downloaded data from the database
  const { records, setRecords } = useContext(RecordsContext);
  const {uid} = useContext(UserContext);

  const handleClick = async(id) => {
    deleteDocument(id);
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
  };

  //useEffect runs every time the setRecordsMap changes
  useEffect(() => {
    const updateRec = async () => {
      const updatedRecords = await getDocuments(uid);
      setRecords(updatedRecords);
    };
    updateRec();
  }, [setRecords, uid]);

  return (
    <>
      <table className="table-auto mb-20">
        <thead>
          <tr>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price (€)</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* //Object.keys makes an array out of the object  */}
          <></>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2 bg-blue-100">
                {record.category}
              </td>
              <td className="border px-4 py-2  bg-blue-50">{record.item}</td>
              <td className="border px-4 py-2 bg-blue-50">{record.price} €</td>
              <td className="border px-4 py-2 bg-blue-50">
                <ButtonDelete onClick={() => handleClick(record.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReadRecords;