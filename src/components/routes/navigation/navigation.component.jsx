import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../firebase_config/firebase-auth.config";
import HamburgerMenu from "../../helper-components/hamburger-menu/hamburger-menu.component";

const links = [
  {
    name: "Spaces",
    redirectAddress: "/spaces",
  },
  {
    name: "All records",
    redirectAddress: "/all-records",
  },
  {
    name: "Summary",
    redirectAddress: "/summary",
  },
];

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('menu toggled')
    setIsOpen(!isOpen);
  };

   const navigateTo = useNavigate();

  const signOut = async () => {
    await signOutUser();
    navigateTo("/");
  };
  return (
    <>
      <div className="flex h-full flex-col bg-white font-lato text-lg">
        <div className="fixed top-0 flex w-full items-center justify-between bg-green-300 px-6">
          <div className="flex items-center justify-start gap-8 py-3">
            {/* home link */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Link className="px-5" to="/">
                💸
              </Link>
            </div>
            {/* hamburger menu links mobile state */}
            {currentUser && (
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isOpen}
                  onClick={toggleMenu}
                  links={links}
                />
              </div>
            )}
            {/* all links not mobile state */}
            {currentUser && (
              <>
                <div className="hidden md:block">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.redirectAddress}
                      className="px-4"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* sign out */}
          {currentUser && (
            <span
              onClick={signOut}
              className="mr-5 cursor-pointer text-gray-600 hover:text-gray-900"
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
