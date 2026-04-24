"use server";

const fetchAndFilterGeoJson = async (
  api_url: string,
  region_code: string,
  shape_name: string,
) => {
  if (!api_url) {
    return new Response("Missing api_url", { status: 400 });
  }

  const metaResp = await fetch(api_url);
  const metaRes = await metaResp.json();

  const geoUrl = metaRes?.simplifiedGeometryGeoJSON;
  if (!geoUrl) {
    return new Response("GeoJSON URL 없음", { status: 400 });
  }

  const geoResp = await fetch(geoUrl);
  const geoRes = await geoResp.json();

  const features = geoRes?.features ?? [];
  return features.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) =>
      f.properties?.shapeISO === region_code ||
      f.properties?.shapeName === shape_name,
  );
};

export const getGeoJson = async (
  api_url: string,
  region_code: string,
  shape_name: string,
) => {
  const getCachedGeoJson = await fetchAndFilterGeoJson(
    api_url,
    region_code,
    shape_name,
  );

  return getCachedGeoJson;
};
