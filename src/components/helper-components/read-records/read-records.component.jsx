import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/records.context";
import { Fragment } from "react";

const ReadRecords = () => {
  //retrieving downloaded data from the database
  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {/* <table className="table-auto mb-20">
        <thead>
          <tr>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price (€)</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody> */}
          {/* //Object.keys makes an array out of the object  */}
           {/* {Object.keys(categoriesMap).map((title) => (
            <Fragment key={title}>
              {categoriesMap[title].map((record) => (
                <tr key={record.id}>
                  <td className="border px-4 py-2 bg-blue-100">{title}</td>
                  <td className="border px-4 py-2  bg-blue-50">
                    {record.item}
                  </td>
                  <td className="border px-4 py-2 bg-blue-50">
                    {record.price} €
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default ReadRecords;
