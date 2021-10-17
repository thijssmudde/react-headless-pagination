import React from "react";
import { Meta, Story } from "@storybook/react";
import { Pagination, IPaginationProps } from "../src";

const meta: Meta = {
  title: "Pagination",
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
    <>
      Current page: {page + 1}
      <Pagination
        {...args}
        currentPage={page}
        setCurrentPage={handlePageChange}
        className=""
        truncableText="..."
        truncableClassName=""
      >
        <Pagination.PrevButton className="">Previous</Pagination.PrevButton>

        <div className="flex items-center justify-center flex-grow">
          <Pagination.PageButton
            activeClassName=""
            inactiveClassName=""
            className=""
          />
        </div>

        <Pagination.NextButton className="">Next</Pagination.NextButton>
      </Pagination>
    </>
  );
};

export const Default = PaginationStory.bind({});

Default.args = {
  totalPages: 10,
  edgePageCount: 2,
  middlePagesSiblingCount: 1,
  truncableText: "...",
  truncableClassName: "",
};
