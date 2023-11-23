"use client";

import { TBrandSchema, getBrands } from "@/services";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SelectOption } from "@/types/others";
import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";
import { SearchParams } from "@/util/constants";

type Props = {
  label?: string;
};

const SelectBrand = ({ label = "Select Brand" }: Props) => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<SelectOption[]>([]);

  function getFormattedBrandOptions(brands: TBrandSchema[]) {
    return brands.map((brand) => ({
      value: brand._id,
      label: brand.name,
    }));
  }

  async function fetchBrands() {
    try {
      setLoading(true);

      const brands = await getBrands(SearchParams.getAllBrands);
      setBrands(brands ? getFormattedBrandOptions(brands) : []);
    } catch (error) {
      toast.error("Could not get brands list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <InputLabel label={label} />
      <RHFSelect
        name="brand"
        options={brands}
        isClearable
        isLoading={loading}
      />
    </div>
  );
};
export default SelectBrand;
