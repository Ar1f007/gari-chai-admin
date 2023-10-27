import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBrands } from "@/services";

const BrandsPage = async () => {
  const brands = await getBrands();

  if (!brands) {
    return null;
  }

  return (
    <>
      <Breadcrumb pageName="Brands" />
      <ul>
        {brands.map((brand) => (
          <li key={brand._id}>{brand.name}</li>
        ))}
      </ul>
    </>
  );
};
export default BrandsPage;
