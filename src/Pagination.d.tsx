interface IPaginationProps {
  initialPage: number;
  totalPages: number;
  edgePageCount: number;
  middlePagesSiblingCount: number;
}

interface IPagination {
  currentPage: number;
  pages: number[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPages: number[];
  isPreviousTruncable: boolean;
  middlePages: number[];
  isNextTruncable: boolean;
  nextPages: number[];
  setCurrentPage: (page: number) => void;
}

export { IPaginationProps, IPagination };
