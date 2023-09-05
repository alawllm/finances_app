const Button = ({ children, type, ...otherProps }) => {
  return (
    <button
      type={type}
      {...otherProps}
      className="bg-blue-500 hover:bg-blue-700 text-white 
            font-bold py-2 px-4 rounded-full m-2 w-30">
      {children}
    </button>
  );
};

export default Button;
