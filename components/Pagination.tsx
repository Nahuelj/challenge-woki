"use client";
import Link from "next/link";

interface PaginationProps {
  movieId: number;
  actualPage: number;
  totalPages: number;
}

export const Pagination = ({
  actualPage,
  totalPages,
  movieId,
}: PaginationProps) => {
  return (
    <div className="flex flex-col items-center my-20">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {actualPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>{" "}
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <Link
          href={`/detail/${movieId}?similarMoviesPage=${
            actualPage > 1 ? actualPage - 1 : 0
          }`}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </Link>
        <Link
          href={`/detail/${movieId}?similarMoviesPage=${
            actualPage < totalPages ? actualPage + 1 : totalPages
          }`}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </Link>
      </div>
    </div>
  );
};
