import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

test("renders pagination with 2 pages, Previous page does not exist when current page is 1", () => {
  const mockFunction = () => {
    console.log("mock fonction");
  };
  render(
    <Pagination
      totalCount={20}
      currentPage={1}
      pageSize={10}
      handlePagechange={() => {
        mockFunction();
      }}
    />
  );

  //contain 2 pages
  const firstPage = screen.getByText("1");
  const secondPage = screen.getByText("2");
  const thirdPage = screen.queryByText("3");
  expect(firstPage).toBeInTheDocument();
  expect(secondPage).toBeInTheDocument();
  expect(thirdPage).not.toBeInTheDocument();

  //previous page does not exist
  const pre = screen.queryByText("Previous");
  expect(pre).not.toBeInTheDocument();

  //next page exists
  const next = screen.getByText("Next");
  expect(next).toBeInTheDocument();
});

test("Next page does not exist when current page is the last", () => {
  const mockFunction = () => {
    console.log("mock fonction");
  };
  render(
    <Pagination
      totalCount={20}
      currentPage={2}
      pageSize={10}
      handlePagechange={() => {
        mockFunction();
      }}
    />
  );

  //Next page does not exist
  const next = screen.queryByText("Next");
  expect(next).not.toBeInTheDocument();

  //previous page exists
  const pre = screen.getByText("Previous");
  expect(pre).toBeInTheDocument();
});

test("Click page number will change the current page", () => {
  let currentPage = 1;
  const mockFunction = (page) => {
    currentPage = page;
  };
  render(
    <Pagination
      totalCount={20}
      currentPage={currentPage}
      pageSize={10}
      handlePagechange={(page) => {
        mockFunction(page);
      }}
    />
  );

  const secondPage = screen.getByText("2");
  fireEvent.click(secondPage);
  expect(currentPage).toEqual(2);
});

test("Click 'Previous' will change the current page to the previous page", () => {
  let currentPage = 2;
  const mockFunction = (page) => {
    currentPage = page;
  };
  render(
    <Pagination
      totalCount={20}
      currentPage={currentPage}
      pageSize={10}
      handlePagechange={(page) => {
        mockFunction(page);
      }}
    />
  );

  const pre = screen.getByText("Previous");
  fireEvent.click(pre);
  expect(currentPage).toEqual(1);
});

test("Click 'Next' will change the current page to the next page", () => {
  let currentPage = 1;
  const mockFunction = (page) => {
    currentPage = page;
  };
  render(
    <Pagination
      totalCount={20}
      currentPage={currentPage}
      pageSize={10}
      handlePagechange={(page) => {
        mockFunction(page);
      }}
    />
  );

  const next = screen.getByText("Next");
  fireEvent.click(next);
  expect(currentPage).toEqual(2);
});
