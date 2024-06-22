"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { RichTextEditor } from "../form/rich-text-editor";
import { AddPartSchema, TCarPartSchema, addPartSchema } from "@/schemas/parts";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { isEmptyContent } from "@/lib/utils";
import UploadThumbnail from "../car/upload-thumbnail";
import AdditionalImages from "../car/additional-images";
import { toast } from "sonner";
import { useUploadImage } from "@/hooks/useUploadImage";
import { catchError } from "@/lib/catch-error";
import { createCarPart, updateCarPart } from "@/services/cars/car-parts";
import {
  TAGS,
  UI_TAGS,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { useEffect } from "react";
import { imageSchema } from "@/schemas/utils";
import { z } from "zod";

type AddEditPartProps = {
  isEditing?: boolean;
  data?: TCarPartSchema;
};

export const AddPart = ({ isEditing = false, data }: AddEditPartProps) => {
  const methods = useForm<AddPartSchema>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addPartSchema),
    defaultValues: {
      name: "",
      description: "",
      manufacturer: "",
      warranty: "",
      imageUrls: [],
      status: true,
      price: 0,
      stock: 0,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  const { uploadImage } = useUploadImage();

  async function handlePosterImageUpload(
    image: File | z.infer<typeof imageSchema>
  ) {
    if (image instanceof File) {
      const imgUrls = await uploadImage(image as File);

      if (!imgUrls) {
        throw new Error(
          "Something went wrong while uploading thumbnail image. Please try again."
        );
      }

      return {
        originalUrl: imgUrls.url,
        thumbnailUrl: imgUrls.thumbnailUrl ?? imgUrls.url,
      };
    } else {
      return image;
    }
  }

  async function onSubmit(values: AddPartSchema) {
    try {
      const posterImage = await handlePosterImageUpload(values.posterImage);

      const payload = {
        ...values,
        posterImage,
        description: isEmptyContent(values.description!)
          ? null
          : values.description,
      };

      const res = data
        ? await updateCarPart({
            _id: data._id,
            ...payload,
          })
        : await createCarPart(payload);

      switch (res.status) {
        case "success":
          toast.success(`${isEditing ? "Updated" : "Added"} successfully`);
          reset();
          invalidateAdminCache([TAGS.carParts]);
          invalidateUICache({
            tags: [UI_TAGS.carParts],
          });
          return;

        case "validationError":
          toast.error(res.message ?? "Invalid inputs");
          mapValidationErrors(res.errors, methods);
          return;

        case "error":
        case "fail":
          toast.error(res.message);
          return;

        default:
          toast.error("Something went wrong");
      }
    } catch (error) {
      catchError(error);
    }
  }

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description ? data.description : undefined,
        price: data.price,
        stock: data.stock,
        status: data.status,
        warranty: data.warranty,
        manufacturer: data.manufacturer,
        imageUrls: data.imageUrls,
        posterImage: data.posterImage,
        metaData: data.metaData,
      });
    }
  }, [data, reset]);

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 py-8 bg-muted px-4 rounded w-full"
      >
        <FormField
          control={methods.control}
          name="name"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parts Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Parts title"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Parts price"
                  {...field}
                  type="number"
                  min={0}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Parts quantity"
                  {...field}
                  type="number"
                  min={0}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
              <FormControl>
                <Input
                  placeholder="Manufacturer name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="warranty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty</FormLabel>
              <FormControl>
                <Input
                  placeholder="Warranty"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch
                    id="status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=unchecked]:bg-primary/30"
                  />

                  <Label
                    className="uppercase cursor-pointer"
                    htmlFor="status"
                  >
                    {field.value ? "In Stock" : "Out of Stock"}
                  </Label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="description"
          render={() => (
            <RichTextEditor
              control={methods.control}
              name="description"
            />
          )}
        />

        <UploadThumbnail value={data?.posterImage} />

        <AdditionalImages isEditing={isEditing} />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isEditing ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};
