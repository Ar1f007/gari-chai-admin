"use client";

import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import TextField from "@/components/form/text-field";
import LoadingButton from "@/components/ui/loading-button";
import { AddVendorSchema, addVendorSchema } from "@/schemas/add-vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorService } from "@/services/vendor";
import { toast } from "sonner";
import { TAGS, invalidateAdminCache } from "@/services";
import { catchError } from "@/lib/catch-error";
import { mapValidationErrors } from "@/utils/mapValidationError";

const defaultValues: AddVendorSchema = {
  name: "",
  phone: "",
  address: undefined,
  email: undefined,
  image: undefined,
};

const AddVendorForm = () => {
  const form = useForm<AddVendorSchema>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addVendorSchema),
    defaultValues,
  });

  async function onSubmit(data: AddVendorSchema) {
    try {
      const res = await vendorService.add(data);

      if (res.status === "success") {
        toast.success("Vendor Added Successfully");
        invalidateAdminCache([TAGS.vendors]);
        form.reset();
        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, form);
        return;
      }

      toast.error(res.message);
    } catch (error) {
      catchError(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-8 px-4 rounded border"
      >
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

        <LoadingButton
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          Add Vendor
        </LoadingButton>
      </form>
    </Form>
  );
};
export default AddVendorForm;
