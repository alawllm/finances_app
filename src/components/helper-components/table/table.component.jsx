import { useMediaQuery } from "react-responsive";

import TableHeader from "../table-header/table-header.component";
import TableRow from "../table-row/table-row.component";

const Table = ({ records, handleClickUpdate, handleDeleteAndUpdate }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const calculateTotalPrice = (records) => {
    const totalPrice = records.reduce(
      (sum, item) => sum + Number(item.price),
      0,
    );
    const numItems = records.length;
    console.log(numItems);
    const summary = {
      totalPrice: totalPrice,
      numItems: numItems,
    };
    return summary;
  };
  const summary = calculateTotalPrice(records);

  return records.length === 0 ? (
    <p className="mt-12 text-2xl text-yellow-600">Sorry, no records yet.</p>
  ) : (
    <>
      <p className="mb-4 text-center text-xl text-green-700">
        spent {summary.totalPrice} € on {summary.numItems} items
      </p>
      {/* here input for filtering  */}
      <table className="table-auto">
        <thead>
          <tr>
            <TableHeader
              text={isSmallScreen ? "Cat" : "Category"}
              textColor="text-black"
            />
            <TableHeader text="Item" textColor="text-gray-800" />
            <TableHeader text="Price" textColor="text-gray-800" />
            <TableHeader text="Date" textColor="text-gray-800" />
            <TableHeader text="Edit" textColor="text-blue-700" />
            <TableHeader
              text={isSmallScreen ? "Del" : "Delete"}
              textColor="text-blue-700"
            />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              record={record}
              handleClickUpdate={handleClickUpdate}
              handleDeleteAndUpdate={handleDeleteAndUpdate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
