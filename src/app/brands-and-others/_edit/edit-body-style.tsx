import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAGS,
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

import { mapValidationErrors } from "@/utils/mapValidationError";
import {
  TCarBodyStylesSchemaParams,
  updateCarBodyTypeInfo,
} from "@/services/body-styles/update-body-type";
import {
  CarBodyStyleInputs,
  TCarBodyStylesSchema,
  createCarBodyStyleSchema,
} from "@/schemas/car-body-style";

type EditBodyStyleProps = {
  item: TCarBodyStylesSchema;
  isOpen: boolean;
  closeDialog: () => void;
};

const EditBodyStyle = ({ item, isOpen, closeDialog }: EditBodyStyleProps) => {
  const form = useForm({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createCarBodyStyleSchema),
    defaultValues: {
      name: item.name || "",
      image: item.image?.originalUrl,
    },
  });

  const { uploadImage } = useUploadImage();

  async function onSubmit(data: CarBodyStyleInputs) {
    const payload: TCarBodyStylesSchemaParams = {
      itemId: item._id,
      name: data.name,
      image: item.image,
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

    const res = await updateCarBodyTypeInfo(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "success") {
      invalidateAdminCache([TAGS.carBodyList]);
      invalidateUICache({
        tags: [UI_TAGS.carBodyTypes],
      });

      toast.success("Updated successfully");

      form.reset();
      closeDialog();

      return;
    }

    if (res.status === "validationError") {
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Style Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Body Style"
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
export default EditBodyStyle;
