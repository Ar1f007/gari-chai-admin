import PageHeader from "@/components/layout/page-header.tsx";
import { getCarPart } from "@/services/cars/car-parts";
import { notFound } from "next/navigation";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { AddPart } from "@/components/parts/add-part";

type EditCarPartProps = {
  params: {
    slug: string;
  };
};

const CarPartEditPage = async ({ params }: EditCarPartProps) => {
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const carPart = await getCarPart(slug);

  function getContent() {
    if (carPart.message || !carPart.data) {
      return (
        <Alert className="max-w-md mx-auto">
          <AlertTitle className="flex gap-2 items-center">
            <InfoIcon />
            {carPart.message}
          </AlertTitle>
        </Alert>
      );
    }

    return (
      <AddPart
        isEditing
        data={carPart.data}
      />
    );
  }

  return (
    <>
      <PageHeader>Edit Car Part</PageHeader>
      <main className="px-[var(--pagePaddingInline)] py-[var(--pagePaddingBlock)]">
        {getContent()}
      </main>
    </>
  );
};

export default CarPartEditPage;
