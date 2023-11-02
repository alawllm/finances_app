import AddRecords from "../../main-components/add-records/add-records.component";
import TableRecords from "../../main-components/table-space/table-space.component";

const SpacesRecords = () => {
  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row lg:items-baseline">
        <AddRecords />
        <TableRecords />
      </div>
    </>
  );
};

export default SpacesRecords;
