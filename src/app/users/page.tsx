import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UsersTableShell } from "@/components/users/users-table-shell";
import { objectToQueryString } from "@/lib/utils";
import { getUsers } from "@/services/user";
import { SearchParams } from "@/types";
import { Suspense } from "react";

const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = objectToQueryString(searchParams);

  const res = await getUsers(params);

  return (
    <>
      <PageHeader>Users</PageHeader>

      <PageContainer>
        <Suspense>
          {res.message ? (
            <Alert className="max-w-md mx-auto">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{res.message}</AlertDescription>
            </Alert>
          ) : (
            <UsersTableShell
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
export default UsersPage;
