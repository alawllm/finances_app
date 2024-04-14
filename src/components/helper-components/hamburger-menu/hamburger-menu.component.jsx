const HamburgerMenu = ({ isOpen, onClick }) => {
  console.log("isOpen:", isOpen);
  console.log("toggleMenu:", onClick);
  return (
    <div className="cursor-pointer">
      <span onClick={onClick}>H</span>
      {isOpen && <div className="flex flex-col">Here menu</div>}
    </div>
  );
};

export default HamburgerMenu;
