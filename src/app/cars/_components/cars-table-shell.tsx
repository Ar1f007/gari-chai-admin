"use client";

import { TCarSchema } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useTransition } from "react";
import {
  fetchCarsTableColumnDefs,
  filterableColumns,
  searchableColumns,
  initialColumnVisibility,
} from "./cars-table-column-def";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import {
  CarsTableFloatingBarContent,
  deleteSelectedRows,
} from "./cars-table-actions";

type CarsTableShellProps = {
  data: TCarSchema[];
  pageCount: number;
};

export const CarsTableShell = ({ data, pageCount }: CarsTableShellProps) => {
  const [isPending, startTransition] = useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<TCarSchema, unknown>[]>(
    () => fetchCarsTableColumnDefs(isPending, startTransition),
    [isPending]
  );

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
    filterableColumns,
    searchableColumns,
    initialColumnVisibility,
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
      searchableColumns={searchableColumns}
      // Render floating action controls at the bottom of the table on Row selection
      // floatingBarContent={CarsTableFloatingBarContent(dataTable)}
      // Delete selected rows
      deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  );
};
