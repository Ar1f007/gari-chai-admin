import AddCarPartForm from "@/components/home-page-settings/add-car-part";
import PageHeader from "@/components/layout/page-header.tsx";
import { getSettingContentByPageSlug } from "@/services";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import CarPart from "@/components/home-page-settings/car-part";

const CarPartsHomePageSettings = async () => {
  const res = await getSettingContentByPageSlug(HOME_SETTINGS_OPTIONS.carParts);

  return (
    <section>
      <PageHeader>Car Parts</PageHeader>

      <section className="p-[var(--paddingOffset)] space-y-5">
        <AddCarPartForm />

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
              No item added yet to {HOME_SETTINGS_OPTIONS.carParts}
            </h3>
          ) : (
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 cursor-pointer">
              {res.data.map((carPart) => (
                <CarPart
                  key={carPart._id}
                  item={carPart}
                />
              ))}
            </section>
          ))}
      </section>
    </section>
  );
};
export default CarPartsHomePageSettings;
