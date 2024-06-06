import { TCarPartSchema } from "@/schemas/parts";
import { getCarParts } from "@/services/cars/car-parts";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { URLSearchParams } from "url";

type Status = "idle" | "pending" | "success";

export const useGetCarParts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [carParts, setCarParts] = useState<TCarPartSchema[]>([]);

  const fetchCarParts = useCallback(
    async (params: URLSearchParams | string = "") => {
      try {
        console.log(".........", params.toString());
        setIsLoading(true);

        const data = await getCarParts(params.toString());
        if (data.data) {
          setCarParts(data.data.carParts);
        } else {
          setCarParts([]);
        }
      } catch (e) {
        toast.error((e as any)?.message ?? "Could not get car parts list");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCarParts();
  }, [fetchCarParts]);

  return {
    isLoading,
    carParts,
    fetchCarParts,
  };
};
