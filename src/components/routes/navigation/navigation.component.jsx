import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../firebase_config/firebase-auth.config";
import HamburgerMenu from "../../helper-components/hamburger-menu/hamburger-menu.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = useNavigate();

  const toggleMenu = () => {
    console.log("menu toggled");
    setIsOpen(!isOpen);
  };

  const signOut = async () => {
    await signOutUser();
    navigateTo("/");
  };
  return (
    <>
      <div className="bg-blue-30 flex flex-col font-lato text-lg">
        <div className="fixed top-0 flex w-full items-center justify-between bg-blue-100 py-3">
          <div className="flex items-center">
            {/* home link */}
            <Link className="px-5" to="/">
              💸
            </Link>
            {/* hamburger menu links mobile state */}
            {currentUser && (
              <div className="md:hidden">
                <HamburgerMenu isOpen={isOpen} onClick={toggleMenu} />
              </div>
            )}
            {/* all links not mobile state */}
            {currentUser && (
              <>
                <div className="hidden md:block">
                  <Link className="px-5 text-gray-700" to="/spaces">
                    Spaces
                  </Link>
                  <Link className="px-5 text-gray-700" to="/all-records">
                    All records
                  </Link>
                  <Link className="px-5 text-gray-700" to="/summary">
                    Summary
                  </Link>
                </div>
              </>
            )}
          </div>
          {/* sign out */}
          {currentUser && (
            <span
              onClick={signOut}
              className="mr-5 cursor-pointer text-gray-700"
            >
              Sign out
            </span>
          )}
        </div>
        <div className="mt-12 flex min-h-screen flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navigation;
