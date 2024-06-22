import SwitchField from "@/components/form/switch-field";
import TextField from "@/components/form/text-field";
import SelectBrand from "@/components/shared/brand/select-brand";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import Modal from "@/components/ui/modal";
import {
  CarModelInputs,
  TCarModelSchema,
  addCarModelSchema,
} from "@/schemas/car-model";
import {
  TAGS,
  TBrandSchema,
  UI_TAGS,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { updateCarModelInfo } from "@/services/models/update-car-models";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditBrandModelProps = {
  item: TCarModelSchema;
  isOpen: boolean;
  closeDialog: () => void;
};

const EditBrandModel = ({ item, isOpen, closeDialog }: EditBrandModelProps) => {
  const form = useForm<CarModelInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addCarModelSchema),
    defaultValues: {
      brand: {
        label: (item.brand as TBrandSchema).name,
        value: (item.brand as TBrandSchema)._id,
      },
      name: item.name,
      upcoming: item.upcoming,
    },
  });

  async function onSubmit(data: CarModelInputs) {
    const res = await updateCarModelInfo({
      modelId: item._id,
      brand: data.brand.value,
      name: data.name,
      upcoming: data.upcoming,
    });

    if (!res) {
      toast.error("Something went wrong, please try again!");
      return;
    }

    if (res.status == "success") {
      toast.success("Updated Successfully!");
      invalidateAdminCache([TAGS.brandModelList]);
      // TODO: AT THE MOMENT WE ARE NOT CACHING MODELS IN UI,
      // MAKE SURE TO UPDATE IT IN UI AND ALSO INVALIDATE THAT FROM HERE
      //  invalidateUICache({
      //    tags: [UI_TAGS.],
      //  });
      closeDialog();
      return;
    }

    if (res.status === "validationError") {
      toast.error(res.message || "Invalid Input");
      mapValidationErrors(res.errors, form);
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeDialog}
      mode="update"
      title="Update Model Info"
      showFooter={false}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted/80"
        >
          <div className="p-4 space-y-6">
            <SelectBrand
              name="brand"
              label="Pick Brand *"
            />

            <TextField
              name="name"
              label="Model Name *"
              placeholder="eg. Harrier"
            />

            <SwitchField
              name="upcoming"
              checkedText="Marked as upcoming model"
              unCheckedText="Marked as existing model"
            />

            <div className="flex justify-between gap-2">
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                className="flex-1"
              >
                Update
              </LoadingButton>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={closeDialog}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
export default EditBrandModel;
