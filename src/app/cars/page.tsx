import PageHeader from "@/components/layout/page-header.tsx";
import { getCars } from "@/services";
import { SearchParams } from "@/types";
import { Shell } from "@/components/shared/shell";
import { CarsTableShell } from "./_components/cars-table-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { objectToQueryString } from "@/lib/utils";

const CarsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = objectToQueryString(searchParams);

  const res = await getCars(params);

  return (
    <>
      <PageHeader>Cars</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        <Shell>
          {/* Pass the DataTable component through the TasksTableShell component to memoize the columns which can not be done on react-server-components */}
          {res.message ? (
            <Alert className="max-w-md mx-auto">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{res.message}</AlertDescription>
            </Alert>
          ) : (
            <CarsTableShell
              data={res.data ? res.data.cars : []}
              pageCount={res.data?.pagination.totalPages || 1}
            />
          )}
        </Shell>
      </section>
    </>
  );
};
export default CarsPage;
