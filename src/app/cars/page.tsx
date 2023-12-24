import PageHeader from "@/components/layout/page-header.tsx";
import { DataTable } from "@/components/shared/data-table";
import { carTableColumns } from "./columns";
import { getCars } from "@/services";

const CarsPage = async () => {
  const cars = await getCars();

  return (
    <>
      <PageHeader>Cars</PageHeader>
      <section className="p-[var(--paddingOffset)]">
        <DataTable
          columns={carTableColumns}
          data={cars ?? []}
        />
      </section>
    </>
  );
};
export default CarsPage;
