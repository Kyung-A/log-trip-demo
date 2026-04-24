"use client";

import { useEffect, useState, useMemo } from "react";

import { useDiary } from "@/features/diary";
import {
  getRegions,
  getGeoJson,
  IGeoJson,
  IOptionsParams,
} from "@/features/region";
import { WorldMap } from "@/features/world-map";
import { MapSplashScreen } from "@/features/world-map/ui/MapSplashScreen";
import { buildOr } from "@/shared";
import { COUNTRY_COLORS } from "@/shared/data/countryColors";

export default function WorldMapPage() {
  const { data } = useDiary();
  const [geoJson, setGeoJson] = useState<IGeoJson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 데이터 가공 (useMemo로 최적화)
  const diaryRegions = useMemo(() => {
    return data.flatMap((diary) =>
      diary.diary_regions.map((region) => ({
        diary_id: diary.id,
        region_code: region.region_code,
        created_at: diary.travel_date,
        country_code: region.country_code,
        region_name: region.region_name,
        country_name: region.country_name,
        shape_name: region.shape_name,
        diaries: { user_id: diary.user_id },
      })),
    );
  }, [data]);

  const uniqueByCountry = useMemo(() => {
    return Array.from(
      new Map(diaryRegions.map((item) => [item.region_code, item])).values(),
    ).map((v) => ({
      region_code: v.region_code,
      shape_name: v.shape_name,
      country_code: v.country_code,
    }));
  }, [diaryRegions]);

  // 2. 비동기 데이터 로딩 (useEffect)
  useEffect(() => {
    const fetchGeoJson = async () => {
      setIsLoading(true);
      try {
        const filterString = buildOr(uniqueByCountry);
        if (!filterString || uniqueByCountry.length === 0) {
          setGeoJson([]);
          return;
        }

        const rowRegions = (await getRegions(filterString)) || [];

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
            console.error(`Failed to fetch GeoJSON:`, err);
            return null;
          }
        });

        const results = await Promise.all(geoJsonPromises);
        setGeoJson(results.filter((r): r is IGeoJson => r !== null));
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoJson();
  }, [uniqueByCountry]);

  return (
    <>
      <WorldMap geoJson={geoJson} />
      {isLoading && <MapSplashScreen />}
    </>
  );
}
