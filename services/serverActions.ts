"use server";

import { revalidateTag } from "next/cache";

export async function invalidateTag(tag: string) {
  revalidateTag(tag);
}
