import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddNewBrandButton from "@/components/HomePageSettings/AddNewPopularBrand";
import UpdateCacheBtn from "@/components/UpdateCache/UpdateCacheBtn";
import { HOME_SETTINGS_OPTIONS } from "@/util/constants";

const PopularBrands = () => {
  return (
    <div>
      <Breadcrumb pageName="Home Page Settings" />
      <section className="flex gap-5 mb-5 justify-end">
        <UpdateCacheBtn
          tag="all"
          title="Update All Cache Settings"
        />
        <UpdateCacheBtn
          tag={HOME_SETTINGS_OPTIONS.popularBrands}
          title={`Update ${HOME_SETTINGS_OPTIONS.popularBrands} cache (Main UI)`}
        />

        <AddNewBrandButton />
      </section>
    </div>
  );
};
export default PopularBrands;
