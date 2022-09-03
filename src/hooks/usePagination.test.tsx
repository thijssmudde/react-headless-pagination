import { renderHook } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

const mockSetCurrentPage = jest.fn();

describe("usePagination", () => {
  it("Pagination example 1, inspect initial state", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current).toStrictEqual({
      currentPage: 0,
      hasNextPage: true,
      hasPreviousPage: false,
      isNextTruncable: true,
      isPreviousTruncable: false,
      middlePages: [1, 2, 3],
      nextPages: [9, 10],
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      previousPages: [],
      setCurrentPage: mockSetCurrentPage,
      truncableClassName: "",
      truncableText: "...",
    });
  });

  it("Pagination example 2, set page to last", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current).toStrictEqual({
      currentPage: 10,
      hasNextPage: false,
      hasPreviousPage: true,
      isNextTruncable: false,
      isPreviousTruncable: true,
      middlePages: [8, 9, 10],
      nextPages: [],
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      previousPages: [1, 2],
      setCurrentPage: mockSetCurrentPage,
      truncableClassName: "",
      truncableText: "...",
    });
  });

  it("Pagination example 3", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 5,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current).toStrictEqual({
      currentPage: 5,
      hasNextPage: true,
      hasPreviousPage: true,
      isNextTruncable: true,
      isPreviousTruncable: true,
      middlePages: [5, 6, 7],
      nextPages: [9, 10],
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      previousPages: [1, 2],
      setCurrentPage: mockSetCurrentPage,
      truncableClassName: "",
      truncableText: "...",
    });
  });

  it("Pagination example 4: edgePageCount 2 and middlePagesSiblingCount 0", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 100,
        edgePageCount: 2,
        middlePagesSiblingCount: 0,
      }),
    );

    const paginationResult = {
      ...result.current,
      pages: undefined,
    };

    expect(paginationResult).toStrictEqual({
      currentPage: 50,
      hasNextPage: true,
      hasPreviousPage: true,
      isNextTruncable: true,
      isPreviousTruncable: true,
      middlePages: [51],
      nextPages: [99, 100],
      pages: undefined,
      previousPages: [1, 2],
      setCurrentPage: mockSetCurrentPage,
      truncableClassName: "",
      truncableText: "...",
    });
  });

  it("Edge case: 0 pages", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 0,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current).toStrictEqual({
      currentPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      isNextTruncable: false,
      isPreviousTruncable: false,
      middlePages: [],
      nextPages: [],
      pages: [],
      previousPages: [],
      setCurrentPage: mockSetCurrentPage,
      truncableClassName: "",
      truncableText: "...",
    });
  });

  it("Edge case: 1000 pages", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 42,
        setCurrentPage: jest.fn(),
        totalPages: 1000,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    const paginationResult = {
      ...result.current,
      pages: undefined,
    };

    expect(JSON.stringify(paginationResult)).toStrictEqual(
      JSON.stringify({
        currentPage: 42,
        truncableText: "...",
        truncableClassName: "",
        hasPreviousPage: true,
        hasNextPage: true,
        previousPages: [1, 2],
        isPreviousTruncable: true,
        middlePages: [42, 43, 44],
        isNextTruncable: true,
        nextPages: [999, 1000],
      }),
    );
  });

  it("Edge case: only 2 pages", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 2,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    const paginationResult = {
      ...result.current,
      pages: undefined,
    };

    expect(JSON.stringify(paginationResult)).toStrictEqual(
      JSON.stringify({
        currentPage: 0,
        truncableText: "...",
        truncableClassName: "",
        hasPreviousPage: false,
        hasNextPage: true,
        previousPages: [],
        isPreviousTruncable: false,
        middlePages: [1, 2],
        isNextTruncable: false,
        nextPages: [],
      }),
    );
  });

  it("Edge case: edgePageCount 5 and middlePagesSiblingCount 10", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: jest.fn(),
        totalPages: 100,
        edgePageCount: 5,
        middlePagesSiblingCount: 10,
      }),
    );

    const paginationResult = {
      ...result.current,
      pages: undefined,
    };

    expect(JSON.stringify(paginationResult)).toStrictEqual(
      JSON.stringify({
        currentPage: 50,
        truncableText: "...",
        truncableClassName: "",
        hasPreviousPage: true,
        hasNextPage: true,
        previousPages: [1, 2, 3, 4, 5],
        isPreviousTruncable: true,
        middlePages: [
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
          58, 59, 60, 61,
        ],
        isNextTruncable: true,
        nextPages: [96, 97, 98, 99, 100],
        pages: undefined,
        setCurrentPage: mockSetCurrentPage,
      }),
    );
  });
});
