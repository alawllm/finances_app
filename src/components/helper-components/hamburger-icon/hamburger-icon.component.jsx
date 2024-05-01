//isOpen, setIsOpen

const HamburgerIcon = ({ isOpen, onClick }) => {
  console.log(onClick);
  const genericHamburgerLine = `h-[4px] w-6 mb-1 rounded-full bg-blue-900 transition ease transform duration-300`;
  return (
    <button
      className="group flex h-8 flex-col items-center justify-center rounded mt-2 leading-3"
      onClick={onClick}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "translate-y-2 rotate-45 opacity-80 group-hover:opacity-100"
            : "opacity-60 group-hover:opacity-100"
        }`}
      ></div>
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-60 group-hover:opacity-100"
        }`}
      ></div>
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-translate-y-2 -rotate-45 opacity-80 group-hover:opacity-100"
            : "opacity-60 group-hover:opacity-100"
        }`}
      ></div>
    </button>
  );
};

export default HamburgerIcon;

{
  /* <div
  className="ease h-1 w-6 transform
          rounded-full bg-blue-700 duration-300
        before:absolute before:h-1 before:w-6 before:-translate-y-2 before:rounded-full before:bg-blue-700 before:content-['']
        after:absolute after:h-1 after:w-6 after:translate-y-2 after:rounded-full after:bg-blue-700 after:content-['']
        "
></div>; */
}
