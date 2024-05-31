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
import { AddPartSchema, addPartSchema } from "@/schemas/parts";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { isEmptyContent } from "@/lib/utils";
import UploadThumbnail from "../car/upload-thumbnail";
import AdditionalImages from "../car/additional-images";
import RHFMultiImageFileDropzone from "../ui/rhf-multi-image";

export const AddPart = () => {
  const methods = useForm<AddPartSchema>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(addPartSchema),
    defaultValues: {
      imageUrls: [],
      status: true,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: AddPartSchema) {
    const isEmptyDescription = isEmptyContent(data.description!);
    console.log(isEmptyDescription);
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 py-8 bg-muted px-4 rounded w-full"
      >
        <FormField
          control={methods.control}
          name="name"
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

        <UploadThumbnail />

        <AdditionalImages />

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
