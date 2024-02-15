"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadImage } from "@/hooks/useUploadImage";
import { TAGS, invalidateAdminCache } from "@/services";
import { mapValidationErrors } from "@/utils/mapValidationError";
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
import {
  CarBodyStyleInputs,
  createCarBodyStyleSchema,
} from "@/schemas/car-body-style";
import {
  AddCarBodyTypeParams,
  addCarBodyType,
} from "@/services/cars/addVehicleType";

type AddBrandProps = {
  onSuccess: () => void;
};

export const AddBodyStyle = ({ onSuccess }: AddBrandProps) => {
  const { uploadImage } = useUploadImage();

  const methods = useForm<CarBodyStyleInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createCarBodyStyleSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: CarBodyStyleInputs) {
    const payload: AddCarBodyTypeParams = {
      name: data.name,
    };

    if (data.image) {
      const imgUrl = await uploadImage(data.image);

      if (!imgUrl) {
        toast.error(
          "Something went wrong while uploading image please try again"
        );
        return;
      }

      payload.image = {
        originalUrl: imgUrl.url,
        thumbnailUrl: imgUrl.thumbnailUrl ?? imgUrl.url,
      };
    }

    const res = await addCarBodyType(payload);

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

      onSuccess();
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
              <FormLabel>Body Style</FormLabel>
              <FormControl>
                <Input
                  placeholder="Body style: SUV"
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
