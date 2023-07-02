export default function PaymentTable({ tableData }) {
  return (
    <div className="container m-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Months
            </th>
            <th scope="col" className="px-6 py-3">
              Interest
            </th>
            <th scope="col" className="px-6 py-3">
              Principal
            </th>
            <th scope="col" className="px-6 py-3">
              Remain loan
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((table) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={table.month}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {table.month}
                </th>
                <td className="px-6 py-4">${table.interest}</td>
                <td className="px-6 py-4">${table.Principal}</td>
                <td className="px-6 py-4">${table.remainLoan}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
