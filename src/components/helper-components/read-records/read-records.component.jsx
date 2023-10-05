import { useContext } from "react";

import { RecordsContext } from "../../../contexts/records.context";

const ReadRecords = () => {
  //retrieving downloaded data from the database
  const {recordsMap } = useContext(RecordsContext);
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
         {recordsMap.map((record) => (
                <tr key={record.id}>
                  <td className="border px-4 py-2 bg-blue-100">{record.category}</td>
                  <td className="border px-4 py-2  bg-blue-50">
                    {record.item}
                  </td>
                  <td className="border px-4 py-2 bg-blue-50">
                    {record.price} €
                  </td>
                </tr>
         )
          )}
        </tbody>
      </table>
    </>
  );
};

export default ReadRecords;

{/* <tbody> 
{/* //Object.keys makes an array out of the object  */}
// {Object.keys(recordsMap).map((item) => (
//   <Fragment key={item}>
//     {recordsMap[item].map((record) => (
//       <tr key={record.id}>
//         <td className="border px-4 py-2 bg-blue-100">{item}</td>
//         <td className="border px-4 py-2  bg-blue-50">
//           {record.item}
//         </td>
//         <td className="border px-4 py-2 bg-blue-50">
//           {record.price} €
//         </td>
//       </tr>
//     ))}
//   </Fragment>
// ))}
// </tbody> */}