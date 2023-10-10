const UpdateRow = ({ clickedRecord, handleUpdate }) => {
  const { id, category, item, price, date } = clickedRecord;
  return (
    <tr key={id}>
      <td className="border px-4 py-2 bg-blue-200">{category}</td>
      <td className="border px-4 py-2  bg-blue-100">{item}</td>
      <td className="border px-4 py-2 bg-blue-100">{price} €</td>
      <td className="border px-4 py-2 bg-blue-100">{date}</td>
      <td className="px-4 py-2 text-center">
        <button
          className=" bg-white text-black hover:text-red-500 border-solid
         border-2 border-slate-500 rounded-full w-8 h-8 text-center"
          onClick={() => handleUpdate(clickedRecord)}>
          U
        </button>
      </td>
    </tr>
  );
};

export default UpdateRow;
