"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useTransition } from "react";
import {
  fetchUsersTableColumnDefs,
  filterableColumns,
  searchableColumns,
  initialColumnVisibility,
} from "./users-table-column-def";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import {
  UsersTableFloatingBarContent,
  deleteSelectedRows,
} from "./users-table-actions";
import { TAuthBasicUserInfo } from "@/schemas/user";

type UsersTableShellProps = {
  data: TAuthBasicUserInfo[];
  pageCount: number;
};

export const UsersTableShell = ({ data, pageCount }: UsersTableShellProps) => {
  const [isPending, startTransition] = useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<TAuthBasicUserInfo, unknown>[]>(
    () => fetchUsersTableColumnDefs(isPending, startTransition),
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
