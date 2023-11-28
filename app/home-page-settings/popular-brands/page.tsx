import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddNewBrandButton from "@/components/HomePageSettings/AddNewPopularBrand";
import Brand from "@/components/HomePageSettings/Brand";
import BrandDropdownButton from "@/components/HomePageSettings/BrandCardDropdown";
import UpdateCacheBtn from "@/components/UpdateCache/UpdateCacheBtn";
import {
  TBrandSchema,
  THomeSettingApiSchema,
  getSettingContentByPageSlug,
} from "@/services";
import { HOME_SETTINGS_OPTIONS } from "@/util/constants";
import { Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";

const PopularBrands = async () => {
  const data = await getSettingContentByPageSlug(
    HOME_SETTINGS_OPTIONS.popularBrands
  );

  function getContent() {
    switch (typeof data) {
      case "string":
        return renderErrorMessage(data);

      case "object": {
        return renderSettingContent(data);
      }

      default:
        return renderDefaultContent();
    }
  }

  function renderErrorMessage(data: string) {
    return (
      <div className="card w-full max-w-[700px] flex gap-3 items-center">
        <span className="flex-shrink-0">
          <InfoIcon size={30} />
        </span>
        <Text
          size="4"
          color="red"
        >
          {data}
        </Text>
      </div>
    );
  }

  function renderSettingContent(data: THomeSettingApiSchema[]) {
    if (data.length === 0) {
      return (
        <h3 className="text-lg font-semibold">
          No item added yet to {HOME_SETTINGS_OPTIONS.popularBrands}
        </h3>
      );
    } else {
      return (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
          {data.map((brand) => (
            <div
              key={brand._id}
              className="flex flex-col gap-5 card"
            >
              <Brand
                key={brand._id}
                brand={brand.content as TBrandSchema}
              />

              <BrandDropdownButton
                item={brand}
                pageSlug={HOME_SETTINGS_OPTIONS.popularBrands}
              />
            </div>
          ))}
        </section>
      );
    }
  }

  function renderDefaultContent() {
    return (
      <div className="card w-full max-w-[700px] flex gap-3 items-center">
        <Text
          size="4"
          color="red"
        >
          Something went wrong! Try loading again later.
        </Text>
      </div>
    );
  }

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

      {getContent()}
    </div>
  );
};
export default PopularBrands;
