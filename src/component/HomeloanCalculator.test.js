import { fireEvent, render, screen } from "@testing-library/react";
import HomeloanCalculator from "./HomeloanCalculator";

test("render with default value", () => {
  render(<HomeloanCalculator />);

  //defaut loan balance is 720000
  expect(screen.getByDisplayValue(720000)).toBeInTheDocument();

  //defaut years is 30
  expect(screen.getByDisplayValue(30)).toBeInTheDocument();

  //defaut interestRate is 6
  expect(screen.getByDisplayValue(6)).toBeInTheDocument();

  //defaut offset Balance is 0
  expect(
    screen.getByRole("textbox", { name: "Inital offset balance" })
  ).toHaveValue("0");

  //defaut monthly offset deposits is 0
  expect(
    screen.getByRole("textbox", { name: "Monthly offset deposits" })
  ).toHaveValue("0");

  //defaut estinmated repayment: is 4317
  expect(
    screen.getByRole("heading", { name: "Estinmated repayment: 4317 /month" })
  ).toBeInTheDocument();

  //defaut saved interest is 0
  expect(
    screen.getByRole("heading", { name: "Saved interest: 0" })
  ).toBeInTheDocument();
});

test("years greater than 30, display error message", () => {
  render(<HomeloanCalculator />);

  // screen.logTestingPlaygroundURL();
  const years = screen.getByRole("spinbutton", {
    name: "Years(1-30)",
  });
  fireEvent.change(years, { target: { value: 32 } });

  expect(screen.getByTestId("errorMsg")).toBeInTheDocument();
});

test("years less than 1, display error message", () => {
  render(<HomeloanCalculator />);

  // screen.logTestingPlaygroundURL();
  const years = screen.getByRole("spinbutton", {
    name: "Years(1-30)",
  });
  fireEvent.change(years, { target: { value: 0 } });

  expect(screen.getByTestId("errorMsg")).toBeInTheDocument();
});

test("interest rate less than 0, display error message", () => {
  render(<HomeloanCalculator />);

  // screen.logTestingPlaygroundURL();
  const interestRate = screen.getByRole("spinbutton", {
    name: "Interest rate(%)",
  });
  fireEvent.change(interestRate, { target: { value: -0.5 } });

  expect(screen.getByTestId("errorMsg-IR")).toBeInTheDocument();
});
