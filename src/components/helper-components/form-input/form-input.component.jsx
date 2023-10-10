const FormInput = ({ label, placeholder, ...otherProps }) => {
  return (
    <div className="m-2 flex flex-col items-center">
      {label && (
        // add effect if no length then shrink
        <label className="mb-2 block text-center font-bold text-gray-700">
          {" "}
          {label}
        </label>
      )}
      <input
        className="focus:shadow-outline w-48 appearance-none rounded-md border px-3 py-0.5 text-center leading-tight focus:outline-none"
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
