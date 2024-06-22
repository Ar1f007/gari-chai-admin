import { Suspense } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageHeader from "@/components/layout/page-header.tsx";
import PageContainer from "@/components/layout/page-container";
import { CarsTableShell } from "./_components/cars-table-shell";

import { objectToQueryString } from "@/lib/utils";
import { getCars } from "@/services";
import { SearchParams } from "@/types";

const CarsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = objectToQueryString(searchParams);

  const res = await getCars(params);

  return (
    <>
      <PageHeader>Cars</PageHeader>
      <PageContainer>
        <Suspense>
          {res.message ? (
            <Alert className="max-w-md mx-auto">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{res.message}</AlertDescription>
            </Alert>
          ) : (
            <CarsTableShell
              // Pass the DataTable component through the CarsTableShell component to
              // memoize the columns which can not be done on react-server-components
              data={res.data ? res.data.cars : []}
              pageCount={res.data?.pagination.totalPages || 1}
            />
          )}
        </Suspense>
      </PageContainer>
    </>
  );
};
export default CarsPage;
