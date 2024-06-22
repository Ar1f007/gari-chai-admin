import AddPopularBrandsForm from "@/components/home-page-settings/add-popular-brands";
import Brand from "@/components/home-page-settings/brand";
import PageHeader from "@/components/layout/page-header.tsx";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getSettingContentByPageSlug } from "@/services";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import { InfoIcon } from "lucide-react";

const PopularBrandsPage = async () => {
  const res = await getSettingContentByPageSlug(
    HOME_SETTINGS_OPTIONS.popularBrands
  );

  return (
    <section>
      <PageHeader>Popular Brands</PageHeader>

      <section className="p-[var(--paddingOffset)] space-y-5">
        <AddPopularBrandsForm />

        {res.message && (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2">
              <InfoIcon className="shrink-0" />
              {res.message}
            </AlertTitle>
          </Alert>
        )}

        {res.data &&
          (res.data.length === 0 ? (
            <h3 className="text-lg font-semibold">
              No item added yet to {HOME_SETTINGS_OPTIONS.popularBrands}
            </h3>
          ) : (
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 cursor-pointer">
              {res.data.map((brand) => (
                <Brand
                  key={brand._id}
                  item={brand}
                />
              ))}
            </section>
          ))}
      </section>
    </section>
  );
};
export default PopularBrandsPage;
