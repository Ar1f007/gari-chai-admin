import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TCarSchema, endpoints } from "..";

type DeleteCarProps = {
  doc: TCarSchema;
};

export async function deleteCar({ doc }: DeleteCarProps) {
  const endpoint =
    doc.carType == "new"
      ? endpoints.api.cars.base
      : endpoints.api.usedCars.base;

  return await apiFetch(endpoint, {
    method: ReqMethod.DELETE,
    body: {
      _id: doc._id,
      name: doc.name,
    },
  });
}
