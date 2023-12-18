import PageHeader from "@/components/layout/page-header.tsx";
import AddSlider from "./add-slider";
import SliderList from "./slider-list";

const SlidersPage = () => {
  return (
    <section>
      <PageHeader>Sliders</PageHeader>

      <main className="p-[var(--paddingOffset)] space-y-8">
        <AddSlider />
        <SliderList />
      </main>
    </section>
  );
};
export default SlidersPage;
