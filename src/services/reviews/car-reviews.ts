import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TAGS, endpoints, getCookie } from "..";
import { TCarsReview, carReviewSchema } from "@/schemas/reviews";
import { TPagination } from "@/types/others";

type GetCarsReviewsData = {
  results: TCarsReview[];
  pagination: TPagination;
};

export async function getCarReviews(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.reviews.carReviews;

    const url = queryParams?.length ? `${baseUrl}?${queryParams}` : baseUrl;
    const res = await apiFetch<GetCarsReviewsData>(url, {
      method: ReqMethod.GET,
      cache: "no-store",
      headers: { Cookie: await getCookie() },
    });

    if (res.status === "success") {
      const parsedData = z.array(carReviewSchema).safeParse(res.data.results);

      if (parsedData.success) {
        return {
          data: {
            reviews: parsedData.data,
            pagination: res.data.pagination,
          },
          message: null,
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
      message: res.message || "Something went wrong, please try again later.",
    };
  } catch (e) {
    return {
      data: null,
      message: "Something went wrong, please try again later.",
    };
  }
}

export async function updateCarReview(payload: TCarsReview) {
  const url = endpoints.api.reviews.updateReviews + "/" + payload._id;
  return apiFetch<TCarsReview>(url, {
    method: ReqMethod.PATCH,
    body: payload,
  });
}
