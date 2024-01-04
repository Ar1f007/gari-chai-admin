import PageHeader from "@/components/layout/page-header.tsx";
import AddVendorForm from "./components/add-vendor-form";

const AddVendorPage = () => {
  return (
    <>
      <PageHeader>Add Vendor</PageHeader>

      <div className="max-w-lg my-8 px-4 xl:px-8">
        <AddVendorForm />
      </div>
    </>
  );
};
export default AddVendorPage;
