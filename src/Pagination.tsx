import React, { FC } from "react";
import classNames from "classnames";
import usePagination from "./hooks/usePagination";
import {
  IPagination,
  IPaginationProps,
  ButtonProps,
  PageButtonProps,
} from "./Pagination.d";

export const PrevButton: FC<ButtonProps> = ({
  className,
  children,
  ...buttonProps
}) => {
  const pagination: IPagination = React.useContext(PaginationContext);
  const previous = () => {
    if (pagination.currentPage + 1 > 1) {
      pagination.setCurrentPage(pagination.currentPage - 1);
    }
  };

  return (
    <button
      className={className}
      {...buttonProps}
      onClick={() => previous()}
      disabled={pagination.currentPage === 0}
    >
      {children}
    </button>
  );
};

export const NextButton: FC<ButtonProps> = ({
  className,
  children,
  ...buttonProps
}) => {
  const pagination: IPagination = React.useContext(PaginationContext);
  const next = () => {
    if (pagination.currentPage + 1 < pagination.pages.length) {
      pagination.setCurrentPage(pagination.currentPage + 1);
    }
  };

  return (
    <button
      className={className}
      {...buttonProps}
      onClick={() => next()}
      disabled={pagination.currentPage === pagination.pages.length - 1}
    >
      {children}
    </button>
  );
};

interface ITruncableElementProps {
  prev?: boolean;
}

export const TruncableElement: FC<ITruncableElementProps> = ({ prev }) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const {
    isPreviousTruncable,
    isNextTruncable,
    truncableText = "...",
    truncableClassName = "",
  } = pagination;

  return (isPreviousTruncable && prev === true) ||
    (isNextTruncable && !prev) ? (
    <span className={truncableClassName}>{truncableText}</span>
  ) : null;
};

export const PageButton: FC<PageButtonProps> = ({
  className,
  activeClassName = "",
  inactiveClassName = "",
}) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const renderPageButton = (page: number) => (
    <span
      key={page}
      className={classNames(className, {
        [activeClassName]: pagination.currentPage + 1 === page,
        [inactiveClassName]: pagination.currentPage + 1 !== page,
      })}
      onClick={() => pagination.setCurrentPage(page - 1)}
    >
      {page}
    </span>
  );

  return (
    <>
      {pagination.previousPages.map(renderPageButton)}
      <TruncableElement prev />
      {pagination.middlePages.map(renderPageButton)}
      <TruncableElement />
      {pagination.nextPages.map(renderPageButton)}
    </>
  );
};

const defaultState: IPagination = {
  currentPage: 0,
  setCurrentPage: () => {},
  truncableText: "...",
  truncableClassName: "",
  pages: [],
  hasPreviousPage: false,
  hasNextPage: false,
  previousPages: [],
  isPreviousTruncable: false,
  middlePages: [],
  isNextTruncable: false,
  nextPages: [],
};

const PaginationContext: React.Context<IPagination> =
  React.createContext(defaultState);

export const Pagination = (paginationProps: IPaginationProps) => {
  const pagination = usePagination(paginationProps);

  return (
    <PaginationContext.Provider value={pagination}>
      <div className={paginationProps.className}>
        {paginationProps.children}
      </div>
    </PaginationContext.Provider>
  );
};

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;
Pagination.PageButton = PageButton;
