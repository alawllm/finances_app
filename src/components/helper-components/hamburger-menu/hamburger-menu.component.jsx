import { Link } from "react-router-dom";

const HamburgerMenu = ({ isOpen, onClick, links }) => {
  console.log("isOpen:", isOpen);
  console.log("toggleMenu:", onClick);
  return (
    <div className="cursor-pointer">
      <span onClick={onClick}>H</span>
      {isOpen && (
        <div className="absolute mt-3 flex flex-col">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.redirectAddress}
              className="border border-solid bg-white p-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;