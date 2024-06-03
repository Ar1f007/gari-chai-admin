import { TCarPartSchema } from "@/schemas/parts";
import { Row } from "@tanstack/react-table";
import { Fragment, TransitionStartFunction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { endpoints } from "@/services";

type CarPartRowActionsProps = {
  row: Row<TCarPartSchema>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

export const CarPartRowActions = ({
  row,
  isPending,
  startTransition,
}: CarPartRowActionsProps) => {
  const carPart = row.original;

  function handleViewDetails() {
    const pathname = endpoints.ui.baseUrl + "/parts/cars/" + carPart.slug;

    return pathname;
  }

  function handleEdit() {
    const pathname = "/parts/edit/" + carPart.slug;
    return pathname;
  }

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem onClick={handleViewDetails}>
            <Link
              href={handleViewDetails()}
              target="_blank"
              className="w-full block"
            >
              View details
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer w-full block">
            <Link href={handleEdit()}>Edit</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
