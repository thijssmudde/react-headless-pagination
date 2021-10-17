import React from "react";
import { Meta, Story } from "@storybook/react";
import { Pagination, IPaginationProps } from "../src";
import classNames from "classnames";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const meta: Meta = {
  title: "Pagination",
  component: Pagination,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const PaginationStory: Story<IPaginationProps> = (args) => {
  const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const page = 1;

  return (
    <div className="flex items-center w-full h-10 text-sm select-none">
      <span
        className="flex items-center mr-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
        // onClick={() => prevPage()}
      >
        <FiArrowLeft size={20} className={classNames("mr-3")} />
        Previous
      </span>
      <span className="flex items-center justify-center flex-grow">
        {pages.map((p) => (
          <span
            key={p}
            className={classNames(
              "flex items-center justify-center h-10 w-10 rounded-full cursor-pointer",
              {
                "text-gray-500": p !== page + 1,
                "bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white":
                  p === page + 1,
              },
            )}
            // onClick={() => setPage(p - 1)}
          >
            {p}
          </span>
        ))}
      </span>
      <span
        className="flex items-center ml-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
        // onClick={() => nextPage()}
      >
        Next
        <FiArrowRight size={20} className={classNames("ml-3")} />
      </span>
    </div>
  );
  // return <Pagination {...args} />;
};

export const Default = PaginationStory.bind({});

Default.args = {
  initialPage: 0,
  totalPages: 10,
  edgePageCount: 2,
  middlePagesSiblingCount: 1,
};
