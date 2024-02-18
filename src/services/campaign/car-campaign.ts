import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";
import { TCarCampaign, carCampaignSchema } from "@/schemas/campaign";
import { z } from "zod";

export async function createNewCarCampaign(payload: any) {
  try {
    const res = await apiFetch(endpoints.api.campaigns.cars, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}

export async function getAllCarCampaigns() {
  try {
    const res = await apiFetch<TCarCampaign[]>(endpoints.api.campaigns.cars, {
      method: ReqMethod.GET,
    });

    if (res.status == "success") {
      const parsedData = z.array(carCampaignSchema).safeParse(res.data);

      if (parsedData.success) {
        return {
          message: "",
          data: parsedData.data,
        };
      } else {
        return {
          data: null,
          message: "Invalid Input",
        };
      }
    }

    return {
      data: null,
      message: res.message || "Something went wrong",
    };
  } catch (error) {
    return {
      data: null,
      message: "Something went wrong",
    };
  }
}
