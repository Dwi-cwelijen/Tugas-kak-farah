export default function Table ({table=[],data= [], }) {
    return (
        <table className="border mt-6 z-10 rounded-md w-full border-sky-900/50">
            <thead className="text-center bg-sky-900/40">
                <tr>
                {table.map((col) => (
                    <th
                    key={col.key}
                    className="border text-xs md:text-base p-1 md:p-2"
                    >
                    {col.label}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr key={item.id} className="border">
                    {table.map((col) => (
                    <td
                        key={col.key}
                        className="border text-xs md:text-base p-1 md:p-2 text-center"
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