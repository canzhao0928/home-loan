import { render, screen } from "@testing-library/react";
import PaymentTable from "./PaymentTable";

const generalMockData = () => {
  const num = 12;
  const array = [];
  for (let index = 1; index < num + 1; index++) {
    const tabledata = {
      month: index,
      interest: 111,
      Principal: 222,
      remainLoan: 333,
      totalInterest: 444,
      compInterestRate: 5,
    };
    array.push(tabledata);
  }

  return array;
};

test("Default render yearly data", () => {
  const mockData = generalMockData();
  render(<PaymentTable tableData={mockData} />);

  const year = screen.getByTestId("year");
  expect(year).toBeInTheDocument();

  const interest = screen.getByText("$111");
  expect(interest).toBeInTheDocument();

  const principal = screen.getByText("$222");
  expect(principal).toBeInTheDocument();

  const remainLoan = screen.getByText("$333");
  expect(remainLoan).toBeInTheDocument();

  const totalInterest = screen.getByText("$444");
  expect(totalInterest).toBeInTheDocument();

  const compInterestRate = screen.getByText("5%");
  expect(compInterestRate).toBeInTheDocument();
});
