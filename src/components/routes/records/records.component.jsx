import AddRecords from "../../main-components/add-records/add-records.component";
import ReadRecords from "../../main-components/read-records/read-records.component";

const Records = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row ">
        <AddRecords />
        <ReadRecords />
      </div>
    </>
  );
};

export default Records;
