import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { render } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { IPaginationProps } from "./Pagination.d";

const setupPagination = ({
  currentPage = 1,
  setCurrentPage = () => {},
  className = "",
  truncableText = "...",
  truncableClassName = "",
  totalPages = 10,
  edgePageCount = 1,
  middlePagesSiblingCount = 2,
  children = <></>,
}: Partial<IPaginationProps>) =>
  render(
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      className={className}
      truncableText={truncableText}
      truncableClassName={truncableClassName}
      totalPages={totalPages}
      edgePageCount={edgePageCount}
      middlePagesSiblingCount={middlePagesSiblingCount}
    >
      {children}
    </Pagination>,
  );

describe("Pagination", () => {
  it("renders correctly with basic setup of prevButton, pageButton and nextButton", () => {
    const { asFragment } = setupPagination({
      children: (
        <>
          <Pagination.PrevButton className="">Previous</Pagination.PrevButton>

          <div className="flex items-center justify-center flex-grow">
            <Pagination.PageButton
              activeClassName=""
              inactiveClassName=""
              className=""
            />
          </div>

          <Pagination.NextButton className="">Next</Pagination.NextButton>
        </>
      ),
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with advanced setup of prevButton, pageButton and nextButton using Tailwind", () => {
    const { asFragment } = setupPagination({
      className: "flex items-center w-full h-10 text-sm select-none",
      truncableClassName: "w-10 px-0.5 text-center",
      children: (
        <>
          <Pagination.PrevButton className="flex items-center mr-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none">
            <FiArrowLeft size={20} className="mr-3" />
            Previous
          </Pagination.PrevButton>

          <div className="flex items-center justify-center flex-grow">
            <Pagination.PageButton
              activeClassName="bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white"
              inactiveClassName="text-gray-500"
              className={
                "flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
              }
            />
          </div>

          <Pagination.NextButton className="flex items-center mr-2 text-gray-500 opacity-50 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none">
            Next
            <FiArrowRight size={20} className="ml-3" />
          </Pagination.NextButton>
        </>
      ),
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
