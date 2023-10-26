import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { CollectionsContext } from "../../../contexts/collections.context";
import { UserContext } from "../../../contexts/user.context";
import { addCollection } from "../../../firebase_config/firestore-methods.config";
import Button from "../../helper-components/button/button.component";
import FormInput from "../../helper-components/form-input/form-input.component";
//collection -> uid, title of the collection
//items -> id of the collection they are in
//this component - create new collection, delete existing collection
//retrieve the id of the current collection

const Collections = () => {
  const [newCollectionName, setNewCollectionName] = useState("");
  //user id - should be stored on the collection
  const { collections } = useContext(CollectionsContext);
  const { uid } = useContext(UserContext);
  console.log(uid);

  const handleChange = (event) => {
    const { value } = event.target;

    setNewCollectionName(value);
  };

  const handleAddCollection = async (event) => {
    event.preventDefault();
    try {
      const newCollectionData = {
        title: newCollectionName,
        uid: uid,
      };
      await addCollection(newCollectionData);
    } catch {
      console.log("error adding collection");
    }
    setNewCollectionName("");
  };

  return (
    <>
      <div className="mb-4 text-gray-800">Your collections</div>
      <div className="m-4">
        <form
          onSubmit={handleAddCollection}
          className="mb-4 flex flex-col items-center rounded px-8"
        >
          <FormInput
            required
            type="text"
            name="newCollectionName"
            label="Collection name"
            value={newCollectionName}
            placeholder="new collection name"
            onChange={handleChange}
          />
          <Button type="submit">Add collection</Button>
        </form>
      </div>
      <div className="m-8">
        {/* use method to retrieve all collections  */}
        <p className="mb-4">Your collections</p>
        {collections.map((collection) => (
          <div className="bg-red-200" key={collection.id}>
            {collection.name}
          </div>
        ))}
      </div>
      <Link
        className="text-bold px-5 text-blue-600 hover:text-blue-500"
        to="/records"
      >
        Go to all records
      </Link>
    </>
  );
};

export default Collections;
