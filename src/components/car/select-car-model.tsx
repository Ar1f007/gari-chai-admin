"use client";

import { TCarModelSchema } from "@/schemas/car-model";
import { getModelsByBrand } from "@/services/cars/getCarModels";
import { SelectOption } from "@/types/others";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";

import SelectField from "../form/select-field";
import { NewCarInputs } from "@/schemas/new-car";

const SelectCarModel = () => {
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<SelectOption[]>();

  const brand: SelectOption = useWatch({ name: "brand" });

  function getFormattedModelOptions(models: TCarModelSchema[]) {
    return models.map((model) => ({
      value: model._id,
      label: model.name,
    }));
  }

  async function fetchModelsByBrand(brand: SelectOption) {
    try {
      setLoading(true);

      const models = await getModelsByBrand({
        docId: brand.value,
      });
      setModels(models ? getFormattedModelOptions(models) : []);
    } catch (error) {
      toast.error("Could not get models list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (brand) fetchModelsByBrand(brand);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <div className="w-full">
      <SelectField<NewCarInputs>
        name="brandModel"
        label="Select Model"
        options={models}
        isLoading={loading}
      />
    </div>
  );
};
export default SelectCarModel;
