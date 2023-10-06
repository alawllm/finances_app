import AddRecords from "../../helper-components/add-records/add-records.component";
import ReadRecords from "../../helper-components/read-records/read-records.component";

const Records = () => {
    return(
        <>
        <div className="flex flex-col sm:flex-row ">
        <AddRecords/>
        <ReadRecords/>
        </div>
        </>
    )
}

export default Records;