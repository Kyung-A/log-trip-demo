import {
  ICountry,
  IRegion,
  getRegions,
  IGeoJson,
  IOptionsParams,
  getGeoJson,
} from "@/features/region";
import { WorldMap } from "@/features/world-map";

import { fakeDiaryRegions } from "@/shared/data";
import { COUNTRY_COLORS } from "@/shared/data/countryColors";
import { DEMO_USER_ID } from "@/shared/data/fake-user";

import { buildOr } from "@/shared";

export default async function WorldMapPage() {
  const diaryRegions = fakeDiaryRegions;

  const uniqueByCountry: ICountry[] = diaryRegions
    ? Array.from(
        new Map(diaryRegions.map((item) => [item.region_code, item])).values(),
      ).map((v) => ({
        region_code: v.region_code,
        shape_name: v.shape_name,
        country_code: v.country_code,
      }))
    : [];

  let rowRegions: IRegion[] = [];
  const filterString = buildOr(uniqueByCountry);

  if (filterString) {
    const data = await getRegions(filterString);
    rowRegions = data || [];
  }

  const getFullGeoJsonData = async (): Promise<IGeoJson[]> => {
    if (!rowRegions.length || !uniqueByCountry.length) return [];

    const coloredParams: IOptionsParams[] = rowRegions.reduce((acc, c) => {
      const matched = COUNTRY_COLORS.find(
        (color) => color.country_code === c.country_code,
      );
      if (matched) acc.push({ ...c, color: matched.color });
      return acc;
    }, [] as IOptionsParams[]);

    const geoJsonPromises = coloredParams.map(async (param) => {
      try {
        const resp = await getGeoJson(
          param.api_url,
          param.region_code,
          param.shape_name,
        );
        return {
          id: param.region_code,
          color: param.color,
          type: "FeatureCollection",
          features: resp,
        } as IGeoJson;
      } catch (err) {
        console.error(`Failed to fetch GeoJSON for ${param.region_code}:`, err);
        return null;
      }
    });

    const results = await Promise.all(geoJsonPromises);
    return results.filter((r): r is IGeoJson => r !== null);
  };

  const finalGeoJson = await getFullGeoJsonData();
  return <WorldMap geoJson={finalGeoJson} userId={DEMO_USER_ID} />;
}
