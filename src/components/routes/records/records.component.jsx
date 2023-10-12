import AddRecords from "../../main-components/add-records/add-records.component";
import ReadRecords from "../../main-components/read-records/read-records.component";

const Records = () => {
  return (
    <>
      <div className="flex flex-col sm:mt-20 lg:flex-row lg:items-baseline">
        <AddRecords />
        <ReadRecords />
      </div>
    </>
  );
};

export default Records;
