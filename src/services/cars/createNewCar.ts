import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";
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

    return res;
  } catch (e) {
    return null;
  }
}
