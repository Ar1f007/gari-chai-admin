"use client";

import { useUploadImage } from "@/hooks/useUploadImage";
import { NewCarInputs, createNewCarSchema } from "@/schema/car/addNewCarSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProvider } from "../UI/Form/FormProvider";
import { BasicInfo } from "./BasicInfo";
import { SpeedAndPerformance } from "./SpeedAndPerformance";
import { EngineInfo } from "./EngineInfo";
import { FuelInfo } from "./FuelInfo";
import Specifications from "./Specifications";

import SubmitButton from "../UI/Form/Button";
import { UploadThumbnail } from "./UploadThumbnail";
import Textarea from "../UI/Form/Textarea";
import { Price } from "./Price";
import { LaunchedDate } from "./LaunchDate";
import { TCreateNewCarParams, createNewCar } from "@/services";
import { toast } from "sonner";

import { mapValidationErrors } from "@/util/mapValidationError";
import { GroupedSpecifications } from "./GroupedSpecifications";

type Props = {
  formTitle: string;
};

export const AddEditNewCarForm = ({ formTitle }: Props) => {
  const { uploadImage } = useUploadImage();

  const methods = useForm<NewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createNewCarSchema),
    defaultValues: {
      price: {
        isNegotiable: true,
      },
      specificationsByGroup: [],
      additionalSpecifications: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

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

      payload.posterImage = {
        originalUrl: res?.url ?? "",
        thumbnailUrl: res?.thumbnailUrl ?? "",
      };
    } catch (error) {
      toast.error(
        "Something went wrong while uploading image. Please Try Again"
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
        reset();
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
  }

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/*  FORM TITLE */}
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {formTitle}
            </h3>
          </div>

          {/* FORM INPUTS */}

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-10 xl:gap-15 px-5 py-5">
              <BasicInfo />

              <Price />

              <FuelInfo />

              <SpeedAndPerformance />

              <EngineInfo />

              <GroupedSpecifications />

              <Specifications
                specificationName="additionalSpecifications"
                isCalledSeparately
              />

              <LaunchedDate />

              <Textarea
                name="description"
                label="Car Description"
                placeholder="small description about the car..."
              />

              <UploadThumbnail />

              <SubmitButton
                title="Submit"
                type="submit"
                loading={isSubmitting}
              />
            </div>
          </FormProvider>

          {/* FORM INPUTS */}
        </div>
      </div>
    </div>
  );
};
