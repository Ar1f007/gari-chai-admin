import { apiFetch } from "@/lib/api-fetch";
import { Todo } from "@/types";
import { z } from "zod";
import { endpoints } from "../endpoints";
import { ReqMethod } from "../serviceHelper";

export async function createCarPart(payload: Todo) {
  return apiFetch(endpoints.api.cars.parts, {
    method: ReqMethod.POST,
    body: payload,
  });
}
