import { useContext, useEffect, useState } from "react";

import { categoriesList } from "../../../categoriesList/categoriesList";
import { RecordsContext } from "../../../contexts/records.context";
import { SpacesContext } from "../../../contexts/spaces.context";
import { UserContext } from "../../../contexts/user.context";
import {
  addRecord,
  getRecordsData,
} from "../../../firebase_config/firestore-methods.config";
import ButtonBlue from "../../helper-components/button-blue/button-blue.component";
import DropdownCategories from "../../helper-components/dropdown/dropdown.component";
import FormInput from "../../helper-components/form-input/form-input.component";
import Header from "../../helper-components/header/header.component";

const defaultRecord = {
  category: "",
  date: "",
  item: "",
  price: "",
};

const AddRecords = () => {
  const [addedRecord, setAddedRecord] = useState(defaultRecord);
  const { setRecords } = useContext(RecordsContext);

  const { category, item, price, date } = addedRecord;
  const { uid } = useContext(UserContext);
  const { currentSpace } = useContext(SpacesContext);

  const [type, setType] = useState("text");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const resetRecord = () => {
    setAddedRecord(defaultRecord);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleRecordAddition = async (newRecord) => {
    await addRecord(newRecord);
    //update current documents after adding the new one
    const updatedRecords = await getRecordsData(uid, currentSpace.id);
    setRecords(updatedRecords);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addedRecord.category === "" ||
      addedRecord.item === "" ||
      addedRecord.price <= 0 ||
      addedRecord.date === "dd.mm.yyyy"
    ) {
      setMessage({ error: true, msg: "All fields are mandatory" });
    } else {
      try {
        const newRecord = {
          category: addedRecord.category,
          date: addedRecord.date,
          item: addedRecord.item,
          price: addedRecord.price,
          uid: uid,
          space: currentSpace.id,
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
  //handle click outside of the box to handle messages
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the message component
      if (!event.target.closest(".text-sky-500")) {
        setMessage({ error: false, msg: "" });
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="m-10 flex flex-col justify-start text-center font-lato">
      <Header text={"Add records"} />
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
          label="Category"
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
          label="Price (€)"
          name="price"
          value={price}
          placeholder="0"
          onChange={handleChange}
        />
        <FormInput
          required
          label="Date"
          name="date"
          value={date}
          placeholder="date"
          type={type}
          onFocus={() => setType("date")}
          onBlur={() => setType("text")}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <ButtonBlue type="submit">+</ButtonBlue>
        </div>
      </form>
    </div>
  );
};

export default AddRecords;
