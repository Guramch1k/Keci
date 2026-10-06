import { NextResponse } from "next/server";

type OverpassElement = {
  id: number;
  type: "node" | "way" | "relation";
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

export async function GET() {
  const query = `
    [out:json][timeout:60];

    (
      nwr["amenity"="restaurant"](41.61,41.59,41.69,41.69);
    );

    out center tags;
  `;

  try {
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          "User-Agent":
            "Keci/1.0 (restaurant discovery app)",
        },

        body: query,

        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Overpass returned " + response.status
      );
    }

    const data = await response.json();

    const restaurants = (
      data.elements as OverpassElement[]
    )
      .map((item) => {
        const lat =
          item.lat ?? item.center?.lat;

        const lng =
          item.lon ?? item.center?.lon;

        const tags = item.tags ?? {};

        if (
          lat == null ||
          lng == null ||
          !tags.name
        ) {
          return null;
        }

        return {
          id:
            item.type +
            "-" +
            item.id,

          name: tags.name,

          lat,

          lng,

          cuisine:
            tags.cuisine || "",

          address:
            tags["addr:street"] ||
            tags["addr:place"] ||
            tags["addr:housenumber"] ||
            "",

          phone:
            tags.phone ||
            tags["contact:phone"] ||
            "",

          website:
            tags.website ||
            tags["contact:website"] ||
            "",

          openingHours:
            tags.opening_hours || "",
        };
      })
      .filter(Boolean);

    return NextResponse.json(
      restaurants
    );
  } catch (error) {
    console.error(
      "Restaurant API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Не удалось загрузить рестораны",
      },
      {
        status: 502,
      }
    );
  }
}
