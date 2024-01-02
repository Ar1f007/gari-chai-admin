import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";
import { EditNewCarInputs } from "@/schemas/edit-new-car";

// export type TUpdateNewCarParams = Omit<EditNewCarInputs, "posterImage"> & {
//   posterImage: {
//     originalUrl: string;
//     thumbnailUrl: string;
//   };
// };

export async function updateNewCar(payload: EditNewCarInputs, carSlug: string) {
  try {
    const url = endpoints.api.cars.base + "/" + carSlug;
    const res = await apiFetch(url, {
      method: ReqMethod.PUT,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
