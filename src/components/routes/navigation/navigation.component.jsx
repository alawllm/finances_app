import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { signOutUser } from "../../../firebase_config/firebase-auth.config";
import { UserContext } from "../../../contexts/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col h-full bg-blue-30 font-lato text-lg">
        <div className="bg-blue-200 -300 w-full top-0 fixed py-3">
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
              className="cursor-pointer text-gray-700">
              Sign out
            </span>
          ) : (
            <Link className="px-5 text-gray-700" to="/authentication">
              Sign In & Sign out
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center flex-col h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navigation;
