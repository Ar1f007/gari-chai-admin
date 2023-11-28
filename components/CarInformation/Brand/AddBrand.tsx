"use client";

import { xCharacterLong } from "@/util/other";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .min(3, xCharacterLong("Brand name", 3)),
  image: z.instanceof(File, {
    message: "add a brand image",
  }),
});

export type AddBrandFormInputs = z.infer<typeof createBrandSchema>;

type AddEditModelProps = {
  onClose: () => void;
};

const AddBrand = () => {
  const methods = useForm<AddBrandFormInputs>({
    defaultValues: {
      name: "",
      image: undefined,
    },
    resolver: zodResolver(createBrandSchema),
  });

  return (
    <div className="flex flex-col gap-9 max-w-md">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Brand</h3>
        </div>
      </div>
    </div>
  );
};
export default AddBrand;
