import { TCarSchema } from "@/services";
import Image from "next/image";
import { ReactNode } from "react";
import Checkbox from "../UI/Form/Checkbox";

type CarProps = {
  car: TCarSchema;
  children?: ReactNode;
};

export const Car = ({ car, children }: CarProps) => {
  return (
    <div
      key={car._id}
      className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark relative"
    >
      <Image
        width={300}
        height={300}
        src={car.posterImage.thumbnailUrl ?? "/images/product/product-01.png"}
        alt={car.name}
        className="object-cover"
      />
      <div className="flex items-center justify-between flex-wrap gap-3 my-3">
        <h3 className="font-semibold">{car.name}</h3>

        <p className="py-1 px-4 rounded-full bg-meta-5 w-fit text-sm capitalize text-white">
          {car.brand.name}
        </p>
      </div>

      {children}
    </div>
  );
};
