import { THomeSettingApiSchema } from "@/services";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import { TCarPartSchema } from "@/schemas/parts";
import CarPartDropdownBtn from "./car-part-dropdown-btn";

const CarPart = ({ item }: { item: THomeSettingApiSchema }) => {
  const data = item.content as TCarPartSchema;

  return (
    <div className="flex flex-col gap-5 items-center justify-between bg-input rounded-md p-4 box-border shadow-md">
      <Image
        src={
          data.posterImage?.thumbnailUrl ??
          data.posterImage?.originalUrl ??
          PLACEHOLDER_IMAGE
        }
        alt={data.name}
        width={400}
        height={200}
        className="rounded w-full h-auto object-contain max-h-[200px]"
      />

      <CarPartDropdownBtn item={item} />
    </div>
  );
};
export default CarPart;
