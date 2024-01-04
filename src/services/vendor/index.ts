import { AddVendorSchema } from "@/schemas/add-vendor";
import { ReqMethod, endpoints } from "..";
import { apiFetch } from "@/lib/api-fetch";
import { z } from "zod";
import { vendorSchema } from "@/schemas/vendor";

async function add(payload: AddVendorSchema) {
  const url = endpoints.api.vendors.base;
  return apiFetch(url, {
    method: ReqMethod.POST,
    body: payload,
  });
}

async function getVendors() {
  const url = endpoints.api.vendors.base;
  try {
    const res = await apiFetch(url, {
      method: ReqMethod.GET,
    });

    if (!res) {
      return {
        data: [],
        message: "Something went wrong",
      };
    }

    if (res.status === "success") {
      const parsedData = z.array(vendorSchema).safeParse(res.data);

      if (parsedData.success) {
        return {
          data: parsedData.data,
          message: null,
        };
      } else {
        return {
          data: [],
          message: "Invalid Input",
        };
      }
    }

    return {
      data: [],
      message: res.message,
    };
  } catch (error) {
    return {
      data: [],
      message: "Something went wrong",
    };
  }
}

export const vendorService = {
  add,
  getVendors,
};
