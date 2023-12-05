import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddSlider } from "@/components/Sliders/AddSlider";
import { SliderList } from "@/components/Sliders/SliderList";

const SliderPage = () => {
  return (
    <>
      <Breadcrumb pageName="Home Sliders" />

      <div className="flex flex-col space-y-5">
        <AddSlider />
        <SliderList />
      </div>
    </>
  );
};
export default SliderPage;
