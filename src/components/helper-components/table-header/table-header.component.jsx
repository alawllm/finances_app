const TableHeader = ({ text, textColor }) => {
  return <th className={`text-md p-2 font-bold ${textColor}`}>{text}</th>;
};

export default TableHeader;
