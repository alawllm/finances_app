const DropdownCategories = ({ label, value, onChange, categoriesList }) => {
  return (
    <div className="m-2 flex flex-col items-center">
      <label className="mb-2 block text-base font-medium">{label}</label>
      <select
        className="focus:shadow-outline w-60 rounded-md border border-stone-500 px-3 py-2 text-center leading-tight focus:outline-none"
        name={label}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled className="text-gray-400">
          select category
        </option>
        {categoriesList.map((categoryOption) => (
          <option key={categoryOption} value={categoryOption}>
            {categoryOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCategories;
