import { AddEditCarForm } from "@/components/AddEditCar";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const AddCarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Add Car" />
      <AddEditCarForm formTitle="Add New Car" />
    </>
  );
};
export default AddCarPage;
