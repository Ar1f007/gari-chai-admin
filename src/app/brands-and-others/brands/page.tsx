import PageHeader from "@/components/layout/page-header.tsx";
import { getBrands } from "@/services";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { BrandDataTable } from "./data-table";
import { brandTableColumns } from "./brand-table-columns";
import { SearchParams } from "@/utils/constants";

const BrandList = async () => {
  const brands = await getBrands(SearchParams.getAllBrands);

  return (
    <section>
      <PageHeader>Brands</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        {brands.message ? (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              {brands.message}
            </AlertTitle>
          </Alert>
        ) : (
          <BrandDataTable
            data={brands.data}
            columns={brandTableColumns}
          />
        )}
      </section>
    </section>
  );
};
export default BrandList;
