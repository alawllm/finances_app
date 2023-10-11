import { useState } from "react";

const UpdateRow = ({ clickedRecord, handleUpdate }) => {
  const initialValue = {
    id: clickedRecord.id,
    category: clickedRecord.category,
    item: clickedRecord.item,
    price: clickedRecord.price,
    date: clickedRecord.date,
  };
  const [updatedRecord, setUpdatedRecord] = useState(initialValue);
  const { id, category, item, price, date } = updatedRecord;

  const handleChange = (event) => {
    //target gives the input
    const { name, value } = event.target;

    setUpdatedRecord((initialValue) => ({ ...initialValue, [name]: value }));
  };
  return (
    <table className="mt-10 table-fixed">
      <thead>
        <tr>
          <th className="w-20 px-2 py-2">Cat</th>
          <th className="w-20 px-2 py-2">Item</th>
          <th className="w-20 px-2 py-2">Price (€)</th>
          <th className="w-20 px-2 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr key={id} className="box-content">
          <td className="m-0 w-min border p-0">
            <input
              className="m-0 w-min bg-green-200 p-0 text-center"
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
            />
          </td>
          <td className="m-0 w-min border p-0">
            <input
              className="m-0 w-min bg-green-100 p-0 text-center"
              type="text"
              name="item"
              value={item}
              onChange={handleChange}
            />
          </td>
          <td className="m-0 w-min border p-0">
            <input
              className="m-0 w-min bg-green-100 p-0 text-center"
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </td>
          <td className="m-0 w-min border p-0">
            <input
              className="m-0 w-min bg-green-100 p-0 text-center"
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </td>
          <td className="text-center">
            <button
              className="h-8 w-8 rounded-full
         border-2  border-solid bg-blue-500 text-center text-white  hover:bg-blue-200"
              onClick={() => handleUpdate(updatedRecord)}
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UpdateRow;
