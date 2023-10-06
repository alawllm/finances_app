import ButtonUpdateDelete from "../button-ud/button-ud.component"

const TableRow = ({record, handleClickDelete, handleClickUpdate}) => {
    return (
<tr key={record.id}>
                <td className="border px-4 py-2 bg-blue-50">
                  {record.category}
                </td>
                <td className="border px-4 py-2  bg-white">{record.item}</td>
                <td className="border px-4 py-2 bg-white">{record.price} €</td>
                <td className="border px-4 py-2 bg-white">{record.date}</td>
                <td className="px-4 py-2 text-center">
                  <ButtonUpdateDelete
                    onClick={() => handleClickDelete(record.id)}
                    text={"-"}
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <ButtonUpdateDelete
                    onClick={() => handleClickUpdate(record.id)}
                    text={"u"}
                  />
                </td>
              </tr>
    )
}

export default TableRow;