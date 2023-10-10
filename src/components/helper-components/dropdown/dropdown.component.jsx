const DropdownCategories = ({ label, categoryOptions, value, onChange }) => {
  return (
    <div className="m-2 flex flex-col items-center">
      <label className="m-2 block font-bold text-gray-700">{label}</label>

      <select
        className="focus:shadow-outline w-48 rounded-md border px-3 py-0.5 focus:outline-none"
        name={label}
        value={value}
        onChange={onChange}
      >
        {categoryOptions.map((categoryOption) => (
          <option key={categoryOption} value={categoryOption}>
            {categoryOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCategories;
