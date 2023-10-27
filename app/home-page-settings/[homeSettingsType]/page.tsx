import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCars } from "@/services";

const SettingTypePage = ({ params }: { params: { homeSettingsType: string } }) => {
  const homeSettingsType = params.homeSettingsType;

  const cars = getCars();

  return (
    <div>
      <Breadcrumb pageName="Home Page Settings" />

      <section className="flex flex-col gap-5">
        <button className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-sm self-end">
          Add New
        </button>
      </section>
      {/* {!cars ? null : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
          {cars.map((car) => (
            <Car
              key={car._id}
              car={car}
            />
          ))}
        </section>
      )} */}
    </div>
  );
};
export default SettingTypePage;
