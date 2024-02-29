import { Suspense } from "react";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { objectToQueryString } from "@/lib/utils";
import { getCarReviews } from "@/services/cars/get-car-reviews";
import { SearchParams } from "@/types";
import ReviewDataTableShell from "./_components/review-data-table-shell";

const CarsReviews = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = objectToQueryString(searchParams);

  const res = await getCarReviews(params);
  console.log(res);
  return (
    <>
      <PageHeader>Car Reviews</PageHeader>
      <PageContainer>
        <Suspense>
          {res.message ? (
            <Alert className="max-w-md mx-auto">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{res.message}</AlertDescription>
            </Alert>
          ) : (
            <ReviewDataTableShell
              // Pass the DataTable component through the CarsTableShell component to
              // memoize the columns which can not be done on react-server-components
              data={res.data ? res.data.reviews : []}
              pageCount={res.data?.pagination.totalPages || 1}
            />
          )}
        </Suspense>
      </PageContainer>
    </>
  );
};
export default CarsReviews;
