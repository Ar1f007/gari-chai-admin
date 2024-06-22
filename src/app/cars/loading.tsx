import { DataTableLoading } from "@/components/shared/data-table/data-table-loading";
import { Shell } from "@/components/shared/shell";

const loading = () => {
  return (
    <Shell>
      <DataTableLoading columnCount={4} />
    </Shell>
  );
};
export default loading;
