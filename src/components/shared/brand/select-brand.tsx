"use client";

import { TBrandSchema, getBrands } from "@/services";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SelectOption } from "@/types/others";
import { SearchParams } from "@/utils/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { ReactSelect } from "@/components/ui/react-select";

type Props = {
  name?: string;
  label?: string;
};

const SelectBrand = ({ name = "brand", label = "Pick Brand" }: Props) => {
  const form = useFormContext();

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
      setBrands(brands ? getFormattedBrandOptions(brands.data) : []);
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
      <FormField
        control={form.control}
        name={name}
        render={({ field: { ref, value, ...rest } }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ReactSelect
                placeholder={label}
                options={brands}
                isClearable
                isLoading={loading}
                value={value ?? ""}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default SelectBrand;
