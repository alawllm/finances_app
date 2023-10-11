import { useMediaQuery } from "react-responsive";

const TableRow = ({ record, handleClickDelete, handleClickUpdate }) => {
  const { id, category, item, price, date } = record;

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const categoryColors = {
    clothes: "bg-blue-200",
    food: "bg-teal-200",
    household: "bg-purple-200",
    education: "bg-cyan-200",
    travel: "bg-emerald-300",
  };

  const categoryColor = categoryColors[category] || "bg-white";
  const categoryContent = isSmallScreen ? category.charAt(0) : category;
  return (
    <tr key={id}>
      <td
        className={`border border-slate-400 px-2 py-1 ${categoryColor} w-auto text-left`}
      >
        {categoryContent}
      </td>
      <td className="w-auto border border-slate-400  bg-white px-2 py-1 text-left">
        {item}
      </td>
      <td className="w-auto border border-slate-400 bg-white px-2 py-1">
        {price} €
      </td>
      <td className="w-auto border border-slate-400 bg-white px-2 py-1">
        {date}
      </td>
      <td className="w-auto py-1 text-center">
        <button
          className=" h-8 w-8 rounded-full border-2 border-solid
       border-slate-400 bg-white text-center text-gray-500 hover:bg-blue-100 hover:text-blue-600"
          onClick={() => handleClickUpdate(record)}
        >
          u
        </button>
      </td>
      <td className="w-auto py-1 text-center">
        <button
          className=" h-8 w-8 rounded-full border-2 border-solid
       border-slate-400 bg-white text-center text-gray-500 hover:bg-red-100 hover:text-red-500"
          onClick={() => handleClickDelete(record.id)}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
