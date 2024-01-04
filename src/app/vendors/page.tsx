import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

import PageHeader from "@/components/layout/page-header.tsx";

const VendorListPage = () => {
  const vendors = {
    message: null,
    data: [],
  };

  return (
    <>
      <PageHeader>Vendors</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        {vendors.message ? (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              {vendors.message}
            </AlertTitle>
          </Alert>
        ) : // <BrandDataTable
        //   data={brands.data}
        //   columns={brandTableColumns}
        // />
        null}
      </section>
    </>
  );
};
export default VendorListPage;
