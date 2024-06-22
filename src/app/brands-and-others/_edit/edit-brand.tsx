import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandInputs, createBrandSchema } from "@/schemas/brands";
import {
  TAGS,
  TBrandSchema,
  UI_TAGS,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import Modal from "@/components/ui/modal";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import LoadingButton from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { useUploadImage } from "@/hooks/useUploadImage";
import { toast } from "sonner";
import {
  TUpdateBrandInfoParams,
  updateBrandInfo,
} from "@/services/brands/update-brand";
import { mapValidationErrors } from "@/utils/mapValidationError";

type EditBrandProps = {
  brand: TBrandSchema;
  isOpen: boolean;
  closeDialog: () => void;
};

const EditBrand = ({ brand, isOpen, closeDialog }: EditBrandProps) => {
  const form = useForm({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: brand.name || "",
      image: brand.image.originalUrl,
    },
  });

  const { uploadImage } = useUploadImage();

  async function onSubmit(data: BrandInputs) {
    const payload: TUpdateBrandInfoParams = {
      slug: brand.slug,
      name: data.name,
      image: brand.image,
    };

    if (data.image instanceof File) {
      const imgUrls = await uploadImage(data.image);

      if (!imgUrls) {
        toast.error(
          "Something went wrong while uploading image please try again"
        );
        return;
      }

      payload.image = {
        originalUrl: imgUrls.url,
        thumbnailUrl: imgUrls.thumbnailUrl ?? imgUrls.url,
      };
    }

    const res = await updateBrandInfo(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "success") {
      invalidateAdminCache([TAGS.brands]);
      invalidateUICache({
        tags: [UI_TAGS.allAndPopularBrands],
      });

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
      title="Edit Brand Info"
      showFooter={false}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted/80"
        >
          <div className="p-4 space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
export default EditBrand;
