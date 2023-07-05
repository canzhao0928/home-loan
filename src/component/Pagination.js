export default function Pagination({
  totalPages,
  currenPage,
  handlePagechange,
}) {
  const handlePre = () => {
    handlePagechange(currenPage - 1);
  };

  const handleNext = () => {
    handlePagechange(currenPage + 1);
  };
  return (
    <nav aria-label="Page navigation" className="flex justify-center m-3">
      <ul className="inline-flex -space-x-px text-sm">
        <li
          onClick={handlePre}
          className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </li>
        <li className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          1
        </li>
        <li
          onClick={handleNext}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </li>
      </ul>
    </nav>
  );
}
