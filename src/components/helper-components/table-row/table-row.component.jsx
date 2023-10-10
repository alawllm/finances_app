const TableRow = ({ record, handleClickDelete, handleClickUpdate }) => {
  const { id, category, item, price, date } = record;

  const categoryColors = {
    clothes: "bg-blue-200",
    food: "bg-teal-200",
    household: "bg-purple-200",
    education: "bg-cyan-200",
    travel: "bg-emerald-300",
  };

  const categoryColor = categoryColors[category] || "bg-white";
  // button - separate component?
  return (
    <tr key={id}>
      <td className={`border border-slate-400 py-1 px-2 ${categoryColor} w-auto`}>{category}</td>
      <td className="border border-slate-400 py-1  px-2 bg-white w-auto">{item}</td>
      <td className="border border-slate-400 py-1 px-2 bg-white w-auto">{price} €</td>
      <td className="border border-slate-400 py-1 px-2 bg-white w-auto">{date}</td>
      <td className="text-center w-auto py-1">
        <button
          className=" bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-100 border-solid
       border-2 border-slate-500 rounded-full w-8 h-8 text-center"
          onClick={() => handleClickUpdate(record)}>
          u
        </button>
      </td>
      <td className="text-center w-auto py-1">
        <button
          className=" bg-white text-gray-500 hover:text-red-500 hover:bg-red-100 border-solid
       border-2 border-slate-500 rounded-full w-8 h-8 text-center"
          onClick={() => handleClickDelete(record.id)}>
          -
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
