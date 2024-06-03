"use client";

import { TCarPartSchema } from "@/schemas/parts";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useTransition } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import {
  deleteSelectedRows,
  fetchCarPartsTableColumnDefs,
  searchableColumns,
} from "./car-parts-table-col-def";

type CarPartsTableShellProps = {
  data: TCarPartSchema[];
  pageCount: number;
};

export const CarPartsTableShell = ({
  data,
  pageCount,
}: CarPartsTableShellProps) => {
  const [isPending, startTransition] = useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<TCarPartSchema, unknown>[]>(
    () => fetchCarPartsTableColumnDefs(isPending, startTransition),
    [isPending]
  );

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
    // filterableColumns,
    searchableColumns,
    // initialColumnVisibility,
  });

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      // Render notion like filters
      advancedFilter={false}
      // Render dynamic faceted filters
      // filterableColumns={filterableColumns}
      // Render dynamic searchable filters
      searchableColumns={searchableColumns}
      // Render floating action controls at the bottom of the table on Row selection
      // floatingBarContent={CarsTableFloatingBarContent(dataTable)}
      // Delete selected rows
      deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  );
};
