import AddRecords from "../../main-components/add-records/add-records.component";
import TableRecords from "../../main-components/table-records/table-records.component";
const Records = () => {
  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row lg:items-baseline">
        <AddRecords />
        <TableRecords />
      </div>
    </>
  );
};

export default Records;
