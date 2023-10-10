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
    <tr key={id} className="m-0">
      <td className="border m-0 p-0">
        <input
          className=" bg-green-200 text-center m-0 w-max-sm p-0"
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
      </td>
      <td className="border m-0 p-0">
        <input
          className="border  bg-green-100 text-center m-0 p-0"
          type="text"
          name="item"
          value={item}
          onChange={handleChange}
        />
      </td>
      <td className="border m-0 p-0">
        <input
          className="border  bg-green-100 text-center m-0 p-0"
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </td>
      <td className="border m-0 p-0">
        <input
          className="border  bg-green-100 text-center m-0 p-0"
          type="text"
          name="date"
          value={date}
          onChange={handleChange}
        />
      </td>
      <td className="text-center">
        <button
          className=" bg-blue-500 text-white hover:bg-blue-200 border-solid
         border-2  rounded-full w-8 h-8 text-center"
          onClick={() => handleUpdate(updatedRecord)}>
          +
        </button>
      </td>
    </tr>
  );
};

export default UpdateRow;
