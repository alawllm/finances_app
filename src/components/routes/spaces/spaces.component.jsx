import { useContext, useState } from "react";
import { Link } from "react-router-dom";
//collection -> uid, title of the collection
//items -> id of the collection they are in
//this component - create new collection, delete existing collection
//retrieve the id of the current collection
import { useNavigate } from "react-router-dom";

import { SpacesContext } from "../../../contexts/spaces.context";
import { UserContext } from "../../../contexts/user.context";
import {
  addSpace,
  getSpacesData,
} from "../../../firebase_config/firestore-methods.config";
import Button from "../../helper-components/button/button.component";
import FormInput from "../../helper-components/form-input/form-input.component";

const Spaces = () => {
  const [newSpaceName, setNewSpaceName] = useState("");
  //user id - should be stored on the collection
  const { spaces, setSpaces, setCurrentSpace } = useContext(SpacesContext);
  const { uid } = useContext(UserContext);

  const navigateTo = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;

    setNewSpaceName(value);
  };

  const handleSpaceAddition = async (newSpaceData) => {
    await addSpace(newSpaceData);
    const updatedSpaces = await getSpacesData(uid);
    setSpaces(updatedSpaces);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSpaceData = {
        title: newSpaceName,
        uid: uid,
      };
      await handleSpaceAddition(newSpaceData);
    } catch {
      console.log("error adding collection");
    }
    setNewSpaceName("");
  };

  //onClick - redirect to the spaces page
  //retrieving data for the current space and user
  const onClick = (id, title) => {
    const currentSpaceData = {
      title: title,
      id: id,
    };
    setCurrentSpace(currentSpaceData);
    navigateTo("/records");
  };

  return (
    <>
      <div className="mb-4 text-center text-gray-800">Your spaces</div>
      <div className="m-8">
        {/* use method to retrieve all collections  */}
        <p className="mb-4 text-center">Your spaces</p>
        <div className="flex flex-row">
          {spaces.map((space) => (
            <div
              onClick={() => {
                onClick(space.id, space.title);
              }}
              className="m-4 flex h-24 w-24 items-center justify-center rounded-md bg-amber-200 text-center hover:bg-amber-300"
              key={space.id}
            >
              {space.title}
            </div>
          ))}
        </div>
      </div>
      <div className="m-4">
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col items-center rounded px-8"
        >
          <FormInput
            required
            type="text"
            name="newSpaceName"
            label="Add new space"
            value={newSpaceName}
            placeholder="new space name"
            onChange={handleChange}
          />
          <Button type="submit">+</Button>
        </form>
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

export default Spaces;
