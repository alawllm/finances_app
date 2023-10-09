const TableRow = ({ record, handleClickDelete, handleClickUpdate }) => {
  return (
    <tr key={record.id}>
      <td className="border px-4 py-2 bg-blue-50">{record.category}</td>
      <td className="border px-4 py-2  bg-white">{record.item}</td>
      <td className="border px-4 py-2 bg-white">{record.price} €</td>
      <td className="border px-4 py-2 bg-white">{record.date}</td>
      <td className="px-4 py-2 text-center">
        <button
          className=" bg-white text-black hover:text-red-500 border-solid
       border-2 border-slate-500 rounded-full w-8 h-8 text-center"
          onClick={() => handleClickDelete(record.id)}>
          -
        </button>
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className=" bg-white text-black hover:text-red-500 border-solid
       border-2 border-slate-500 rounded-full w-8 h-8 text-center"
          onClick={() => handleClickUpdate(record.id)}>
          U
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
