import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddEditNewCarForm } from "@/components/AddEditCar";

const AddCarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Add Car" />
      <AddEditNewCarForm formTitle="Add New Car" />
    </>
  );
};
export default AddCarPage;
