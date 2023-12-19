import Car from "@/components/home-page-settings/car";
import PageHeader from "@/components/layout/page-header.tsx";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TCarSchema, getSettingContentByPageSlug } from "@/services";
import { InfoIcon } from "lucide-react";
import { Fragment } from "react";

type Props = {
  params: {
    settings: string;
  };
};

const HomeSettingsSectionPage = async (props: Props) => {
  const pageSlug = props.params.settings;

  const res = await getSettingContentByPageSlug(pageSlug);

  return (
    <Fragment>
      <PageHeader>Home Page Settings</PageHeader>

      <section className="p-[var(--paddingOffset)]">
        {res.message && (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              {res.message}
            </AlertTitle>
          </Alert>
        )}

        {res.data && !res.data.length && (
          <Alert className="max-w-md mx-auto">
            <AlertTitle className="flex gap-2 items-center">
              <InfoIcon />
              Nothing is added yet
            </AlertTitle>
          </Alert>
        )}

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
          {res.data &&
            res.data.map((item) => (
              <li key={item._id}>
                <Car item={item} />
              </li>
            ))}
        </ul>
      </section>
    </Fragment>
  );
};

export default HomeSettingsSectionPage;
