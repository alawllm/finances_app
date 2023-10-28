const TableCell = ({ children, bgColor }) => {
  return (
    <td
      className={`w-auto border border-slate-400 ${bgColor} px-2 py-1 text-left text-base`}
    >
      {children}
    </td>
  );
};

export default TableCell;
