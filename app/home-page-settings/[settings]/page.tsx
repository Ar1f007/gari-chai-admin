import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Car } from "@/components/Cards/Car";

import AddNewButton from "@/components/HomePageSettings/AddNewButton";
import DropdownButton from "@/components/HomePageSettings/DropdownButton";
import UpdateCacheBtn from "@/components/UpdateCache/UpdateCacheBtn";
import { getSettingContentByPageSlug } from "@/services/home/getSettingContentByPageSlug";

type SettingTypeProps = {
  params: {
    settings: string;
  };
};
const HomepageSettingsSectionPage = async (props: SettingTypeProps) => {
  const pageSlug = props.params.settings;

  const contents = await getSettingContentByPageSlug(pageSlug);

  return (
    <div>
      <Breadcrumb pageName="Home Page Settings" />

      <section className="flex gap-5 mb-5 justify-end">
        <UpdateCacheBtn
          tag="all"
          title="Update All Cache Settings"
        />
        <UpdateCacheBtn
          tag={pageSlug}
          title={`Update ${pageSlug} cache (Main UI)`}
        />

        <AddNewButton />
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
        {!contents ? (
          <p className="text-lg w-full">
            Something went wrong! Try loading again later.
          </p>
        ) : contents.length === 0 ? (
          <h3 className="text-lg font-semibold">
            No item added yet to {pageSlug}
          </h3>
        ) : (
          contents.map((car) => (
            <div
              key={car._id}
              className="flex flex-col gap-5"
            >
              <Car car={car.content} />
              <DropdownButton
                item={car}
                pageSlug={pageSlug}
              />
            </div>
          ))
        )}
      </section>
    </div>
  );
};
export default HomepageSettingsSectionPage;
