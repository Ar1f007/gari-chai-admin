"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../../UI/Form/TextInput";
import SelectBrand from "../../AddEditCar/SelectBrand";

import { FormProvider } from "../../UI/Form/FormProvider";
import {
  TAddNewBrandModelPayload,
  addBrandModel,
} from "@/services/brands/addBrandModel";
import { toast } from "sonner";
import { mapValidationErrors } from "@/util/mapValidationError";
import RHFSwitch from "../../UI/Form/RHFSwitch";
import Button from "../../UI/Form/Button";

const schema = z.object({
  brand: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "required", invalid_type_error: "select a brand" }
  ),
  model: z.string().min(1, "required"),
  upcoming: z.boolean().default(false),
});

type FormInputs = z.infer<typeof schema>;

type AddEditModelProps = {
  onClose: () => void;
};

const AddEditModel = ({ onClose }: AddEditModelProps) => {
  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormInputs) {
    const payload: TAddNewBrandModelPayload = {
      name: data.model,
      brandSlug: data.brand.value,
      upcoming: data.upcoming,
    };

    const res = await addBrandModel(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, methods);
      return;
    }

    if (res.status === "success") {
      toast.success("Added successfully");

      onClose();
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  return (
    <div className="flex flex-col gap-9 max-w-md">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Model</h3>
        </div>

        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 px-5 py-5 max-w-md">
            <SelectBrand label="Pick brand" />
            <TextInput
              name="model"
              label="Model Name"
              placeholder="eg. Harrier"
            />

            <RHFSwitch
              variant="two"
              name="upcoming"
              checkedText="Marked as upcoming model"
              unCheckedText="Marked as existing model"
            />

            <div className="flex gap-3">
              <Button
                loading={methods.formState.isSubmitting}
                type="submit"
                title="Add"
                classes="basis-2/4"
              />

              <button
                className="rounded w-full dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium"
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
export default AddEditModel;
