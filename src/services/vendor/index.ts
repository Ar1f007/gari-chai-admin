import { AddVendorSchema, addVendorSchema } from "@/schemas/add-vendor";
import { ReqMethod, endpoints } from "..";
import { apiFetch } from "@/lib/api-fetch";
import { z } from "zod";
import { TVendorSchema, vendorSchema } from "@/schemas/vendor";
import { TApiError } from "@/types/others";

async function add(payload: AddVendorSchema) {
  const url = endpoints.api.vendors.base;
  return apiFetch(url, {
    method: ReqMethod.POST,
    body: payload,
    includeCredentials: false,
  });
}

async function getVendors() {
  const url = endpoints.api.vendors.base;
  try {
    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        revalidate: 0,
      },
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

async function deleteVendor(id: string) {
  const url = endpoints.api.vendors.base;

  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}

async function updateVendorInfo(payload: Partial<TVendorSchema>) {
  try {
    const url = endpoints.api.vendors.base + "/" + payload._id;

    const res = await apiFetch<TVendorSchema>(url, {
      method: ReqMethod.PATCH,
      body: payload,
    });

    return res;
  } catch (error) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);

    return {
      status: "error",
      message:
        process.env.NODE_ENV == "development" ? msg : "Something Went Wrong",
    } as TApiError;
  }
}

export const vendorService = {
  add,
  getVendors,
  deleteVendor,
  updateVendorInfo,
};
