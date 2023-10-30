export type TCarServerPayload = {
  name: string;
  brand: {
    name: string;
    slug: string;
  };
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
};

export type TCarApiServerData = TCarServerPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
