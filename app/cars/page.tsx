import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCars } from "@/services";

const CarsPage = async () => {
  const cars = await getCars();

  if (!cars) {
    throw new Error("Cars data missing");
  }

  return (
    <section>
      <Breadcrumb pageName="Cars" />
      <ul>
        {cars.map((car) => (
          <li key={car._id}>{car.name}</li>
        ))}
      </ul>
    </section>
  );
};
export default CarsPage;
