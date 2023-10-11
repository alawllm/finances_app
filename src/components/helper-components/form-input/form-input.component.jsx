const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="m-2 flex flex-col items-center">
      {label && (
        <label className="mb-2 block text-base font-medium text-black">
          {" "}
          {label}
        </label>
      )}
      <input
        className="focus:shadow-outline w-60 appearance-none rounded-md border border-stone-500 px-3 py-2 text-center leading-tight focus:outline-none"
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
