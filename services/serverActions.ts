"use server";

import { revalidateTag } from "next/cache";

export async function invalidateAdminCache(tags: string[]) {
  tags.forEach((tag) => revalidateTag(tag));
}
