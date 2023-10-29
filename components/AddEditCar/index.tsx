"use client";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormProvider } from "../UI/Form/FormProvider";
import TextInput from "../UI/Form/TextInput";
import { NewCarInputs, createNewCarSchema } from "@/schema/car/newCarSchema";
import Textarea from "../UI/Form/Textarea";
import { TCarServerPayload } from "@/types/car";
import { TAGS, createNewCar, invalidateCache } from "@/services";
import { useEffect } from "react";
import clsx from "clsx";
import SelectBrand from "./SelectBrand";

type Props = {
  formTitle: string;
};

export const AddEditCarForm = (props: Props) => {
  const { formTitle } = props;

  const methods = useForm<NewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createNewCarSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = methods;

  function getFormattedPayload(data: NewCarInputs) {
    const extractedPayload = omit(data, [
      "engineType",
      "engineDisplacement",
      "engineHorsePower",
      "engineTorque",
      "fuelType",
      "fuelCityEconomy",
      "fuelCityEconomy",
      "fuelHighwayEconomy",
      "acceleration0To60",
      "accelerationTopSpeed",
      "brand",
    ]);

    const payload: TCarServerPayload = {
      ...extractedPayload,
      engine: {
        type: data.engineType,
        displacement: data.engineDisplacement,
        horsePower: data.engineHorsePower,
        torque: data.engineTorque,
      },

      fuel: {
        type: data.fuelType,
        economy: {
          city: data.fuelCityEconomy,
          highway: data.fuelHighwayEconomy,
        },
      },

      acceleration: {
        zeroTo60: data.acceleration0To60,
        topSpeed: data.accelerationTopSpeed,
      },
      brand: {
        slug: data.brand.split(",")[0],
        name: data.brand.split(",")[1],
      },
    };

    return payload;
  }

  async function onSubmit(data: NewCarInputs) {
    const payload = getFormattedPayload(data);

    const res = await createNewCar(payload);

    if (!res) {
      toast.error("something went wrong");
      return;
    }

    if (res.status === "success") {
      toast.success("Added successfully");
      invalidateCache(TAGS.cars);

      return;
    }

    if (res.status === "validationError") {
      toast.error(res.message ?? "something went wrong");
      return;
    }

    // error | fail
    toast.error(res.message);
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {formTitle}
            </h3>
          </div>

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5 px-5 py-5">
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="name"
                  placeholder="Name of the car"
                  required
                />

                <SelectBrand />
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  type="number"
                  name="registrationYear"
                  label="Registration Year"
                  placeholder="Car Registration Year. eg: 2022"
                />

                <TextInput
                  name="modelNumber"
                  label="Model Number"
                  type="number"
                  placeholder="eg: 1234"
                />
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="transmission"
                  placeholder="eg: manual / automatic"
                />

                <TextInput
                  name="bodyStyle"
                  label="Body Style"
                  placeholder="eg: SUV"
                />
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="color"
                  placeholder="eg: black"
                />

                <TextInput
                  name="mileage"
                  type="number"
                  placeholder="eg: 80 kmpl"
                />
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="baseInteriorColor"
                  label="Base Interior Color"
                  placeholder="eg: cream"
                />

                <TextInput
                  name="numberOfDoors"
                  label="Number of Doors"
                  type="number"
                  placeholder="eg: 4"
                />
              </div>
              <div>
                <h6 className="font-semibold text-bodydark1 mb-3">
                  Acceleration
                </h6>

                <div className="xl:flex xl:gap-5">
                  <TextInput
                    name="acceleration0To60"
                    label="0 to 60 kmpl (Time takes to reach)"
                    type="number"
                    placeholder="eg: 7 seconds"
                    required={false}
                  />

                  <TextInput
                    name="accelerationTopSpeed"
                    label="Top Speed"
                    type="number"
                    placeholder="eg: 120"
                    required={false}
                  />
                </div>
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="infotainmentSystem"
                  label="Infotainment System"
                  placeholder="eg: Touchscreen display"
                  required={false}
                />

                <TextInput
                  name="safetyFeatures"
                  label="Safety Features"
                  placeholder="eg: Airbags, ABS etc."
                  required={false}
                />
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="fuelType"
                  label="Fuel Type"
                  placeholder="eg. diesel"
                />

                <TextInput
                  name="engineType"
                  label="Engine Type"
                  placeholder="eg. Inline-4 Engines / Diesel Engine"
                  required={false}
                />
              </div>
              <div>
                <h6 className="font-semibold text-bodydark1 mb-3">
                  Fuel Economy
                </h6>
                <div className="xl:flex xl:gap-5">
                  <TextInput
                    name="fuelCityEconomy"
                    label="In City"
                    placeholder="eg. 40 kmpl in city"
                    required={false}
                    type="number"
                  />

                  <TextInput
                    name="fuelHighwayEconomy"
                    label="In Highway"
                    placeholder="eg. 80 kmpl in city"
                    required={false}
                    type="number"
                  />
                </div>
              </div>
              <div className="xl:flex xl:gap-5">
                <TextInput
                  name="engineDisplacement"
                  label="Engine displacement"
                  placeholder="eg. 2.0"
                  type="number"
                  required={false}
                />

                <TextInput
                  name="engineHorsePower"
                  label="Horse Power"
                  type="number"
                  placeholder="eg. 200"
                  required={false}
                />

                <TextInput
                  name="engineTorque"
                  label="Torque"
                  type="number"
                  placeholder="eg. 250"
                  required={false}
                />
              </div>
              <Textarea
                name="description"
                label="Car Description"
                placeholder="small description about the car..."
              />

              <button
                className={clsx(
                  "flex w-full justify-center rounded bg-primary p-3 font-medium text-gray transition-all duration-200",
                  {
                    "bg-opacity-70": isSubmitting,
                  }
                )}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
