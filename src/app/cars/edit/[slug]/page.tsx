import EditNewCarForm from "@/components/form/edit-new-car";
import PageHeader from "@/components/layout/page-header.tsx";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getCar } from "@/services/cars/getCar";
import { InfoIcon } from "lucide-react";
import { notFound } from "next/navigation";

type EditCarProps = {
  params: {
    slug: string;
  };
};

const EditCarPage = async ({ params }: EditCarProps) => {
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const car = await getCar({ slug: slug, carType: "new-car" });

  function getContent() {
    if (car.message || !car.data) {
      return (
        <Alert className="max-w-md mx-auto">
          <AlertTitle className="flex gap-2 items-center">
            <InfoIcon />
            {car.message}
          </AlertTitle>
        </Alert>
      );
    }

    return <EditNewCarForm data={car.data} />;
  }

  return (
    <section>
      <PageHeader>Edit Car</PageHeader>
      <main className="p-[var(--paddingOffset)]">{getContent()}</main>
    </section>
  );
};
export default EditCarPage;
