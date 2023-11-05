import { TBrandSchema } from "@/services";
import { PLACEHOLDER_IMAGE } from "@/util/constants";
import Image from "next/image";

type BrandProps = {
  brand: TBrandSchema;
};

const Brand = ({ brand }: BrandProps) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Image
        src={
          brand.image?.thumbnailUrl ??
          brand.image?.originalUrl ??
          PLACEHOLDER_IMAGE
        }
        alt={brand.name}
        width={200}
        height={150}
        className="rounded"
      />

      <h3 className="text-center text-xl font-semibold">{brand.name}</h3>
    </div>
  );
};
export default Brand;
