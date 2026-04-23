import { createBrowserClient } from "@supabase/ssr";
import { unstable_cache } from "next/cache";

import { IRegion } from "..";

export const getRegions = async (
  filters?: string | null,
): Promise<IRegion[] | null> => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
  );

  const fetchRegions = unstable_cache(
    async () => {
      let q = supabase.from("adm_regions").select("*");
      if (filters) {
        q = q.or(filters);
      }
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    ["all-regions", filters ?? "default"],
    { tags: ["all-regions"] },
  );

  return await fetchRegions();
};
