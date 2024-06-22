import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TBrandSchema, getBrands, getPopularBrands } from "@/services";

export const useGetBrandsOptions = ({
  filterOutPopularBrands = false,
}: {
  filterOutPopularBrands?: boolean;
} = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<TBrandSchema[]>([]);

  async function getFilteredBrandList() {
    const [allBrands, popularBrands] = await Promise.all([
      getBrands(),
      getPopularBrands(),
    ]);

    if (!allBrands || !popularBrands) {
      return toast.error("Something went wrong. Please try again.");
    }

    const data = allBrands.data.filter(
      (brand) =>
        !popularBrands.some(
          (popularBrand) => popularBrand.contentId === brand._id
        )
    );
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (filterOutPopularBrands) {
          const [allBrands, popularBrands] = await Promise.all([
            getBrands(),
            getPopularBrands(),
          ]);

          if (!allBrands || !popularBrands) {
            return toast.error("Something went wrong. Please try again.");
          }

          const data = allBrands.data.filter(
            (brand) =>
              !popularBrands.some(
                (popularBrand) => popularBrand.contentId === brand._id
              )
          );

          setBrands(data ? data : []);
        } else {
          const brands = await getBrands();
          setBrands(brands.data);
        }
      } catch (e) {
        toast.error((e as any)?.message) ?? "Could not get brands list";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterOutPopularBrands]);

  return { brands, isLoading };
};
