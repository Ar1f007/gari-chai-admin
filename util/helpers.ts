type DefaultOptionProperties = {
  name: string;
  slug: string;
};

export function getFormattedBrandOptions<
  T extends DefaultOptionProperties,
  U extends boolean = false
>(data: T[], getFullDocumentAsValue = false) {
  return data.map((item) => ({
    value: getFullDocumentAsValue ? item : item.slug,
    label: item.name,
  })) as {
    value: U extends true ? T : string;
    label: string;
  }[];
}
