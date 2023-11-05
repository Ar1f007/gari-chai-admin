import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TBrandSchema, getBrands } from "@/services";

export const useGetBrandsOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<TBrandSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBrands();
        setBrands(data ? data : []);
      } catch (e) {
        toast.error((e as any).message) ?? "Could not get brands list";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { brands, isLoading };
};
