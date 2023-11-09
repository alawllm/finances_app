const TableHeader = ({ text, textColor, isSortable, onClick }) => {
  return (
    <th
      className={`p-2  text-base ${textColor} ${
        isSortable ? "cursor-pointer hover:text-green-600" : ""
      }`}
      onClick={isSortable ? () => onClick(text) : undefined}
    >
      {text}
    </th>
  );
};

export default TableHeader;
