import { TCarSchema, THomeSettingApiSchema } from "@/services";
import Image from "next/image";
import CarDropdownBtn from "./car-dropwdown-btn";

const Car = ({ item }: { item: THomeSettingApiSchema }) => {
  const car = item.content as TCarSchema;

  return (
    <div className="flex flex-col space-y-1 justify-between bg-input rounded-md box-border shadow-md h-[300px]">
      <Image
        src={car.posterImage.originalUrl}
        alt={car.name}
        width={300}
        height={200}
        className="object-cover rounded w-auto h-auto max-h-[200px]"
      />
      <CarDropdownBtn item={item} />
    </div>
  );
};
export default Car;
