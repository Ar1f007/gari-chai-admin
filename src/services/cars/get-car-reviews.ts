import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";
import { Todo } from "@/types";
import { z } from "zod";
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
      next: {
        revalidate: 0,
      },
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
