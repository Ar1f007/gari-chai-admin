"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactSelect } from "@/components/ui/react-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CarModelInputs, carModelSchema } from "@/schemas/car-model";
import SelectBrand from "@/components/shared/brand/select-brand";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover } from "@radix-ui/react-popover";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const defaultValues: Partial<CarModelInputs> = {
  model: "",
  upcoming: false,
};

const AddModel = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<CarModelInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(carModelSchema),
    defaultValues,
  });

  async function onSubmit(data: CarModelInputs) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-8 px-4 bg-muted rounded border"
        >
          <SelectBrand />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. Harrier"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="upcoming"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2 items-center flex-wrap">
                    <Switch
                      id="upcoming"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=unchecked]:bg-primary/20"
                    />
                    <Label
                      htmlFor="upcoming"
                      className="cursor-pointer"
                    >
                      {field.value
                        ? "Marked as upcoming model"
                        : "Marked as existing model"}
                    </Label>

                    <Popover>
                      <PopoverTrigger
                        asChild
                        className="cursor-pointer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <InfoIcon />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="max-w-80">
                        <p className="text-xs">
                          <span className="text-primary font-medium mr-2">
                            Upcoming:
                          </span>
                          The model is not launched yet
                        </p>

                        <p className="text-xs mt-4">
                          <span className="text-primary font-medium mr-2">
                            Existing:
                          </span>
                          It is already available
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AddModel;
