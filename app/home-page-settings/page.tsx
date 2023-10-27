import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

const HomePageSettings = async () => {
  // const cars = await getCars();

  return (
    <div className="pl-5">
      <Breadcrumb pageName="Home Page Settings" />

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

export default HomePageSettings;
