import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SpacesContext } from "../../../contexts/spaces.context";
import { UserContext } from "../../../contexts/user.context";
import {
  addSpace,
  getSpacesData,
} from "../../../firebase_config/firestore-methods.config";
import { deleteSpace } from "../../../firebase_config/firestore-methods.config";
import ButtonBlue from "../../helper-components/button-blue/button-blue.component";
import ButtonWhite from "../../helper-components/button-white/button-white.component";
import FormInput from "../../helper-components/form-input/form-input.component";
import Header from "../../helper-components/header/header.component";

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

  const handleClickDelete = async (id) => {
    await deleteSpace(id);
    //update documents after the one has been deleted
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
      <div className="max-h-full">
        {/* use method to retrieve all collections  */}
        <Header text="Your spaces" />
        <div className="flex flex-col md:flex-row">
          {spaces.map((space) => (
            <>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => {
                    onClick(space.id, space.title);
                  }}
                  className="m-8 flex h-24 w-24 cursor-pointer items-center justify-center rounded-md bg-amber-200 text-center text-xl text-amber-900 hover:bg-amber-300"
                  key={space.id}
                >
                  {space.title}
                </div>
                <ButtonWhite
                  hoverBg="hover:bg-red-200"
                  hoverBorder="hover:border-red-700"
                  width="w-16"
                  onClick={() => handleClickDelete(space.id)}
                >
                  delete
                </ButtonWhite>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mt-12">
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
          <ButtonBlue type="submit">+</ButtonBlue>
        </form>
      </div>
    </>
  );
};

export default Spaces;
