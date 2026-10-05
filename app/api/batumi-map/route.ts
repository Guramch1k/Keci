import { NextResponse } from "next/server";

export const revalidate = 86400;

const BBOX = {
  south: 41.620,
  west: 41.625,
  north: 41.665,
  east: 41.680,
};

const OVERPASS_ENDPOINT =
  "https://overpass-api.de/api/interpreter";

function project(
  lat: number,
  lon: number
): [number, number] {
  const x =
    ((lon - BBOX.west) /
      (BBOX.east - BBOX.west)) *
    1000;

  const y =
    ((BBOX.north - lat) /
      (BBOX.north - BBOX.south)) *
    700;

  return [
    Number(x.toFixed(2)),
    Number(y.toFixed(2)),
  ];
}

export async function GET() {
  try {
    const query = `
      [out:json][timeout:90];

      (
        way["highway"]
          (${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});

        way["natural"="coastline"]
          (${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east});
      );

      out geom qt;
    `;

    const response = await fetch(
      OVERPASS_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=UTF-8",

          "User-Agent":
            "Keci Restaurant Discovery Map",
        },

        body: query,

        next: {
          revalidate: 86400,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Overpass error: ${response.status}`
      );
    }

    const data =
      await response.json();

    const roads: {
      coordinates: [number, number][];
      highway?: string;
    }[] = [];

    const coastline: {
      coordinates: [number, number][];
    }[] = [];

    for (const element of data.elements ?? []) {

      if (!element.geometry) {
        continue;
      }

      const coordinates =
        element.geometry.map(
          (point: {
            lat: number;
            lon: number;
          }) =>
            project(
              point.lat,
              point.lon
            )
        );

      if (
        element.tags?.natural ===
        "coastline"
      ) {
        coastline.push({
          coordinates,
        });

        continue;
      }

      if (element.tags?.highway) {
        roads.push({
          coordinates,
          highway:
            element.tags.highway,
        });
      }
    }

    return NextResponse.json({
      bbox: BBOX,
      roads,
      coastline,
    });

  } catch (error) {

    console.error(
      "Batumi map error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Не удалось получить геометрию Батуми",
      },
      {
        status: 500,
      }
    );
  }
}
