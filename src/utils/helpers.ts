import { TBrandSchema } from "@/services";

export function getFormattedBrandOptions<
  T extends TBrandSchema,
  U extends boolean = false
>(data: T[], getFullDocumentAsValue = false) {
  return data.map((item) => ({
    value: getFullDocumentAsValue ? item : item._id,
    label: item.name,
  })) as {
    value: U extends true ? T : string;
    label: string;
  }[];
}
