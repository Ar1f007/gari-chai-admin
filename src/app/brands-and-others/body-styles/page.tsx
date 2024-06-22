import PageHeader from "@/components/layout/page-header.tsx";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { BrandDataTable } from "./data-table";
import { bodyStylesTableColumns } from "./body-style-table-columns";
import { getBodyStyles } from "@/services/body-styles/getBodyStyles";

const CarBodyStyles = async () => {
  const res = await getBodyStyles();

  return (
    <section>
      <PageHeader>Car Body Styles</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        {res.message ? (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              {res.message}
            </AlertTitle>
          </Alert>
        ) : (
          <BrandDataTable
            data={res.data}
            columns={bodyStylesTableColumns}
          />
        )}
      </section>
    </section>
  );
};
export default CarBodyStyles;
