"use client";

import { useForm } from "react-hook-form";

import { EditNewCarInputs, editNewCarSchema } from "@/schemas/edit-new-car";
import {
  TCarSchema,
  brandSchema,
  invalidateAdminCache,
  invalidateAdminPathCache,
  invalidateUICache,
} from "@/services";
import { Form } from "../ui/form";
import BasicInfo from "../car/basic-info";
import { carBodyStylesSchema } from "@/schemas/car-body-style";
import Price from "../car/price";
import FuelType from "../car/fuel-type";
import GroupSpecifications from "../car/group-specifications";
import Specifications from "../car/specifications";
import CarColors from "../car/colors";
import { carModelSchema } from "@/schemas/car-model";
import ChooseCities from "../car/choose-cities";
import LaunchedDate from "../car/launched-date";
import CarDescription from "../car/description";
import UploadThumbnail from "../car/upload-thumbnail";
import { LoadingBtn } from "../ui/loading-btn";
import Status from "../car/status";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { VideoUrl } from "../car/video-urls";
import { updateNewCar } from "@/services/cars/updateNewCar";
import { vendorSchema } from "@/schemas/vendor";
import { mapValidationErrors } from "@/utils/mapValidationError";
import AdditionalImages from "../car/additional-images";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";

const EditNewCarForm = ({ data }: { data: TCarSchema }) => {
  const brandData = brandSchema.parse(data.brand.value);
  const modelData = carModelSchema.parse(data.brandModel.value);
  const bodyStyle = carBodyStylesSchema.parse(data.bodyStyle.value);
  const vendorData = vendorSchema.parse(data.vendor.value);

  const form = useForm<EditNewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(editNewCarSchema),
    defaultValues: {
      name: data.name,
      slug: data.slug,

      vendor: {
        value: vendorData._id,
        label: vendorData.name,
      },

      brand: {
        value: brandData._id,
        label: brandData.name,
      },

      brandModel: {
        value: modelData._id,
        label: modelData.name,
      },

      bodyStyle: {
        value: bodyStyle._id,
        label: bodyStyle.name,
      },

      tags: data.tags,

      transmission: data.transmission,

      numOfDoors: data.numOfDoors,

      seatingCapacity: data.seatingCapacity,

      price: data.price,

      fuel: data.fuel,

      specificationsByGroup: data.specificationsByGroup,

      additionalSpecifications: data.additionalSpecifications,

      colors: data.colors,

      cities: data.cities,

      launchedAt: new Date(data.launchedAt),

      description: data.description,

      imageUrls: data.imageUrls,

      status: data.status,

      videos: data.videos,

      posterImage: data.posterImage,
    },
  });

  const router = useRouter();

  const { uploadImage } = useUploadImage();
  const { edgestore } = useEdgeStore();

  function colorImages(colors: TCarSchema["colors"]) {
    return colors.map((color) => color.imageUrls).flat();
  }

  const allInitialImgUrls = useMemo(() => {
    const imgUrls = [
      ...data.imageUrls,
      data.posterImage.originalUrl,
      data.posterImage.thumbnailUrl,
      ...colorImages(data.colors),
    ];

    return imgUrls;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._id]);

  async function deleteImgFromStore(urls: string | string[]) {
    try {
      if (typeof urls === "string") {
        await edgestore.publicImages.delete({ url: urls });
      } else {
        for (const url of urls) {
          await edgestore.publicImages.delete({ url });
        }
      }
    } catch (error) {
      //
    }
  }

  async function getNewUrlAndDelPrevOne(img: File, prevUrl: string) {
    try {
      const res = await uploadImage(img);

      if (!res) throw new Error();

      // deleteImgFromStore(prevUrl);

      return {
        originalUrl: res.url,
        thumbnailUrl: res?.thumbnailUrl || res.url,
      };
    } catch (error) {
      toast.error(
        "Something went wrong while uploading thumbnail image. Please Try Again"
      );
      return;
    }
  }

  async function handleVideos(currentVideos: EditNewCarInputs["videos"]) {
    if (!currentVideos || !currentVideos.length) {
      return [];
    }

    const videos: TCarSchema["videos"] = [];

    for (const video of currentVideos) {
      if (video.thumbnailImage && video.thumbnailImage instanceof File) {
        try {
          const res = await uploadImage(video.thumbnailImage);

          if (!res) throw new Error(video.thumbnailImage.name);

          videos.push({
            link: video.link,
            thumbnailImage: {
              originalUrl: res.url,
              thumbnailUrl: res?.thumbnailUrl || res.url,
            },
          });
        } catch (e: any) {
          if (e instanceof Error) {
            toast.error(
              "Could not upload thumbnail image for video: " + e.message
            );
          }
          toast.error(
            "Something went wrong while uploading thumbnail image for video"
          );
        }
      } else {
        videos.push({
          link: video.link,
          thumbnailImage: video.thumbnailImage,
        });
      }
    }

    return videos;
  }

  async function handlePosterImg(
    curData: EditNewCarInputs["posterImage"],
    prevData: TCarSchema["posterImage"]
  ) {
    if (curData instanceof File) {
      const res = await getNewUrlAndDelPrevOne(curData, prevData.originalUrl);

      if (!res) {
        return {
          originalUrl: prevData.thumbnailUrl,
          thumbnailUrl: prevData.thumbnailUrl,
        };
      }

      return res;
    }

    return prevData;
  }

  async function getFormattedPayload(formData: EditNewCarInputs) {
    const posterImage = await handlePosterImg(
      formData.posterImage,
      data.posterImage
    );

    const payload = {
      ...formData,
      posterImage,
      videos: await handleVideos(formData.videos),
    };

    return payload;
  }

  async function onSubmit(formData: EditNewCarInputs) {
    try {
      const payload = await getFormattedPayload(formData);

      const res = await updateNewCar(payload, data.slug);

      if (!res) {
        return toast.error("Something went wrong");
      }

      if (res.status === "success") {
        toast.success("Updated Successfully");

        invalidateUICache({
          paths: [{ path: `/(main)/cars`, type: "layout" }],
        });

        invalidateAdminPathCache([
          { path: `/cars/edit/${formData.slug}`, type: "page" },
        ]);

        router.push(routes.newCarRoutes.carList);
        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, form);
        toast.error(res.message);
        return;
      }

      toast.error(res.message);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        suppressHydrationWarning
      >
        <div className="flex flex-col gap-10 xl:gap-15 md:px-5 py-5">
          <BasicInfo showSlugInput />

          <Price />

          <FuelType />

          <GroupSpecifications />

          <Specifications
            specificationName="additionalSpecifications"
            isCalledSeparately
          />

          <CarColors isEditing={true} />

          <VideoUrl />

          <ChooseCities />

          <LaunchedDate />

          <Status />

          <CarDescription />

          <UploadThumbnail value={data.posterImage} />

          <AdditionalImages isEditing={true} />

          <LoadingBtn
            type="submit"
            isLoading={form.formState.isSubmitting}
            btnText="Update Changes"
            className="uppercase"
          />
        </div>
      </form>
    </Form>
  );
};
export default EditNewCarForm;
