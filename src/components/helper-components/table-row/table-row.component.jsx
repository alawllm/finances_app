import { useMediaQuery } from "react-responsive";

import ButtonWhite from "../button-white/button-white.component";

const TableRow = ({ record, handleClickDelete, handleClickUpdate }) => {
  const { id, category, item, price, date } = record;
  const shortDate = date.slice(2);

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
        {shortDate}
      </td>
      <td className="w-auto py-1 text-center">
        <ButtonWhite
          hoverColor="blue"
          width={8}
          onClick={() => handleClickUpdate(record)}
        >
          &#187;
        </ButtonWhite>
      </td>
      <td className="w-auto py-1 text-center">
        <ButtonWhite
          hoverColor="red"
          width={8}
          onClick={() => handleClickDelete(record.id)}
        >
          -
        </ButtonWhite>
      </td>
    </tr>
  );
};

export default TableRow;
