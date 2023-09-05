import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return (
   currentUser ? <Outlet/> : <Navigate to="/"/>
  );
};

export default PrivateRoutes;
