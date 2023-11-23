"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../../UI/Form/TextInput";

import { FormProvider } from "../../UI/Form/FormProvider";

import { toast } from "sonner";
import { mapValidationErrors } from "@/util/mapValidationError";
import { addCarBodyType } from "@/services/cars/addVehicleType";
import Button from "../../UI/Form/Button";
import { TAGS, invalidateAdminCache } from "@/services";

const schema = z.object({
  name: z.string().min(1, "Required"),
});

type FormInputs = z.infer<typeof schema>;

type AddEditVehicleBodyProps = {
  onClose: () => void;
};

const AddEditVehicleType = ({ onClose: onClose }: AddEditVehicleBodyProps) => {
  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormInputs) {
    const res = await addCarBodyType(data);

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

      invalidateAdminCache([TAGS.carBodyList]);

      onClose();
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  return (
    <div className="flex flex-col gap-9 max-w-md">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Vehicle Body
          </h3>
        </div>

        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 px-5 py-5 max-w-md">
            <TextInput
              name="name"
              label="Body Type"
              placeholder="eg. SUV / Sedan / Hatchback etc."
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
export default AddEditVehicleType;
