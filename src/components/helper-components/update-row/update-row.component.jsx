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
    <tr key={id} className="">
      <td className="border">
        <input
          className=" w-30bg-green-200 text-center"
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
      </td>
      <td className="m-0 border p-0">
        <input
          className="w-30 border bg-green-100 text-center"
          type="text"
          name="item"
          value={item}
          onChange={handleChange}
        />
      </td>
      <td className="border ">
        <input
          className="w-30 border bg-green-100 text-center"
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </td>
      <td className="border">
        <input
          className="w-30 border bg-green-100 text-center"
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
      </td>
      <td className="text-center">
        <button
          className=" w-30 h-8 w-8 rounded-full
         border-2  border-solid bg-blue-500 text-center text-white  hover:bg-blue-200"
          onClick={() => handleUpdate(updatedRecord)}
        >
          +
        </button>
      </td>
    </tr>
  );
};

export default UpdateRow;
