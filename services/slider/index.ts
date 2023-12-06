import { apiFetch } from "@/lib/apiFetch";
import { EditSliderInputs, SliderInputs } from "@/schema/slider";
import { ReqMethod, TAGS, endpoints } from "..";

type CreateSliderInput = {
  imgUrl: string;
  type: "desktop" | "mobile";
} & Omit<SliderInputs, "sliderImg" | "type">;

type UpdateSliderParams = {
  id: string;

  slider: {
    status: "active" | "hidden";
    type: "desktop" | "mobile";
    showTitle: boolean;
    imgUrl: string;
  } & Omit<EditSliderInputs, "sliderImg" | "type" | "status">;
};

export type TSlider = Omit<CreateSliderInput, "type"> & {
  _id: string;
  sort: number;
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
      next: {
        tags: [TAGS.sliders],
      },
    });
  },

  async updateSlider(payload: UpdateSliderParams) {
    const url = endpoints.api.homeSettings.sliderBaseUrl + "/" + payload.id;

    return apiFetch<TSlider>(url, {
      method: ReqMethod.PUT,
      body: payload.slider,
    });
  },

  async deleteSlider(id: string) {
    const url = endpoints.api.homeSettings.sliderBaseUrl + "/" + id;
    return apiFetch(url, {
      method: ReqMethod.DELETE,
    });
  },
};
