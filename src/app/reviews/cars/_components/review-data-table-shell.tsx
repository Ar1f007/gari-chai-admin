"use client";

import * as React from "react";
import { TVendorSchema } from "@/schemas/vendor";
import {
  fetchReviewTableColumns,
  filterableColumns,
} from "./reviews-column-def";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SelectPageSize } from "@/components/shared/select-page-size";
import { TCarsReview } from "@/schemas/reviews";
import { DataTable } from "@/components/shared/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";

type CarReviewsTableShellProps = {
  data: TCarsReview[];
  pageCount: number;
};

const ReviewDataTableShell = ({
  data,
  pageCount,
}: CarReviewsTableShellProps) => {
  const [isPending, startTransition] = React.useTransition();
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<TCarsReview, unknown>[]>(
    () => fetchReviewTableColumns(isPending, startTransition),
    [isPending]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
    filterableColumns,
    //searchableColumns,
    //initialColumnVisibility,
  });

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      // Render notion like filters
      advancedFilter={false}
      // Render dynamic faceted filters
      filterableColumns={filterableColumns}
      // Render dynamic searchable filters
      searchableColumns={[]}
      // Render floating action controls at the bottom of the table on Row selection
      // floatingBarContent={CarsTableFloatingBarContent(dataTable)}
      // Delete selected rows
      deleteRowsAction={(event) => {}}
    />
  );
};
export default ReviewDataTableShell;
