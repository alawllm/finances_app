import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
//collection -> uid of the user that created the collection
//collection -> title of the collection
//items -> id of the collection they are in
const Collections = () => {
  const { uid } = useContext(UserContext);
  console.log(uid);
  const handleAddCollection = () => {};
  return (
    <>
      <div>Here you can see and edit your collections</div>
      <p onClick={handleAddCollection}>Add collection</p>
      <Link
        className="text-bold px-5 text-blue-600 hover:text-blue-500"
        to="/records"
      >
        All Records
      </Link>
    </>
  );
};

export default Collections;
