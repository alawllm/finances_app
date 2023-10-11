import { useState } from "react";

const ModalUpdate = ({ clickedRecord, handleUpdate, closeModal }) => {
  const initialValue = {
    id: clickedRecord.id,
    category: clickedRecord.category,
    item: clickedRecord.item,
    price: clickedRecord.price,
    date: clickedRecord.date,
  };

  const [updatedRecord, setUpdatedRecord] = useState(initialValue);
  const { category, item, price, date } = updatedRecord;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUpdatedRecord((initialValue) => ({ ...initialValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(updatedRecord);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center rounded-md bg-white shadow-lg ">
      <h2 className="mb-4 text-2xl font-bold">Edit Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Item
          </label>
          <input
            type="text"
            name="item"
            value={item}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="submit"
          className="w-30 m-3 rounded-full 
          bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default ModalUpdate;
