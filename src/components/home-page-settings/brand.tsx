import { TBrandSchema, THomeSettingApiSchema } from "@/services";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import BrandDropdownBtn from "./brand-dropdown-btn";

const Brand = ({ item }: { item: THomeSettingApiSchema }) => {
  const data = item.content as TBrandSchema;

  return (
    <div className="flex flex-col gap-5 items-center justify-between bg-input rounded-md p-4 h-60 box-border shadow-md">
      <Image
        src={
          data.image?.thumbnailUrl ??
          data.image?.originalUrl ??
          PLACEHOLDER_IMAGE
        }
        alt={data.name}
        width={80}
        height={80}
        className="rounded w-auto h-auto object-contain max-w-[100px] max-h-[80px]"
      />

      <BrandDropdownBtn item={item} />
    </div>
  );
};
export default Brand;
