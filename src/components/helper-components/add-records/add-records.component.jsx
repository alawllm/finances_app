import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { addRecord } from "../../../firebase_config/firestore-records.config";
import DropdownCategories from "../dropdown/dropdown.component";

const defaultRecord = {
  item: "",
  price: 0,
};

const defaultCategory = "";

const categoriesList = ["clothes", "food", "education", "household", "travel"];

const AddRecords = () => {
  const [record, setRecord] = useState(defaultRecord);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { item, price } = record;

  const resetRecord = () => {
    setRecord(defaultRecord);
    setCategory(defaultCategory);
  };

  const handleChange = (event) => {
    //target gives the input
    const { name, value } = event.target;

    setRecord({ ...record, [name]: value });
  };

  const handleChangeCategory = (event) => {
    const {category} = event.target
    setCategory(category);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (record.item === "" || record.price <= 0) {
      setMessage({ error: true, msg: "All fields are mandatory" });
    } else {
      try {
        const newRecord = {
          id: 7,
          item: record.item,
          price: record.price,
        };
        //updating entry in the firestore
        //takes id and updated record
        await addRecord(category, newRecord);
        setMessage({ error: false, msg: "New record added succesfully" });
      } catch (err) {
        setMessage({ error: true, msg: "an error occured" });
        console.log(err);
      }
    }
    resetRecord();
  };

  return (
    <div className="m-10">
      <h1 className="m-5">Here you can add your records</h1>
      {message && (
        <>
          <span className="text-sky-500 text-center">{message.msg}</span>
        </>
      )}
      <form
        className="flex flex-col items-center rounded px-8"
        onSubmit={handleSubmit}>
        <DropdownCategories
          label="category"
          categoryOptions={categoriesList}
          value={category}
          name="category"
          onChange={handleChangeCategory}
          required
        />

        <FormInput
          label="item"
          type="text"
          required
          onChange={handleChange}
          name="item"
          value={item}
        />
        <FormInput
          label="price"
          type="number"
          required
          onChange={handleChange}
          name="price"
          value={price}
        />
        <div className="flex flex-col">
          <Button type="submit">Add record</Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecords;
