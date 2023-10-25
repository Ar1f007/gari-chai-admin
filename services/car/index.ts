import { TCarApiServerData, TCarServerPayload } from "@/types/car";
import { TApiData, TApiError } from "@/types/others";

export async function createNewCar(payload: TCarServerPayload) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_V1_URL! + "/cars", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData: TApiData<TCarApiServerData> | TApiError = await res.json();

    return jsonData;
  } catch (error) {
    return null;
  }
}
