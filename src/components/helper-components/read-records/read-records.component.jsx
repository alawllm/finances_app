import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import { Fragment } from "react";

const ReadRecords = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      <table className="table-auto m-5">
        <thead>
          <tr>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price (€)</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Object.keys gives an array from the object  */}
          {Object.keys(categoriesMap).map((title) => (
            <Fragment key={title}>
              {categoriesMap[title].map((record) => (
                <tr key={record.id}>
                  <td className="border px-4 py-2 bg-blue-100">{title}</td>
                  <td className="border px-4 py-2  bg-blue-50">
                    {record.name}
                  </td>
                  <td className="border px-4 py-2 bg-blue-50">
                    {record.price} €
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReadRecords;
