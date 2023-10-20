import AddRecords from "../../main-components/add-records/add-records.component";
import ReadRecords from "../../main-components/read-records/read-records.component";

const Records = () => {
  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row lg:items-baseline">
        <AddRecords />
        <ReadRecords />
      </div>
    </>
  );
};

export default Records;
