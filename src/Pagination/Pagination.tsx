import React from "react";
import classNames from "classnames";
import usePagination from "../Hooks/usePagination";
import {
  IPagination,
  IPaginationProps,
  ButtonProps,
  PageButtonProps,
} from "./Pagination.d";

export const PrevButton = ({
  className,
  children,
  dataTestId,
  ...buttonProps
}: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
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

export const NextButton = ({
  className,
  children,
  dataTestId,
  ...buttonProps
}: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
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

type ITruncableElementProps = {
  prev?: boolean;
};

const TruncableElement = ({ prev }: ITruncableElementProps) => {
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

export const PageButton = ({
  as = <button />,
  className,
  dataTestIdActive,
  dataTestIdInactive,
  activeClassName,
  inactiveClassName,
}: PageButtonProps) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const renderPageButton = (page: number) => (
    <as.type
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
      {...as.props}
    >
      {page}
    </as.type>
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
  setCurrentPage: () => { },
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
  React.createContext<IPagination>(defaultState);

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
