"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";

// Icons
import { InfoIcon, Loader2Icon } from "lucide-react";

// Services
import {
  TAddNewBrandModelPayload,
  addBrandModel,
} from "@/services/brands/addBrandModel";
import { toast } from "sonner";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { TAGS, invalidateAdminCache } from "@/services";

// Schemas
import { CarModelInputs, addCarModelSchema } from "@/schemas/car-model";

// Shared Components
import SelectBrand from "@/components/shared/brand/select-brand";

const defaultValues: Partial<CarModelInputs> = {
  name: "",
  upcoming: false,
};

const AddModel = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<CarModelInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addCarModelSchema),
    defaultValues,
  });

  async function onSubmit(data: CarModelInputs) {
    const payload: TAddNewBrandModelPayload = {
      ...data,
      brand: data.brand.value,
    };

    const res = await addBrandModel(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, form);
      return;
    }

    if (res.status === "success") {
      toast.success("Added successfully");
      invalidateAdminCache([TAGS.brandModelList]);

      onSuccess();
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-8 px-4 bg-muted rounded border"
        >
          <SelectBrand
            name="brandId"
            label="Pick Brand *"
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name *</FormLabel>
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

                      <PopoverContent className="max-w-80 bg-background p-5 rounded">
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
