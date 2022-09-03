import { ButtonHTMLAttributes } from "react";

interface IBasePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  truncableText?: string;
  truncableClassName?: string;
}

interface IPaginationProps extends IBasePaginationProps {
  totalPages: number;
  edgePageCount: number;
  middlePagesSiblingCount: number;
  className?: string;
  children?: React.ReactNode;
}

interface IUsePagination extends IBasePaginationProps {
  pages: number[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPages: number[];
  isPreviousTruncable: boolean;
  middlePages: number[];
  isNextTruncable: boolean;
  nextPages: number[];
}

interface IPagination extends IUsePagination {
  setCurrentPage: (page: number) => void;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode;
  className?: string;
  dataTestId?: string;
}

interface PageButtonProps extends ButtonProps {
  activeClassName?: string;
  inactiveClassName?: string;
  dataTestIdActive?: string;
  dataTestIdInactive?: string;
}

export {
  IPaginationProps,
  IUsePagination,
  IPagination,
  ButtonProps,
  PageButtonProps,
};
