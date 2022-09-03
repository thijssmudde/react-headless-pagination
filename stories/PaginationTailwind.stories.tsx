import React from "react";
import { Meta, Story } from "@storybook/react";
import { Pagination, IPaginationProps } from "../src";
import classNames from "classnames";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "./tailwind.css";

const meta: Meta = {
  title: "Pagination Tailwind",
  component: Pagination,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const PaginationStory: Story<IPaginationProps> = (args) => {
  const [page, setPage] = React.useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      {...args}
      currentPage={page}
      setCurrentPage={handlePageChange}
      className="flex items-center w-full h-10 text-sm select-none"
      truncableText="..."
      truncableClassName="w-10 px-0.5 text-center"
    >
      <Pagination.PrevButton
        className={classNames(
          "flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none",
          {
            "cursor-pointer": page !== 0,
            "opacity-50": page === 0,
          },
        )}
      >
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

      <Pagination.NextButton
        className={classNames(
          "flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none",
          {
            "cursor-pointer": page !== args.totalPages - 1,
            "opacity-50": page === args.totalPages - 1,
          },
        )}
      >
        Next
        <FiArrowRight size={20} className="ml-3" />
      </Pagination.NextButton>
    </Pagination>
  );
};

export const Default = PaginationStory.bind({});

Default.args = {
  totalPages: 10,
  edgePageCount: 2,
  middlePagesSiblingCount: 1,
  truncableText: "...",
  truncableClassName: "w-10 px-0.5",
};
