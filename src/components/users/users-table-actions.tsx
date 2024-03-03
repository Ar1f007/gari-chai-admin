import * as React from "react";

import { SelectTrigger } from "@radix-ui/react-select";
import { type Table } from "@tanstack/react-table";
import { toast } from "sonner";

import { catchError } from "@/lib/catch-error";
import { Button } from "@/components/ui/button";
import { Select, SelectContent } from "@/components/ui/select";

import { TAGS, invalidateAdminCache } from "@/services";
import { ArrowUpIcon, CheckCircleIcon, Trash2Icon } from "lucide-react";
import { TAuthBasicUserInfo } from "@/schemas/user";

export async function deleteSelectedRows(
  table: Table<TAuthBasicUserInfo>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  event?.preventDefault();
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: TAuthBasicUserInfo;
  }[];

  // try {
  //   const data = await Promise.all(
  //     selectedRows.map(
  //       async (row) =>
  //         // await deleteCar({
  //         //   doc: row.original,
  //         // })
  //     // )
  //   );

  //   const atLeastOneCarGotDeleted = data.some(
  //     (car) => car.status === "success"
  //   );

  //   if (atLeastOneCarGotDeleted) {
  //     invalidateAdminCache([
  //       TAGS.cars,
  //       TAGS.allHomeSettings,
  //       TAGS.brands,
  //       TAGS.brandModelList,
  //     ]);
  //   }

  //   data.map((res) => {
  //     if (res.status !== "success") {
  //       toast.error(res.message);
  //     }
  //   });

  //   const couldNotDeleteAllSelectedRows = data.some(
  //     (res) => res.status !== "success"
  //   );

  //   if (couldNotDeleteAllSelectedRows) {
  //     return;
  //   }

  //   toast.success("Car deleted successfully");
  // } catch (err: unknown) {
  //   catchError(err);
  // }
}

export function updateTasksStatus(
  table: Table<TAuthBasicUserInfo>,
  status: string
) {
  const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: TAuthBasicUserInfo;
  }[];

  // selectedRows.map(async (row) => {
  //   await updateTaskStatus({
  //     id: row.original._id,
  //     status: status as TAuthBasicUserInfo["status"],
  //   });
  // });
}

export function updateTasksPriority(
  table: Table<TAuthBasicUserInfo>,
  priority: string
) {
  const selectedRows = table.getFilteredSelectedRowModel().rows as unknown as {
    original: TAuthBasicUserInfo;
  }[];

  // selectedRows.map(async (row) => {
  //   await updateTaskPriority({
  //     id: row.original._id,
  //     priority: priority as TAuthBasicUserInfo[""],
  //   });
  // });
}

export function UsersTableFloatingBarContent(table: Table<TAuthBasicUserInfo>) {
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
