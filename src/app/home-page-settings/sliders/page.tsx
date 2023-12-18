import PageHeader from "@/components/layout/page-header.tsx";
import AddSlider from "./add-slider";

const SlidersPage = () => {
  return (
    <section>
      <PageHeader>Sliders</PageHeader>

      <main className="p-[var(--paddingOffset)]">
        <AddSlider />
      </main>
    </section>
  );
};
export default SlidersPage;
