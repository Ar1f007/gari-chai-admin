import { TCar } from "@/services";
import Image from "next/image";

type CarProps = {
  car: TCar;
};

export const Car = ({ car }: CarProps) => {
  return (
    <div
      key={car._id}
      className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <Image
        width={300}
        height={200}
        src={car.imageUrls?.[0] ?? ""}
        alt={car.name}
        className="object-cover"
      />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-semibold">{car.name}</h3>

        <p className="py-2 px-3 rounded-full bg-primary w-fit text-sm">{car.brandName}</p>
      </div>
    </div>
  );
};
