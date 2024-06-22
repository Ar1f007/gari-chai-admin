import PageHeader from "@/components/layout/page-header.tsx";
import { AddPart } from "@/components/parts/add-part";

const AddPartsPage = () => {
  return (
    <section>
      <PageHeader>Add Parts</PageHeader>

      <main className="px-[var(--pagePaddingInline)] py-[var(--pagePaddingBlock)]">
        <div className="max-w-3xl mx-auto w-full">
          <AddPart />
        </div>
      </main>
    </section>
  );
};
export default AddPartsPage;
