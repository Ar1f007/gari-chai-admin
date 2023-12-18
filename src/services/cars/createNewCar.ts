import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints, invalidateAdminCache } from "..";
import { NewCarInputs } from "@/schemas/new-car";

export type TCreateNewCarParams = Omit<NewCarInputs, "posterImage"> & {
  posterImage: {
    originalUrl: string;
    thumbnailUrl: string;
  };
};

export async function createNewCar(payload: TCreateNewCarParams) {
  try {
    const res = await apiFetch(endpoints.api.cars.createNewCar, {
      method: ReqMethod.POST,
      body: payload,
    });

    invalidateAdminCache([TAGS.brands, TAGS.cars]);

    return res;
  } catch (e) {
    return null;
  }
}
