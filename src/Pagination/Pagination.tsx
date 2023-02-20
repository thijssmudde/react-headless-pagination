import React from "react";
import classNames from "classnames";
import usePagination from "../Hooks/usePagination";
import {
  IPagination,
  IPaginationProps,
  ButtonProps,
  PageButtonProps,
} from "../types/types";

export const PrevButton = ({
  className,
  children,
  dataTestId,
  as = <button />,
  ...buttonProps
}: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
  const previous = () => {
    if (pagination.currentPage + 1 > 1) {
      pagination.setCurrentPage(pagination.currentPage - 1);
    }
  };

  return (
    <as.type
      {...buttonProps}
      {...as.props}
      className={classNames(className, as.props.className)}
      onClick={() => previous()}
      disabled={pagination.currentPage === 0}
      data-testid={dataTestId}
    >
      {children}
    </as.type>
  );
};

export const NextButton = ({
  className,
  children,
  dataTestId,
  as = <button />,
  ...buttonProps
}: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
  const next = () => {
    if (pagination.currentPage + 1 < pagination.pages.length) {
      pagination.setCurrentPage(pagination.currentPage + 1);
    }
  };

  return (
    <as.type
      {...buttonProps}
      {...as.props}
      className={classNames(className, as.props.className)}
      onClick={() => next()}
      disabled={pagination.currentPage === pagination.pages.length - 1}
      data-testid={dataTestId}
    >
      {children}
    </as.type>
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
    <li className={truncableClassName || undefined}>{truncableText}</li>
  ) : null;
};

export const PageButton = ({
  as = <a />,
  className,
  dataTestIdActive,
  dataTestIdInactive,
  activeClassName,
  inactiveClassName,
}: PageButtonProps) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const renderPageButton = (page: number) => (
    <li key={page}>
      <as.type
        data-testid={
          classNames({
            [`${dataTestIdActive}`]:
              dataTestIdActive && pagination.currentPage + 1 === page,
            [`${dataTestIdInactive}-${page}`]:
              dataTestIdActive && pagination.currentPage + 1 !== page,
          }) || undefined
        }
        tabIndex={0}
        onKeyPress={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            pagination.setCurrentPage(page - 1);
          }
        }}
        onClick={() => pagination.setCurrentPage(page - 1)}
        className={classNames(
          className,
          pagination.currentPage + 1 === page
            ? activeClassName
            : inactiveClassName,
        )}
        {...as.props}
      >
        {page}
      </as.type>
    </li>
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
  React.createContext<IPagination>(defaultState);

export const Pagination = ({
  dataTestId,
  ...paginationProps
}: IPaginationProps & { dataTestId?: string }) => {
  const pagination = usePagination(paginationProps);

  return (
    <PaginationContext.Provider value={pagination}>
      <div className={paginationProps.className} data-testid={dataTestId}>
        {paginationProps.children}
      </div>
    </PaginationContext.Provider>
  );
};

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;
Pagination.PageButton = PageButton;
