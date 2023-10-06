const FormInput = ({ label, placeholder, ...otherProps }) => {
  return (
    <div className="flex flex-col items-center m-2">
      {label && (
        // add effect if no length then shrink
        <label className="block text-gray-700 font-bold mb-2 text-center">
          {" "}
          {label}
        </label>
      )}
      <input
        className="appearance-none border rounded py-0.5 px-3 leading-tight focus:outline-none focus:shadow-outline w-48 text-center"
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
