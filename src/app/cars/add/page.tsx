"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import BasicInfo from "@/components/car/basic-info";
import ChooseCities from "@/components/car/choose-cities";
import CarColors from "@/components/car/colors";
import CarDescription from "@/components/car/description";
import FuelType from "@/components/car/fuel-type";
import GroupSpecifications from "@/components/car/group-specifications";
import LaunchedDate from "@/components/car/launched-date";
import Price from "@/components/car/price";
import Specifications from "@/components/car/specifications";
import UploadThumbnail from "@/components/car/upload-thumbnail";

import PageHeader from "@/components/layout/page-header.tsx";
import { Form } from "@/components/ui/form";
import { LoadingBtn } from "@/components/ui/loading-btn";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useEdgeStore } from "@/lib/edgestore";
import { NewCarInputs, createNewCarSchema } from "@/schemas/new-car";
import { TCreateNewCarParams, createNewCar } from "@/services";
import { mapValidationErrors } from "@/utils/mapValidationError";

const AddCarPage = () => {
  const { uploadImage } = useUploadImage();
  const { edgestore } = useEdgeStore();

  const form = useForm<NewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createNewCarSchema),
    defaultValues: {
      price: {
        isNegotiable: true,
      },
      specificationsByGroup: [],
      additionalSpecifications: [],
      colors: [],
    },
  });

  async function confirmUpload(urls: string[]) {
    await Promise.all(
      urls.map(async (urlToConfirm) => {
        try {
          await edgestore.publicImages.confirmUpload({
            url: urlToConfirm,
          });
        } catch (error) {
          toast.error("Confirming color image upload is failed");
          // TODO
          // Allow user to confirm the upload again
        }
      })
    );
  }

  async function onSubmit(data: NewCarInputs) {
    // first confirm the uploading of color images
    if (data.colors.length) {
      // extracting all the urls into one array
      const urlList: string[] = [];

      data.colors.map((color) => {
        if (color.imageUrls?.length) {
          color.imageUrls.map((imgUrl) => urlList.push(imgUrl));
        }
      });

      if (urlList.length) {
        await confirmUpload(urlList);
      }
    }

    const payload: TCreateNewCarParams = {
      ...data,
      posterImage: {
        originalUrl: "",
        thumbnailUrl: "",
      },
    };

    try {
      const res = await uploadImage(data.posterImage);

      payload.posterImage = {
        originalUrl: res?.url ?? "",
        thumbnailUrl: res?.thumbnailUrl ?? "",
      };
    } catch (error) {
      toast.error(
        "Something went wrong while uploading thumbnail image. Please Try Again"
      );
      return;
    }

    const res = await createNewCar(payload);

    if (!res) {
      toast.error("something went wrong");
      return;
    }

    switch (res.status) {
      case "success":
        toast.success("Added successfully");
        form.reset();
        return;

      case "validationError":
        toast.error(res.message ?? "Invalid inputs");
        mapValidationErrors(res.errors, form);
        return;

      case "error":
      case "fail":
        toast.error(res.message);
        return;

      default:
        toast.error("Something went wrong");
    }
  }

  return (
    <section>
      <PageHeader>Add New Car</PageHeader>
      <main className="p-[var(--paddingOffset)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-10 xl:gap-15 md:px-5 py-5">
              <BasicInfo />

              <Price />

              <FuelType />

              <GroupSpecifications />

              <Specifications
                specificationName="additionalSpecifications"
                isCalledSeparately
              />

              <CarColors />

              <ChooseCities />

              <LaunchedDate />

              <CarDescription />

              <UploadThumbnail />

              <LoadingBtn
                type="submit"
                isLoading={form.formState.isSubmitting}
                btnText="Upload"
                className="uppercase"
              />
            </div>
          </form>
        </Form>
      </main>
    </section>
  );
};
export default AddCarPage;
