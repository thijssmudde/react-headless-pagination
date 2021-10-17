import usePagination from "./usePagination";
import { renderHook } from "@testing-library/react-hooks";

describe("usePagination", () => {
  it("Pagination example 1, inspect initial state", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([]);
    expect(result.current.isPreviousTruncable).toBe(false);
    expect(result.current.middlePages).toStrictEqual([1, 2, 3]);
    expect(result.current.isNextTruncable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([9, 10]);
  });

  it("Pagination example 2, set page to last", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current.currentPage).toBe(10);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([8, 9, 10]);
    expect(result.current.isNextTruncable).toBe(false);
    expect(result.current.nextPages).toStrictEqual([]);
  });

  it("Pagination example 3", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 5,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([5, 6, 7]);
    expect(result.current.isNextTruncable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([9, 10]);
  });

  it("Pagination example 4: edgePageCount 2 and middlePagesSiblingCount 0", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: jest.fn(),
        totalPages: 100,
        edgePageCount: 2,
        middlePagesSiblingCount: 0,
      }),
    );

    expect(result.current.currentPage).toBe(50);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([51]);
    expect(result.current.isNextTruncable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([99, 100]);
  });

  it("Edge case: 0 pages", () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 0,
        edgePageCount: 2,
        middlePagesSiblingCount: 1,
      }),
    );

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pages).toStrictEqual([]);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.previousPages).toStrictEqual([]);
    expect(result.current.isPreviousTruncable).toBe(false);
    expect(result.current.middlePages).toStrictEqual([]);
    expect(result.current.isNextTruncable).toBe(false);
    expect(result.current.nextPages).toStrictEqual([]);
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

    expect(result.current.currentPage).toBe(42);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([42, 43, 44]);
    expect(result.current.isNextTruncable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([999, 1000]);
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

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pages).toStrictEqual([1, 2]);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([]);
    expect(result.current.isPreviousTruncable).toBe(false);
    expect(result.current.middlePages).toStrictEqual([1, 2]);
    expect(result.current.isNextTruncable).toBe(false);
    expect(result.current.nextPages).toStrictEqual([]);
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

    expect(result.current.currentPage).toBe(50);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([1, 2, 3, 4, 5]);
    expect(result.current.isPreviousTruncable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
      59, 60, 61,
    ]);
    expect(result.current.isNextTruncable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([96, 97, 98, 99, 100]);
  });
});
