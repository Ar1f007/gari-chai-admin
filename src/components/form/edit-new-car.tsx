"use client";

import { useForm } from "react-hook-form";
import { EditNewCarInputs } from "@/schemas/edit-new-car";
import { TCarSchema, brandSchema } from "@/services";
import { Form } from "../ui/form";
import BasicInfo from "../car/basic-info";
import { brandModelSchema } from "@/services/cars/getCarModels";
import { carBodyStylesSchema } from "@/schemas/car-body-style";
import Price from "../car/price";
import FuelType from "../car/fuel-type";
import GroupSpecifications from "../car/group-specifications";
import Specifications from "../car/specifications";
import CarColors from "../car/colors";

const EditNewCarForm = ({ data }: { data: TCarSchema }) => {
  console.log(data);

  const brandData = brandSchema.parse(data.brand.value);
  const modelData = brandModelSchema.parse(data.brandModel.value);
  const bodyStyle = carBodyStylesSchema.parse(data.bodyStyle.value);

  const form = useForm<EditNewCarInputs>({
    mode: "onTouched",
    criteriaMode: "all",
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

      price: {
        min: data.price.min,
        max: data.price.max,
        isNegotiable: data.price.isNegotiable,
      },

      fuel: {
        typeInfo: data.fuel.typeInfo,
      },

      specificationsByGroup: data.specificationsByGroup.map((group) => {
        const groupName = group.groupName;

        const values = group.values.map((val) => ({
          name: val.name,
          value: val.value,
          valueType: val.valueType,
        }));

        return {
          groupName,
          values,
        };
      }),
    },
  });

  async function onSubmit(data: any) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 xl:gap-15 md:px-5 py-5">
          <BasicInfo showSlugInput />

          <Price />

          <FuelType />

          <GroupSpecifications />

          <Specifications
            specificationName="additionalSpecifications"
            isCalledSeparately
          />

          <CarColors />
        </div>
      </form>
    </Form>
  );
};
export default EditNewCarForm;
