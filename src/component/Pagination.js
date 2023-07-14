import { useMemo } from "react";

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  handlePagechange,
}) {
  const paginationRange = useMemo(() => {
    let totalPage = Math.ceil(totalCount / pageSize);
    let array = [];
    for (let index = 1; totalPage > 0; totalPage--) {
      array.push(index);
      index++;
    }
    return array;
  }, [totalCount, pageSize]);

  const handlePre = () => {
    handlePagechange(currentPage - 1);
  };

  const handleNext = () => {
    handlePagechange(currentPage + 1);
  };
  return (
    <nav aria-label="Page navigation" className="flex justify-center m-3">
      <ul className="inline-flex -space-x-px text-sm">
        {currentPage !== 1 && (
          <li
            onClick={handlePre}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </li>
        )}
        {paginationRange.map((page) => {
          return (
            <li
              onClick={() => {
                handlePagechange(page);
              }}
              key={page}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {page}
            </li>
          );
        })}
        {currentPage !== paginationRange.length && (
          <li
            onClick={handleNext}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </li>
        )}
      </ul>
    </nav>
  );
}
