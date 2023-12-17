import PageHeader from "@/components/layout/page-header.tsx";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { BrandDataTable } from "./data-table";
import { carModelTableColumns } from "./car-model-table-columns";
import { getCarModels } from "@/services/models/getCarModels";

const BrandList = async () => {
  const carModels = await getCarModels("get=all");
  console.log(carModels);
  return (
    <section>
      <PageHeader>Car Models</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        {carModels.message ? (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              {carModels.message}
            </AlertTitle>
          </Alert>
        ) : (
          <BrandDataTable
            data={carModels.data}
            columns={carModelTableColumns}
          />
        )}
      </section>
    </section>
  );
};
export default BrandList;
