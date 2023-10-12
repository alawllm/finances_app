import { useState } from "react";
import { useContext } from "react";

import { categoriesList } from "../../../categoriesList/categoriesList";
import { RecordsContext } from "../../../contexts/records.context";
import { UserContext } from "../../../contexts/user.context";
import { addRecord } from "../../../firebase_config/firestore-records.config";
import { getDocuments } from "../../../firebase_config/firestore-records.config";
import Button from "../../helper-components/button/button.component";
import DropdownCategories from "../../helper-components/dropdown/dropdown.component";
import FormInput from "../../helper-components/form-input/form-input.component";

const defaultRecord = {
  category: "clothes",
  date: "",
  item: "",
  price: "",
};
const AddRecords = () => {
  const [record, setRecord] = useState(defaultRecord);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { category, item, price, date } = record;
  const { uid } = useContext(UserContext);

  const { setRecords } = useContext(RecordsContext);

  const resetRecord = () => {
    setRecord(defaultRecord);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRecord({ ...record, [name]: value });
  };

  const handleRecordAddition = async (newRecord) => {
    await addRecord(newRecord);
    const updatedRecords = await getDocuments(uid);
    setRecords(updatedRecords);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      record.item === "" ||
      record.price <= 0 ||
      record.date === "dd.mm.yyyy"
    ) {
      setMessage({ error: true, msg: "All fields are mandatory" });
    } else {
      try {
        const newRecord = {
          category: record.category,
          date: record.date.slice(2),
          item: record.item,
          price: record.price,
          uid: uid,
        };
        await handleRecordAddition(newRecord);
        setMessage({ error: false, msg: "Added succesfully" });
      } catch (err) {
        setMessage({ error: true, msg: "an error occured" });
        console.log(err);
      }
    }
    resetRecord();
  };

  return (
    <div className="m-10 flex flex-col justify-start text-center">
      <h1 className="mb-4 text-center text-2xl font-bold text-blue-800">
        Add records
      </h1>
      {message && (
        <>
          <span className="text-center text-sky-500">{message.msg}</span>
        </>
      )}
      <form
        className="flex flex-col items-center rounded px-8"
        onSubmit={handleSubmit}
      >
        <DropdownCategories
          required
          name="category"
          label="category"
          value={category}
          categoriesList={categoriesList}
          onChange={handleChange}
        />
        <FormInput
          required
          type="text"
          label="Item"
          name="item"
          value={item}
          placeholder="item"
          onChange={handleChange}
        />
        <FormInput
          required
          type="number"
          label="Price"
          name="price"
          value={price}
          placeholder="0"
          onChange={handleChange}
        />
        <FormInput
          required
          type="date"
          label="Date"
          name="date"
          value={date}
          placeholder="dd.mm.yyyy"
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <Button type="submit">+</Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecords;
