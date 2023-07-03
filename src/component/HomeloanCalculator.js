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
  const [offsetBalance, setOffsetBalance] = useState(0);

  const calculateTable = () => {
    let month = year * 12;
    const monthlyRate = interestRate / 1200;
    //calculate monthly payment
    const monthlyPay =
      (loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, month))) /
      (Math.pow(1 + monthlyRate, month) - 1);

    setMonthPay(Math.round(monthlyPay));

    //calculate total interest
    const totalinterest = monthlyPay * (year * 12) - loanBalance;
    setTotalInterest(Math.round(totalinterest));

    //calculate the payment table
    let loanBalanceRemain = loanBalance;
    let array = [];
    let totalInterestTillNow = 0;
    const interestLoan = loanBalanceRemain - offsetBalance;
    for (let index = 1; loanBalanceRemain > 0; index++) {
      let remainLoan, principal;
      //offset < loanBalance
      let interest = 0;
      //offset < loanBalance
      if (interestLoan > 0) {
        interest = Math.round(
          (loanBalanceRemain - offsetBalance) * monthlyRate
        );
      }
      if (loanBalanceRemain < monthlyPay) {
        principal = loanBalanceRemain;
        remainLoan = 0;
        console.log(remainLoan);
      } else {
        principal = Math.round(monthlyPay - interest);
        remainLoan = Math.round(loanBalanceRemain - principal);
      }
      loanBalanceRemain = remainLoan;

      totalInterestTillNow += interest;

      const tabledata = {
        month: index,
        interest: interest,
        Principal: principal,
        remainLoan: remainLoan,
        totalInterest: totalInterestTillNow,
      };
      array.push(tabledata);
    }
    setTableArray(array);
    console.log("before render");
  };

  useEffect(() => {
    calculateTable();
  }, [loanBalance, year, interestRate, offsetBalance]);

  const handleLoanBalance = (e) => {
    setLoanBalance(e.target.value);
  };
  const handleYear = (e) => {
    if (e.target.value < 1) {
      setYear(1);
    } else if (e.target.value > 30) {
      setYear(30);
    } else {
      setYear(e.target.value);
    }
  };
  const handleInterestRate = (e) => {
    if (e.target.value < 0) {
      setInterestRate(0);
    } else if (e.target.value > 100) {
      setInterestRate(100);
    } else {
      setInterestRate(e.target.value);
    }
  };

  const handleOffsetBalance = (e) => {
    setOffsetBalance(e.target.value);
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
            Years(1-30)
          </label>
          <input
            onChange={handleYear}
            value={year}
            type="number"
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
            type="number"
            id="interest-rate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="offset-balance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Inital offset balance
          </label>
          <input
            onChange={handleOffsetBalance}
            value={offsetBalance}
            type="number"
            id="offset-balance"
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
              {tableArray.length === 0
                ? totalInterest
                : tableArray[tableArray.length - 1].totalInterest}
            </strong>
          </h2>
        </div>
        <div>
          <h2>
            Your loan term(Months):
            <strong className="font-extrabold text-gray-900 dark:text-white text-3xl">
              {tableArray.length === 0
                ? year * 12
                : tableArray[tableArray.length - 1].month}
            </strong>
          </h2>
        </div>
        <div>
          <h2>
            Saved interest:
            <strong className="font-extrabold text-gray-900 dark:text-white text-3xl">
              {tableArray.length === 0
                ? 0
                : totalInterest -
                  tableArray[tableArray.length - 1].totalInterest}
            </strong>
          </h2>
        </div>
      </div>
      <PaymentTable tableData={tableArray} />
    </>
  );
}
