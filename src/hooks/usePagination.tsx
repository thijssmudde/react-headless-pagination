import React from "react";
import { IPaginationProps, IPagination } from "../Pagination.d";

const usePagination = ({
  initialPage,
  totalPages,
  edgePageCount = 2,
  middlePagesSiblingCount = 1,
}: IPaginationProps): IPagination => {
  const pages = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1);

  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const isReachedToFirst = currentPage <= middlePagesSiblingCount;
  const isReachedToLast = currentPage + middlePagesSiblingCount >= totalPages;

  const middlePages = React.useMemo(() => {
    const middlePageCount = middlePagesSiblingCount * 2 + 1;
    if (isReachedToFirst) {
      return pages.slice(0, middlePageCount);
    }
    if (isReachedToLast) {
      return pages.slice(-middlePageCount);
    }
    return pages.slice(
      currentPage - middlePagesSiblingCount - 1,
      currentPage + middlePagesSiblingCount,
    );
  }, [currentPage, pages]);

  const getAllPreviousPages = () => {
    return pages.slice(0, middlePages[0] - 1);
  };

  const previousPages = React.useMemo(() => {
    if (isReachedToFirst) {
      return [];
    }
    if (getAllPreviousPages().length < 1) {
      return [];
    }
    return pages
      .slice(0, edgePageCount)
      .filter((p) => !middlePages.includes(p));
  }, [currentPage, pages]);

  const getAllNextPages = React.useMemo(() => {
    return pages.slice(
      middlePages[middlePages.length - 1],
      pages[pages.length],
    );
  }, [pages, middlePages]);

  const nextPages = React.useMemo(() => {
    if (isReachedToLast) {
      return [];
    }
    if (getAllNextPages.length < 1) {
      return [];
    }
    return pages
      .slice(pages.length - edgePageCount, pages.length)
      .filter((p) => !middlePages.includes(p));
  }, [middlePages, pages]);

  const isPreviousTruncable = React.useMemo(() => {
    return (
      previousPages.filter(
        (p) => !previousPages.includes(p) && !middlePages.includes(p),
      ).length > 0
    );
  }, [previousPages, middlePages]);

  const isNextTruncable = React.useMemo(() => {
    return (
      nextPages.filter(
        (p) => !nextPages.includes(p) && !middlePages.includes(p),
      ).length > 0
    );
  }, [nextPages, middlePages]);

  return {
    currentPage,
    pages,
    hasPreviousPage,
    hasNextPage,
    previousPages,
    isPreviousTruncable,
    middlePages,
    isNextTruncable,
    nextPages,
    setCurrentPage,
  };
};

export default usePagination;
