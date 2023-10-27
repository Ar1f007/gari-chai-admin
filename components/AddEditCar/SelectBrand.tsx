"use client";

import { TBrandSchema, getBrands } from "@/services";
import Select from "../UI/Form/Select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SelectOption } from "@/types/others";

const SelectBrand = () => {
  const [brands, setBrands] = useState<SelectOption[]>([]);

  function getFormattedBrandOptions(brands: TBrandSchema[]) {
    return brands.map((brand) => ({
      value: [brand.slug, brand.name],
      label: brand.name,
    }));
  }

  useEffect(() => {
    getBrands()
      .then((data) => {
        const brandOptions = data ? getFormattedBrandOptions(data) : [];
        setBrands(brandOptions);
      })
      .catch((e) => toast.error("Could not get brands list"));
  }, []);

  return (
    <Select
      name="brand"
      label="Select Brand"
      options={brands}
      required
    />
  );
};
export default SelectBrand;
