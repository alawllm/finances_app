import { useContext } from "react";

import { SpacesContext } from "../../../contexts/spaces.context";
import AddRecords from "../../main-components/add-records/add-records.component";
import ReadRecords from "../../main-components/all-records/all-records.component";
const Records = () => {
  const { currentSpace } = useContext(SpacesContext);
  return (
    <>
      {currentSpace.title && (
        <p className="text-left text-2xl text-gray-400">
          current space:
          <span className="text-blue-600"> {currentSpace.title}</span>
        </p>
      )}
      <div className="mt-10 flex flex-col lg:flex-row lg:items-baseline">
        <AddRecords />
        <ReadRecords />
      </div>
    </>
  );
};

export default Records;
