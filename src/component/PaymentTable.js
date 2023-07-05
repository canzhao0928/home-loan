import { useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function PaymentTable({ tableData }) {
  let PageSize = 10;

  const [number, setNumber] = useState("yearly");
  const [tableDisplay, setTableDisplay] = useState(tableData);
  const [currenPage, setCurrentPage] = useState(1);

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  useEffect(() => {
    if (number === "monthly") {
      setTableDisplay(tableData);
    } else if (number === "yearly") {
      const array = tableData.filter((table) => table.month % 12 === 0);
      setTableDisplay(array);
    }
  }, [number, tableData]);

  return (
    <div className="container m-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        onChange={handleNumber}
        id="countries"
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="yearly">yearly</option>
        <option value="monthly">monthly</option>
      </select>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {number === "monthly" ? "months" : "years"}
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
            <th scope="col" className="px-6 py-3">
              Paied total interest
            </th>
            <th scope="col" className="px-6 py-3">
              Saved total interest
            </th>
            {number === "yearly" && (
              <th scope="col" className="px-6 py-3">
                Compound interest rate(yearly)
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableDisplay.map((table) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={table.month}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {number === "monthly" ? table.month : table.month / 12}
                </th>
                <td className="px-6 py-4">${Math.round(table.interest)}</td>
                <td className="px-6 py-4">${Math.round(table.Principal)}</td>
                <td className="px-6 py-4">${Math.round(table.remainLoan)}</td>
                <td className="px-6 py-4">
                  ${Math.round(table.totalInterest)}
                </td>
                <td className="px-6 py-4">
                  ${table.savedInterest ? Math.round(table.savedInterest) : 0}
                </td>
                {number === "yearly" && (
                  <td className="px-6 py-4">{table.compInterestRate}%</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        // className="pagination-bar"
        currentPage={currenPage}
        totalCount={tableDisplay.length}
        pageSize={PageSize}
        handlePagechange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
