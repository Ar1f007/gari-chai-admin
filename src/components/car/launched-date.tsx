"use client";

import { ChangeEvent, FocusEvent, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { Input } from "../ui/input";
import dayjs from "@/lib/dayjs";
const LaunchedDate = () => {
  const { setValue, control } = useFormContext();

  const selectedDate = useWatch({
    name: "launchedAt",
  });

  useEffect(() => {
    setValue("launchedAt", new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLaunchDate(e: FocusEvent<HTMLInputElement, Element>) {
    const [hour, min] = e.target.value.split(":");
    const selectedDateTime = dayjs(selectedDate);

    const newDate = selectedDateTime.set("hour", +hour).set("minute", +min);

    setValue("launchedAt", newDate.toDate());
  }

  function getTime() {
    const hour = dayjs(selectedDate).get("hour");
    const min = dayjs(selectedDate).get("minute");

    return hour + ":" + min;
  }

  return (
    <div className="max-w-sm">
      <FormField
        control={control}
        name="launchedAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>
              Launch Date {selectedDate <= Date.now() ? "(now)" : ""}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {selectedDate ? (
                      dayjs(selectedDate).format("MMM D, YYYY h:mm A")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                  }
                  footer={
                    <Input
                      type="time"
                      defaultValue={getTime()}
                      onBlur={(e) => setLaunchDate(e)}
                    />
                  }
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select a date in the future if you want to launch it later
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default LaunchedDate;
