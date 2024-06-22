import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

import PageHeader from "@/components/layout/page-header.tsx";
import VendorDataTableShell from "./components/vendor-data-table-shell";
import { vendorService } from "@/services/vendor";

const VendorListPage = async () => {
  const vendors = await vendorService.getVendors();

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
        ) : (
          <VendorDataTableShell data={vendors.data ?? []} />
        )}
      </section>
    </>
  );
};
export default VendorListPage;
