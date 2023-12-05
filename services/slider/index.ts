import { apiFetch } from "@/lib/apiFetch";
import { SliderInputs } from "@/schema/slider";
import { ReqMethod, endpoints } from "..";

type CreateSliderInput = {
  imgUrl: string;
  type: "desktop" | "mobile";
} & Omit<SliderInputs, "sliderImg" | "type">;

type TSlider = Omit<CreateSliderInput, "type"> & {
  _id: string;
  sort: string;
  status: "active" | "hidden";
  type: "desktop" | "mobile";
  createdAt: string;
  updatedAt: string;
};

export const sliderService = {
  async create(input: CreateSliderInput) {
    const url = endpoints.api.homeSettings.sliderBaseUrl;

    return apiFetch(url, {
      method: ReqMethod.POST,
      body: input,
    });
  },

  async getSliders() {
    const url = endpoints.api.homeSettings.sliderBaseUrl;

    return apiFetch<TSlider[]>(url, {
      method: ReqMethod.GET,
    });
  },
};
