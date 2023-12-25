import * as React from "react";
// import { tasks, type Task } from "@/db/schema";
// import {
//   ArrowUpIcon,
//   CheckCircledIcon,
//   TrashIcon,
// } from "@radix-ui/react-icons";
import { SelectTrigger } from "@radix-ui/react-select";
import { type Table } from "@tanstack/react-table";
import { toast } from "sonner";

import { catchError } from "@/lib/catch-error";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

// import {
//   deleteTask,
//   updateTaskPriority,
//   updateTaskStatus,
// } from "../_actions/actions";
import { TCarSchema } from "@/services";
import { ArrowUpIcon, CheckCircleIcon, Trash2Icon } from "lucide-react";

export function deleteSelectedRows(
  table: Table<TCarSchema>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  event?.preventDefault();
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: TCarSchema;
  }[];
  // toast.promise(
  //   Promise.all(
  //     selectedRows.map(async (row) =>
  //       deleteTask({
  //         id: row.original._id,
  //       })
  //     )
  //   ),
  //   {
  //     loading: "Deleting...",
  //     success: () => {
  //       return "Tasks deleted successfully.";
  //     },
  //     error: (err: unknown) => {
  //       return catchError(err);
  //     },
  //   }
  // );
}

export function updateTasksStatus(table: Table<TCarSchema>, status: string) {
  const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: TCarSchema;
  }[];

  // selectedRows.map(async (row) => {
  //   await updateTaskStatus({
  //     id: row.original._id,
  //     status: status as TCarSchema["status"],
  //   });
  // });
}

export function updateTasksPriority(
  table: Table<TCarSchema>,
  priority: string
) {
  const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: TCarSchema;
  }[];

  // selectedRows.map(async (row) => {
  //   await updateTaskPriority({
  //     id: row.original._id,
  //     priority: priority as TCarSchema[""],
  //   });
  // });
}

export function TasksTableFloatingBarContent(table: Table<TCarSchema>) {
  return (
    <div className="justify-between gap-2 align-middle">
      <Select onValueChange={(value) => updateTasksStatus(table, value)}>
        <SelectTrigger asChild>
          <Button
            aria-label="Delete selected rows"
            title="Status"
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <CheckCircleIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </SelectTrigger>
        <SelectContent align="center">
          {/* <SelectGroup>
            {tasks.status.enumValues.map((status) => (
              <SelectItem
                key={status}
                value={status}
                className="capitalize"
              >
                {status}
              </SelectItem>
            ))}
          </SelectGroup> */}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateTasksPriority(table, value)}>
        <SelectTrigger asChild>
          <Button
            title="Priority"
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <ArrowUpIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </SelectTrigger>
        <SelectContent align="center">
          {/* <SelectGroup>
            {tasks.priority.enumValues.map((priority) => (
              <SelectItem
                key={priority}
                value={priority}
                className="capitalize"
              >
                {priority}
              </SelectItem>
            ))}
          </SelectGroup> */}
        </SelectContent>
      </Select>
      <Button
        title="Delete"
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false);
          deleteSelectedRows?.(table, event);
        }}
      >
        <Trash2Icon
          className="h-4 w-4"
          aria-hidden="true"
        />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
