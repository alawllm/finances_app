const Button = ({ children, ...otherProps }) => {
  return (
    <button
      className="w-30 m-3 rounded-full 
            bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
