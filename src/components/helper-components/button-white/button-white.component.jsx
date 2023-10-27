const ButtonWhite = ({ hoverColor, children, ...otherProps }) => {
  return (
    <button
      className={`ml-2 h-8 w-8 cursor-pointer rounded-full border-2
    border-solid border-slate-400 bg-white text-center text-gray-800 hover:bg-${hoverColor}-100 hover:text-${hoverColor}-600`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ButtonWhite;
