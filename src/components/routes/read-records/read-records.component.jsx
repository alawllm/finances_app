import { MOCK_DATA } from "../../../mock-data";

const ReadRecords = () => {

    return (
        <>
            <h1 className="m-30">Here you can see all the beautiful hardcoded Records</h1>
            <table className="table-auto m-5">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Price (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_DATA.map(({ title, items }) => (
                        items.map(({ id, name, price }) => (
                            <tr key={id}>
                                <td className="border px-4 py-2 bg-blue-400">{title}</td>
                                <td className="border px-4 py-2">{name}</td>
                                <td className="border px-4 py-2">{price} €</td>
                            </tr>
                        ))
                    ))}
                </tbody>

            </table>
        </>
    )
}

export default ReadRecords;