const ButtonWhite = ({ hoverColor, width, children, ...otherProps }) => {
  return (
    <button
      className={`h-8 w-${width} cursor-pointer rounded-full border-2
    border-solid border-slate-400 bg-white text-center text-gray-800 hover:bg-${hoverColor}-200 hover:text-${hoverColor}-600`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ButtonWhite;
