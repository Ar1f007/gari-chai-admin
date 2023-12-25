import PageHeader from "@/components/layout/page-header.tsx";
import { DataTable } from "@/components/shared/data-table";
import { carTableColumns } from "./_components/columns";
import { getCars } from "@/services";
import { SearchParams } from "@/types/others";
import { Shell } from "@/components/shared/shell";

const CarsPage = async ({ searchParams }: SearchParams) => {
  const cars = await getCars();

  return (
    <>
      <PageHeader>Cars</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        <Shell>
          <DataTable
            columns={carTableColumns}
            data={cars ?? []}
            defaultVisibleColumns={{}}
          />
        </Shell>
      </section>
    </>
  );
};
export default CarsPage;
