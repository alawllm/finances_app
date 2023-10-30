import { useState } from "react";

import { categoriesList } from "../../../categoriesList/categoriesList";
import ButtonBlue from "../button-blue/button-blue.component";
import DropdownCategories from "../dropdown-categories/dropdown-categories.component";
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

    setUpdatedRecord((initialValue) => ({
      ...initialValue,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(updatedRecord);
    closeModal();
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "background" && e.target.id !== "modal") {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-60 backdrop-blur-sm"
      onClick={handleClickOutside}
      id="background"
    >
      <div className="w-96 rounded-lg bg-white p-10 shadow-lg" id="modal">
        <h1>System sanity check</h1>
        <h2 className="mb-8 text-2xl font-bold text-blue-800">Edit Record</h2>
        <form onSubmit={handleSubmit}>
          <DropdownCategories
            label="Category"
            name="category"
            value={category}
            onChange={handleChange}
            categoriesList={categoriesList}
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
          <ButtonBlue>&#10004;</ButtonBlue>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
