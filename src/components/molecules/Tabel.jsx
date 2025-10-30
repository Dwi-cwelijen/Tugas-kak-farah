export default function Table ({table=[],data= [], }) {
    return (
        <table className=" mt-6 md:w-full z-10 w-full">
            <thead className="text-center bg-sky-900/40 rounded-2xl">
                <tr>
                {table.map((col) => (
                    <th
                    key={col.key}
                    className=" text-xs md:text-base p-1 md:p-2"
                    >
                    {col.label}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody className="bg-linear-to-bl from-sky-900/40 via-sky-50 to-sky-200">
                {data.map((item) => (
                <tr key={item.id} className="hover:bg-sky-950 hover:text-white ">
                    {table.map((col) => (
                    <td
                        key={col.key}
                        className="text-xs w-screen md:text-base p-1 md:p-2 text-center"
                    >
                        {item[col.key]}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>

    );
}