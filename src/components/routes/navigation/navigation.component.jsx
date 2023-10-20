import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../firebase_config/firebase-auth.config";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="bg-blue-30 flex flex-col font-lato text-lg">
        <div className=" fixed top-0 w-full bg-blue-100 py-3">
          <Link className="px-5" to="/">
            💸
          </Link>
          {currentUser ? (
            <>
              <Link className="px-5 text-gray-700" to="/records">
                Records
              </Link>
            </>
          ) : (
            ""
          )}

          {currentUser ? (
            <span
              onClick={signOutUser}
              className="cursor-pointer text-gray-700"
            >
              Sign out
            </span>
          ) : (
            <Link className="px-5 text-gray-700" to="/authentication">
              Sign In & Sign out
            </Link>
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
