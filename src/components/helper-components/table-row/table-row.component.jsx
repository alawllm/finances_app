// import { useMediaQuery } from "react-responsive";

import ButtonWhite from "../button-white/button-white.component";
import TableCell from "../table-cell/table-cell.component";

const TableRow = ({ record, handleDeleteAndUpdate, handleClickUpdate }) => {
  const { id, category, item, price, date } = record;
  const shortDate = date.slice(2);

  // const isSmallScreen = useMediaQuery({ maxWidth: 750 });

  const categoryColors = {
    clothes: "bg-blue-100",
    food: "bg-teal-100",
    household: "bg-purple-100",
    education: "bg-cyan-100",
    travel: "bg-orange-100",
  };

  const categoryColor = categoryColors[category] || "bg-white";
  // const categoryContent = isSmallScreen ? category.charAt(0) : category;
  return (
    <tr key={id} className="text-base font-medium">
      <TableCell bgColor={categoryColor}>{category}</TableCell>
      <TableCell bgColor="bg-white">{item}</TableCell>
      <TableCell bgColor="bg-white">{price} €</TableCell>
      <TableCell bgColor="bg-white">{shortDate}</TableCell>
      <td className="w-auto py-1 text-center">
        <ButtonWhite
          hoverBg="hover:bg-blue-200"
          hoverBorder="hover:border-blue-700"
          width="w-8"
          onClick={() => handleClickUpdate(record)}
        >
          &#187;
        </ButtonWhite>
      </td>
      <td className="w-auto py-1 text-center">
        <ButtonWhite
          hoverBg="hover:bg-red-200"
          hoverBorder="hover:border-red-700"
          width="w-8"
          onClick={() => handleDeleteAndUpdate(record.id)}
        >
          -
        </ButtonWhite>
      </td>
    </tr>
  );
};

export default TableRow;
