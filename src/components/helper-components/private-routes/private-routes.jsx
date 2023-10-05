import { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";

const PrivateRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return (
   currentUser ? <Outlet/> : <Navigate to="/"/>
  );
};

export default PrivateRoutes;
