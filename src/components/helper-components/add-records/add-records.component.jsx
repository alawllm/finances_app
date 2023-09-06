import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  addRecord,
  getRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} from "../../../firebase_config/firestore-records.config";

const defaultRecord = {
  name: "",
  price: 0,
};
const AddRecords = () => {
  const [record, setRecord] = useState(defaultRecord);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { name, price } = record;

  const resetRecord = () => {
    setRecord(defaultRecord);
  };

  const handleChange = (event) => {
    //target gives the input
    const { name, value } = event.target;

    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (record.name === "" || record.price === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
    }
    try {
      //adding record to firestore
      await addRecord(record);
      setMessage({ error: false, msg: "new record added succesfully" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setIsSubmitted(true);
    resetRecord();
  };

  return (
    <div>
      <h1>Here you can add your records</h1>
      <form
        className="flex flex-col items-center rounded px-8"
        action=""
        onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
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
        {isSubmitted && (
          <>
            <span>price: {price}</span>
            <span>name:{name}</span>
          </>
        )}
      </form>
    </div>
  );
};

export default AddRecords;
