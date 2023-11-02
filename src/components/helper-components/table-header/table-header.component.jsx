const TableHeader = ({ text, textColor }) => {
  return <th className={`p-2 text-base font-medium ${textColor}`}>{text}</th>;
};

export default TableHeader;
