"use client";

import { useForm } from "react-hook-form";

import { EditNewCarInputs, editNewCarSchema } from "@/schemas/edit-new-car";
import { TCarSchema, brandSchema } from "@/services";
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

const EditNewCarForm = ({ data }: { data: TCarSchema }) => {
  const brandData = brandSchema.parse(data.brand.value);
  const modelData = carModelSchema.parse(data.brandModel.value);
  const bodyStyle = carBodyStylesSchema.parse(data.bodyStyle.value);

  const form = useForm<EditNewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(editNewCarSchema),
    defaultValues: {
      name: data.name,
      slug: data.slug,

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

      initialColors: data.colors,

      colors: data.colors,

      cities: data.cities,

      launchedAt: new Date(data.launchedAt),

      description: data.description,

      imageUrls: data.imageUrls,

      status: data.status,

      videos: data.videos,
    },
  });

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

  async function getNewUrlAndDelPrevOne(img: File) {
    try {
      const res = await uploadImage(img);

      if (!res) throw new Error();

      deleteImgFromStore(data.posterImage.originalUrl);

      return {
        originalUrl: res.url,
        thumbnailUrl: res?.thumbnailUrl,
      };
    } catch (error) {
      toast.error(
        "Something went wrong while uploading thumbnail image. Please Try Again"
      );
      return;
    }
  }

  async function getFormattedPayload(formData: EditNewCarInputs) {
    const posterImage = !formData.posterImage
      ? data.posterImage
      : await getNewUrlAndDelPrevOne(formData.posterImage);

    const payload = {
      ...formData,
      posterImage: posterImage || data.posterImage,
    };

    return payload;
  }

  async function onSubmit(formData: EditNewCarInputs) {
    const payload = await getFormattedPayload(formData);

    console.log(payload);
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
