import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBrands } from "@/services";
import { Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { BrandDataTable } from "./_data-table";
import { columns } from "./_columns";

const BrandListPage = async () => {
  const brands = await getBrands();

  return (
    <>
      <Breadcrumb pageName="Car Brands" />

      {!brands || !brands.length ? (
        <div className="card w-fit flex gap-3 items-center">
          <InfoIcon />
          <Text
            size="4"
            color="blue"
          >
            Only brands those are added to cars will be enlisted here.
          </Text>
        </div>
      ) : (
        // <ul>
        //   {brands.map((brand) => (
        //     <li key={brand._id}>{brand.name}</li>
        //   ))}
        // </ul>
        <BrandDataTable
          data={brands}
          columns={columns}
        />
      )}
    </>
  );
};
export default BrandListPage;
