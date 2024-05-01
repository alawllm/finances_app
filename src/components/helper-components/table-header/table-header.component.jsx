const TableHeader = ({ text, textColor, isSortable, onClick, margin }) => {
  return (
    <th
      className={`px-2 py-1 text-left  text-base ${textColor} ${margin} ${
        isSortable ? "cursor-pointer hover:text-green-600" : ""
      }`}
      onClick={isSortable ? () => onClick(text.toLowerCase()) : undefined}
    >
      {text}
    </th>
  );
};

export default TableHeader;
