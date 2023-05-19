import { Fragment } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "~/icons";

type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages = 10,
  onChangePage,
}: PaginationProps) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  return (
    <Fragment>
      <div className="flex justify-center items-center mt-8 mb-1 rounded-full">
        <button
          className="px-4 py-2 rounded-l-full flex items-center border-r border-primary justify-start bg-tertiary group enabled:hover:bg-btn w-20 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-1 focus-visible:ring-blue-500"
          disabled={isPrevDisabled}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <ArrowLeftIcon
            className={`h-4 w-4 text-icon ${
              !isPrevDisabled ? "group-hover:text-btn" : ""
            }`}
          />
          <span
            className={`text-sm font-normal font-sans text-secondary ${
              !isPrevDisabled ? "group-hover:text-btn" : ""
            } ml-1`}
          >
            Prev
          </span>
        </button>
        <button
          className="px-4 py-2 rounded-r-full flex items-center justify-end bg-tertiary group enabled:hover:bg-btn w-20 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-1 focus-visible:ring-blue-500"
          disabled={isNextDisabled}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <span
            className={`text-sm font-normal font-sans text-secondary ${
              !isNextDisabled ? "group-hover:text-btn" : ""
            } mr-1`}
          >
            Next
          </span>
          <ArrowRightIcon
            className={`h-4 w-4 text-icon ${
              !isNextDisabled ? "group-hover:text-btn" : ""
            }`}
          />
        </button>
      </div>
      <p className="text-center text-secondary text-sm mb-3 font-sans">
        Page {currentPage} of {totalPages}
      </p>
    </Fragment>
  );
};

export default Pagination;
