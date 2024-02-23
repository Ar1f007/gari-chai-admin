// External dependencies
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Services
import {
  TAGS,
  UI_TAGS,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { vendorService } from "@/services/vendor";

// UI Components

import Modal from "@/components/ui/modal";
import LoadingButton from "@/components/ui/loading-button";
import TextField from "@/components/form/text-field";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Utils and Schemas
import { mapValidationErrors } from "@/utils/mapValidationError";
import { TVendorSchema } from "@/schemas/vendor";
import { AddVendorSchema, addVendorSchema } from "@/schemas/add-vendor";

type EditVendorProps = {
  item: TVendorSchema;
  isOpen: boolean;
  closeDialog: () => void;
};

export const EditVendor = ({ item, isOpen, closeDialog }: EditVendorProps) => {
  const form = useForm<AddVendorSchema>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addVendorSchema),
    defaultValues: {
      name: item.name,
      phone: item.phone,
      address: item.address,
      email: item.email,
    },
  });

  async function onSubmit(data: AddVendorSchema) {
    const res = await vendorService.updateVendorInfo({
      _id: item._id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
    });

    if (res.status === "success") {
      invalidateAdminCache([TAGS.vendors]);

      toast.success("Updated successfully");

      form.reset();
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
      title="Update Body Style Info"
      showFooter={false}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted/80"
        >
          <div className="p-4 space-y-6">
            <TextField
              name="name"
              label="Vendor name *"
              placeholder="name of the vendor"
              autoComplete="off"
            />

            <TextField
              name="phone"
              label="Phone No. *"
              placeholder="enter phone no."
              inputMode="numeric"
              type="tel"
            />

            <TextField
              name="email"
              label="Email"
              placeholder="optional email"
              inputMode="email"
              type="email"
            />

            <TextField
              name="address"
              label="Address"
              placeholder="optional address"
              inputMode="text"
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
