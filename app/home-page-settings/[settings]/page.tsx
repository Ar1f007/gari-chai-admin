import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Car } from "@/components/Cards/Car";

import AddNewButton from "@/components/HomePageSettings/AddNewButton";
import DropdownButton from "@/components/HomePageSettings/DropdownButton";
import UpdateCacheBtn from "@/components/UpdateCache/UpdateCacheBtn";
import { TCarSchema } from "@/services";
import {
  THomeSettingApiSchema,
  getSettingContentByPageSlug,
} from "@/services/home/getSettingContentByPageSlug";
import { Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";

type SettingTypeProps = {
  params: {
    settings: string;
  };
};
const HomepageSettingsSectionPage = async (props: SettingTypeProps) => {
  const pageSlug = props.params.settings;

  const data = await getSettingContentByPageSlug(pageSlug);

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
          No item added yet to {pageSlug}
        </h3>
      );
    } else {
      return (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
          {data.map((car) => (
            <div
              key={car._id}
              className="flex flex-col gap-5"
            >
              <Car car={car.content as TCarSchema} />
              <DropdownButton
                item={car}
                pageSlug={pageSlug}
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
          tag={pageSlug}
          title={`Update ${pageSlug} cache (Main UI)`}
        />

        <AddNewButton />
      </section>

      {getContent()}
    </div>
  );
};
export default HomepageSettingsSectionPage;
