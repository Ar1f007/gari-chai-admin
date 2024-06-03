import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { SearchParams } from "@/types";
import { objectToQueryString } from "@/lib/utils";
import { getCarParts } from "@/services/cars/car-parts";
import { CarPartsTableShell } from "@/components/parts/car-parts-table-shell";

const CarParts = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = objectToQueryString(searchParams);

  const res = await getCarParts(params);

  return (
    <>
      <PageHeader>Car Parts</PageHeader>

      <PageContainer>
        <Suspense>
          {res.message ? (
            <Alert className="max-w-md mx-auto">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{res.message}</AlertDescription>
            </Alert>
          ) : (
            <CarPartsTableShell
              // Pass the DataTable component through the CarsTableShell component to
              // memoize the columns which can not be done on react-server-components
              data={res.data ? res.data.carParts : []}
              pageCount={res.data?.pagination.totalPages || 1}
            />
          )}
        </Suspense>
      </PageContainer>
    </>
  );
};
export default CarParts;
