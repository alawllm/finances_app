const Records = () => {

    const categories = [
        {
            id: 1,
            title: 'grocery',
            amount: 45
        },
        {
            id: 2,
            title: 'travel',
            amount: 66
        }, {
            id: 3,
            title: 'eating out',
            amount: 10
        }, {
            id: 4,
            title: 'clothing',
            amount: 78
        }
    ]
    return (
        <>
            <h1 className="m-5">Here you can see all the beautiful Records</h1>
            <div className=" grid grid-cols-4 gap-10">
                {categories.map(({ title, amount, id }) => (
                    <div key={id} className="bg-blue-400 p-3 text-center">
                        <h2 className="text-bold">{title}</h2>
                        <h3>{amount} €</h3>
                    </div>))}

            </div>
        </>
    )
}

export default Records;