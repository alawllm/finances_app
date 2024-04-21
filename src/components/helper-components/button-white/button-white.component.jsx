const ButtonWhite = ({
  hoverBg,
  hoverBorder,
  width,
  children,
  ...otherProps
}) => {
  return (
    <button
      className={`h-8 ${width} cursor-pointer rounded-md border-2 border-solid
    border-slate-300 bg-white text-center text-sm text-gray-500 ${hoverBorder} hover:text-gray-800 ${hoverBg}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ButtonWhite;
