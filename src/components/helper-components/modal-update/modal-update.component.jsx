import { useState } from "react";

import Button from "../button/button.component";
import DropdownCategories from "../dropdown/dropdown.component";
import FormInput from "../form-input/form-input.component";

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
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-96 rounded-lg bg-white p-10 shadow-lg">
        <h2 className="mb-8 text-2xl font-bold text-blue-800">Edit Record</h2>
        <form onSubmit={handleSubmit}>
          <DropdownCategories
            label="Category"
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
          <FormInput
            label="Item"
            type="text"
            name="item"
            value={item}
            onChange={handleChange}
          />
          <FormInput
            label="Price"
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <FormInput
            label="Date"
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
          <Button>&#10004;</Button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
