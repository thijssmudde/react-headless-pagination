import React, { FC } from "react";
import classNames from "classnames";
import usePagination from "../__Hooks/usePagination";
import {
  IPagination,
  IPaginationProps,
  ButtonProps,
  PageButtonProps,
} from "./Pagination.d";

export const PrevButton: FC<ButtonProps> = ({
  className,
  children,
  dataTestId,
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
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

export const NextButton: FC<ButtonProps> = ({
  className,
  children,
  dataTestId,
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
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

interface ITruncableElementProps {
  prev?: boolean;
}

const TruncableElement: FC<ITruncableElementProps> = ({ prev }) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const {
    isPreviousTruncable,
    isNextTruncable,
    truncableText,
    truncableClassName,
  } = pagination;

  return (isPreviousTruncable && prev === true) ||
    (isNextTruncable && !prev) ? (
    <span className={truncableClassName || undefined}>{truncableText}</span>
  ) : null;
};

export const PageButton: FC<PageButtonProps> = ({
  className,
  dataTestIdActive,
  dataTestIdInactive,
  activeClassName,
  inactiveClassName,
}) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const renderPageButton = (page: number) => (
    <span
      key={page}
      data-testid={
        classNames({
          [`${dataTestIdActive}-page-button`]:
            dataTestIdActive && pagination.currentPage + 1 === page,
          [`${dataTestIdInactive}-page-button-${page}`]:
            dataTestIdActive && pagination.currentPage + 1 !== page,
        }) || undefined
      }
      onClick={() => pagination.setCurrentPage(page - 1)}
      className={
        classNames(
          className,
          pagination.currentPage + 1 === page
            ? activeClassName
            : inactiveClassName,
        ) || undefined
      }
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
