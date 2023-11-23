import { SelectOption } from "./others";
import dayjs from "dayjs";

// TODO: FIND OUT WHY IT IS USED, IF POSSIBLE REMOVE IT
export type TCarCreatePayload = {
  name: string;
  brand: string;
  brandModel: string;
  registrationYear: number;
  modelNumber: number;
  transmission: string;
  bodyStyle: string;
  color: string;
  mileage: number;
  baseInteriorColor: string;
  numberOfDoors: number;

  year: number;
  description?: string;
  engine: {
    type: string;
    displacement?: number;
    horsePower?: number;
    torque?: number;
  };

  fuel?: {
    type: string;
    economy?: {
      city?: number;
      highway?: number;
    };
  };
  acceleration?: {
    zeroTo60?: number;
    topSpeed?: number;
  };
  safetyFeatures?: string;
  infotainmentSystem?: string;
  imageUrls?: string[];
  posterImage: {
    originalUrl: string;
    thumbnailUrl: string;
  };
  price: number;
  tags: SelectOption<string>[];
  launchedAt: dayjs.Dayjs;
};
