import { DataTableColumnHeader } from "@/components/shared/data-table/data-column-header";

export const columns = [
  {
    accessorKey: "email",
    header: ({ column }: any) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
  },
];
