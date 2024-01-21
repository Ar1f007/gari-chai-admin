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
import {
  TAGS,
  TCreateNewCarParams,
  createNewCar,
  invalidateAdminCache,
} from "@/services";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { VideoUrl } from "@/components/car/video-urls";

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

  async function handleVideoLinksWithImages(data: NewCarInputs["videos"]) {
    data?.map;
  }

  // console.log(form.formState.errors.fuel);
  async function onSubmit(data: NewCarInputs) {
    const payload: TCreateNewCarParams = {
      ...data,
      posterImage: {
        originalUrl: "",
        thumbnailUrl: "",
      },
    };

    try {
      const res = await uploadImage(data.posterImage);

      if (!res) throw new Error();

      payload.posterImage = {
        originalUrl: res.url,
        thumbnailUrl: res.thumbnailUrl ?? res.url,
      };
    } catch (error) {
      toast.error(
        "Something went wrong while uploading thumbnail image. Please Try Again"
      );
      return;
    }

    if (data.videos && !!data.videos.length) {
      const videos: NewCarInputs["videos"] = [];

      for (let i = 0; i < data.videos.length; i++) {
        if (
          data.videos[i].thumbnailImage &&
          data.videos[i].thumbnailImage instanceof File
        ) {
          const res = await uploadImage(data.videos[i].thumbnailImage as File);

          if (!res) {
            toast.error("Error, uploading video thumbnail");
            return;
          }

          videos.push({
            link: data.videos[i].link,
            thumbnailImage: {
              originalUrl: res.url,
              thumbnailUrl: res.thumbnailUrl ?? res.url,
            },
          });
        } else {
          videos.push({
            link: data.videos[i].link,
            thumbnailImage: data.videos[i].thumbnailImage,
          });
        }
      }

      payload.videos = videos;
    }

    // confirm the uploading of color images
    if (data.colors.length) {
      // extracting all the urls into one array
      const urlList: string[] = [];

      data.colors.map((color) => {
        if (color.imageUrls?.length) {
          color.imageUrls.map((imgUrl) => {
            urlList.push(imgUrl.url.originalUrl);
          });
        }
      });

      if (urlList.length) {
        await confirmUpload(urlList);
      }
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
        invalidateAdminCache([TAGS.brands, TAGS.cars, TAGS.brandModelList]);
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

              <VideoUrl />

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
