"use client";

import { useFormContext, useWatch } from "react-hook-form";
import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  TBrandModelSchema,
  getModelsByBrand,
} from "@/services/cars/getCarModels";
import { SelectOption } from "@/types/others";

type Props = {
  label?: string;
};

const SelectCarModel = ({ label = "Select Car Model" }: Props) => {
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<SelectOption[]>();

  const brand: SelectOption = useWatch({ name: "brand" });

  function getFormattedBrandOptions(brands: TBrandModelSchema[]) {
    return brands.map((brand) => ({
      value: brand._id,
      label: brand.name,
    }));
  }

  async function fetchModelsByBrand(brand: SelectOption) {
    try {
      setLoading(true);

      const models = await getModelsByBrand({
        docId: brand.value,
      });
      setModels(models ? getFormattedBrandOptions(models) : []);
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
      <InputLabel label={label} />
      <RHFSelect
        name="brandModel"
        options={models}
        isClearable
        isLoading={loading}
      />
    </div>
  );
};
export default SelectCarModel;
