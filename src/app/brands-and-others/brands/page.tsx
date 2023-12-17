import Breadcrumbs from "@/components/layout/breadcrumbs";
import PageHeader from "@/components/layout/page-header.tsx";
import { getBrands } from "@/services";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { BrandDataTable } from "./data-table";
import { brandTableColumns } from "./brand-table-columns";

const BrandList = async () => {
  const brands = await getBrands();

  return (
    <section>
      <PageHeader>Brands</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        {!brands || !brands.length ? (
          <Alert>
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        ) : (
          <BrandDataTable
            data={brands}
            columns={brandTableColumns}
          />
        )}
      </section>
    </section>
  );
};
export default BrandList;
