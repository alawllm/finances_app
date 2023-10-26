import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../firebase_config/firebase-auth.config";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const navigateTo = useNavigate();

  const signOut = async () => {
    await signOutUser();
    navigateTo("/");
  };
  return (
    <>
      <div className="bg-blue-30 flex flex-col font-lato  text-lg">
        <div className="fixed top-0 w-full bg-blue-100 py-3">
          <Link className="px-5" to="/">
            💸
          </Link>
          {currentUser ? (
            <>
              <Link className="px-5 text-gray-700" to="/spaces">
                Spaces
              </Link>
              <Link className="px-5 text-gray-700" to="/records">
                All Records
              </Link>
            </>
          ) : (
            ""
          )}
          {currentUser && (
            <span onClick={signOut} className="cursor-pointer text-gray-700">
              Sign out
            </span>
          )}
        </div>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navigation;
