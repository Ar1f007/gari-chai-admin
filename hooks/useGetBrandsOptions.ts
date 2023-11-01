"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TBrandSchema, getBrands } from "@/services";
import { SelectOption } from "@/types/others";
import { error } from "console";

export const useGetBrandsOptions = (valueAsStringArray = false) => {
  const [brands, setBrands] = useState<SelectOption[]>([]);

  function getFormattedBrandOptions(brands: TBrandSchema[]) {
    return brands.map((brand) => ({
      value: valueAsStringArray ? [brand.slug, brand.name] : brand.slug,
      label: brand.name,
    }));
  }

  useEffect(() => {
    getBrands()
      .then((data) => {
        const brandOptions = data ? getFormattedBrandOptions(data) : [];
        setBrands(brandOptions);
      })
      .catch(
        (e) => toast.error((e as any).message) ?? "Could not get brands list"
      );
  }, []);

  return brands;
};
