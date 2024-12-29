const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-blue-800 text-white">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-blue-50 ${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border-t">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
