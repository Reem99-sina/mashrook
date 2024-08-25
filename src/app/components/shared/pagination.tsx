/* eslint-disable react/display-name */
"use client";

import clsx from "clsx";
import ReactPaginate from "react-paginate";
import { memo } from "react";
import { Arrow } from "@/app/assets/svg";

const itemContainerClassName = clsx(
  "mx-1 flex h-9 w-9 items-center justify-center",
  "rounded border border-border bg-bg text-text",
  "hover:bg-secondary"
);

const itemClassName = clsx(
  "w-full text-center flex items-center justify-center"
);

interface Props {
  onPageChange: (page: number) => void;
  pageCount: number;
  initialPage?: number;
  className?: string;
}

const Pagination: React.FC<Props> = memo(
  ({ onPageChange, pageCount, initialPage = 1 }) => {
    return (
      <ReactPaginate
        initialPage={initialPage - 1}
        nextLabel={
          <div className="flex flex-row items-center justify-center gap-1">
            <Arrow rotate={360} className="rotate-180" fill="#3B73B9" />
          </div>
        }
        previousLabel={
          <div className="flex flex-row items-center justify-center gap-1">
            <Arrow />
          </div>
        }
        onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex flex-row items-center justify-center text-[#3B73B9]"
        breakClassName="mb-2 text-pastel2 mx-1"
        pageClassName={clsx(
          itemContainerClassName,
          "border-[#DCDFE4] hover:bg-[#3B73B9] hover:bg-opacity-30"
        )}
        pageLinkClassName={itemClassName}
        nextClassName={clsx(
          itemContainerClassName,
          "bg-[#F4F6F9] w-[80px] h-[30px] border-0 "
        )}
        nextLinkClassName={clsx(itemClassName, "text-bg")}
        previousClassName={clsx(
          itemContainerClassName,
          "bg-[#F4F6F9] w-[80px] h-[30px] border-0 "
        )}
        previousLinkClassName={clsx(itemClassName, "text-bg")}
        activeClassName="bg-[#3B73B9]  border-0"
        activeLinkClassName="text-white"
        disabledLinkClassName={"cursor-not-allowed"}
        disabledClassName="opacity-30 "
      />
    );
  }
);

export default Pagination;
