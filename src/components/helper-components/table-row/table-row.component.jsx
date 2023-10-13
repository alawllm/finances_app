import { useMediaQuery } from "react-responsive";

const TableRow = ({ record, handleClickDelete, handleClickUpdate }) => {
  const { id, category, item, price, date } = record;

  const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const categoryColors = {
    clothes: "bg-blue-100",
    food: "bg-teal-100",
    household: "bg-purple-100",
    education: "bg-cyan-100",
    travel: "bg-orange-100",
  };

  const categoryColor = categoryColors[category] || "bg-white";
  const categoryContent = isSmallScreen ? category.charAt(0) : category;
  return (
    <tr key={id} className="text-base">
      <td
        className={`border border-slate-300 px-2 py-1 ${categoryColor} w-auto text-left`}
      >
        {categoryContent}
      </td>
      <td className="w-auto border border-slate-300  bg-white px-2 py-1 text-left">
        {item}
      </td>
      <td className="w-auto border border-slate-300 bg-white px-2 py-1">
        {price} €
      </td>
      <td className="w-auto border border-slate-300 bg-white px-2 py-1">
        {date}
      </td>
      <td className="w-auto py-1 text-center">
        <button
          className=" ml-2 h-8 w-8 cursor-pointer rounded-full border-2
       border-solid border-slate-400 bg-white text-center text-gray-800 hover:bg-blue-100 hover:text-blue-600"
          onClick={() => handleClickUpdate(record)}
        >
          &#187;
        </button>
      </td>
      <td className="w-auto py-1 text-center">
        <button
          className=" h-8 w-8 cursor-pointer rounded-full border-2
       border-solid border-slate-400 bg-white text-center text-gray-800 hover:bg-red-100 hover:text-red-500"
          onClick={() => handleClickDelete(record.id)}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
