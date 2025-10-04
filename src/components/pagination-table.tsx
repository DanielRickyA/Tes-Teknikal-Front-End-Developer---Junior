"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationTableProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

function PaginationTable({ page, total, onPageChange }: PaginationTableProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-sm text-muted-foreground">Showing</span>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page - 10);
                }}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-1">
                Previous
              </span>
            )}
          </PaginationItem>
          <p>
            {page + 10 > total ? (page = total) : page + 10} / {total}
          </p>
          <PaginationItem>
            {page < total ? (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page + 10 > total ? (page = total) : page + 10);
                }}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-1">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationTable;
