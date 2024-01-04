import { AddVendorSchema } from "@/schemas/add-vendor";
import { ReqMethod, endpoints } from "..";
import { apiFetch } from "@/lib/api-fetch";

async function add(payload: AddVendorSchema) {
  const url = endpoints.api.vendors.base;
  return apiFetch(url, {
    method: ReqMethod.POST,
    body: payload,
  });
}

export const vendorService = {
  add,
};
