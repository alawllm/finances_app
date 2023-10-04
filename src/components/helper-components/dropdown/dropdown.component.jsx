const DropdownCategories = ({ label, categoryOptions, value, onChange }) => {
  return (
    <div className="flex flex-col items-center m-2">
      <label className="block text-gray-700 font-bold m-2">{label}</label>
      <select
        className="border rounded py-0.5 px-3 focus:outline-none focus:shadow-outline w-48"
        name={label}
        value={value}
        onChange={onChange}>
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
