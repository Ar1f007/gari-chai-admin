import AddEditBrand from "@/components/AddEditBrand";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const AddBrandPage = () => {
  return (
    <section>
      <Breadcrumb pageName="Add Brand" />
      <AddEditBrand formTitle="Add Brand" />
    </section>
  );
};
export default AddBrandPage;
