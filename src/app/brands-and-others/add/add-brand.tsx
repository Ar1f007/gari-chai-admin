"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadImage } from "@/hooks/useUploadImage";
import {
  TAGS,
  TAddNewBrandPayload,
  addBrandName,
  invalidateAdminCache,
} from "@/services";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { BrandInputs, createBrandSchema } from "@/schemas/brands";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { Loader2Icon } from "lucide-react";

type AddBrandProps = {
  onSuccess: () => void;
};

export const AddBrand = ({ onSuccess }: AddBrandProps) => {
  const { uploadImage } = useUploadImage();

  const methods = useForm<BrandInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: BrandInputs) {
    const imgUrls = await uploadImage(data.image as File);

    if (!imgUrls) {
      toast.error(
        "Something went wrong while uploading image please try again"
      );
      return;
    }

    const payload: TAddNewBrandPayload = {
      name: data.name,
      image: {
        originalUrl: imgUrls.url,
        thumbnailUrl: imgUrls.thumbnailUrl ?? imgUrls.url,
      },
    };

    const res = await addBrandName(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "success") {
      invalidateAdminCache([TAGS.brands]);

      toast.success("Brand added successfully");

      reset({
        image: undefined,
        name: "",
      });

      onSuccess();

      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, methods);
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 py-8 bg-muted px-4 rounded"
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Brand Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <SingleImageDropzone
                  {...field}
                  width={200}
                  height={200}
                  dropzoneOptions={{
                    maxSize: 1024 * 300, // 300 kb
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add
        </Button>
      </form>
    </Form>
  );
};
