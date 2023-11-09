import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import TableHeader from "../../helper-components/table-header/table-header.component";
import TableRow from "../../helper-components/table-row/table-row.component";

const Table = ({ records, handleClickUpdate, handleDeleteAndUpdate }) => {
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortRecords = (records, criteria, order) => {
    //determine sort order based on the provided order
    const sortOrder = order === "desc" ? -1 : 1;

    //copy of the array in order to mot modify the original one
    return [...records].sort((a, b) => {
      let aValue;
      let bValue;
      //extracting the values in order to be able to compare them
      if (criteria === "price") {
        //converting to number in case of the price
        aValue = Number(a[criteria]);
        bValue = Number(b[criteria]);
      } else {
        aValue = a[criteria];
        bValue = b[criteria];
      }
      //sorting comparison logic
      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });
  };

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      // If clicking on the same criteria, toggle the order
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // If clicking on a different criteria, set the new criteria
      setSortCriteria(criteria);
      setSortOrder("");
    }
  };

  const sortedRecords = sortRecords(records, sortCriteria, sortOrder);
  const summary = calculateTotalPrice(sortedRecords);

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
          <tr className="">
            <TableHeader
              text={"Category"}
              textColor="text-black"
              isSortable={true}
              onClick={handleSort}
            />
            <TableHeader
              text="Item"
              textColor="text-gray-800"
              isSortable={true}
              onClick={handleSort}
            />
            <TableHeader
              text="Price"
              textColor="text-gray-800"
              isSortable={true}
              onClick={handleSort}
            />
            <TableHeader
              text="Date"
              textColor="text-gray-800"
              isSortable={true}
              onClick={handleSort}
            />
            <TableHeader
              text="Edit"
              textColor="text-blue-700"
              isSortable={false}
            />
            <TableHeader
              text={isSmallScreen ? "Del" : "Delete"}
              textColor="text-blue-700"
              isSortable={false}
            />
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((record) => (
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
