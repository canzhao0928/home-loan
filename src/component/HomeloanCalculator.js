import { useState } from "react";
import { useEffect } from "react";
import PaymentTable from "./PaymentTable";

export default function HomeloanCalculator() {
  const [loanBalance, setLoanBalance] = useState(720000);
  const [year, setYear] = useState(30);
  const [interestRate, setInterestRate] = useState(6.0);
  const [monthPay, setMonthPay] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [tableArray, setTableArray] = useState([]);

  useEffect(() => {
    let month = year * 12;
    const monthlyRate = interestRate / 1200;
    //calculate monthly payment
    const monthlyPay =
      (loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, month))) /
      (Math.pow(1 + monthlyRate, month) - 1);

    setMonthPay(Math.round(monthlyPay));
    //calculate total interest
    const totalinterest = monthlyPay * year * 12 - loanBalance;
    setTotalInterest(Math.round(totalinterest));

    //calculate the payment table
    let loanBalanceRemain = loanBalance;
    let array = [];
    for (let index = 1; index <= month; index++) {
      const interest = Math.round(loanBalanceRemain * monthlyRate);
      const Principal = Math.round(monthlyPay - interest);
      const remainLoan = Math.round(loanBalanceRemain - Principal);
      const tabledata = {
        month: index,
        interest: interest,
        Principal: Principal,
        remainLoan: remainLoan,
      };
      array.push(tabledata);
      loanBalanceRemain = remainLoan;
    }
    setTableArray(array);
  }, [loanBalance, year, interestRate]);

  const handleLoanBalance = (e) => {
    setLoanBalance(e.target.value);
  };
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleInterestRate = (e) => {
    setInterestRate(e.target.value);
  };
  return (
    <>
      <div className="container mx-auto grid gap-6 my-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="loan-balance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Loan balance
          </label>
          <input
            onChange={handleLoanBalance}
            value={loanBalance}
            type="text"
            id="loan-balance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="years"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Years
          </label>
          <input
            onChange={handleYear}
            value={year}
            type="text"
            id="years"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="interest-rate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Interest rate(%)
          </label>
          <input
            onChange={handleInterestRate}
            value={interestRate}
            type="text"
            id="interest-rate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <h2>
            Estinmated repayment:
            <strong className="font-extrabold text-gray-900 dark:text-white text-3xl">
              {monthPay}
            </strong>
            /month
          </h2>
        </div>
        <div>
          <h2>
            Total interest:
            <strong className="font-extrabold text-gray-900 dark:text-white text-3xl">
              {totalInterest}
            </strong>
          </h2>
        </div>
      </div>
      <PaymentTable tableData={tableArray} />
    </>
  );
}
