import { Link } from "react-router-dom";

import HamburgerIcon from "../hamburger-icon/hamburger-icon.component.jsx";

const HamburgerMenu = ({ isOpen, onClick, links }) => {
  return (
    <div className="relative h-12">
      <div className="flex h-full cursor-pointer items-center justify-center transition-all">
        <span>
          <HamburgerIcon isOpen={isOpen} onClick={onClick} />
        </span>
        {isOpen && (
          <div className="absolute left-0 top-16 z-10 flex flex-col text-sm">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.redirectAddress}
                className="flex whitespace-nowrap border border-solid bg-white px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
