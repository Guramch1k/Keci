"use client";

import { useEffect, useMemo, useState } from "react";

type Place = {
  name: string;
  rating: string;
  type: string;
  lat: number;
  lng: number;
};

type Line = {
  coordinates: [number, number][];
  highway?: string;
};

type MapData = {
  roads: Line[];
  coastline: Line[];
  bbox: {
    south: number;
    west: number;
    north: number;
    east: number;
  };
};

type Props = {
  places: Place[];
  selected: string;
  onSelect: (name: string) => void;
};

function project(
  lat: number,
  lng: number,
  bbox: MapData["bbox"]
) {
  const x =
    ((lng - bbox.west) /
      (bbox.east - bbox.west)) *
    1000;

  const y =
    ((bbox.north - lat) /
      (bbox.north - bbox.south)) *
    700;

  return { x, y };
}

function linePath(
  coordinates: [number, number][]
) {
  return coordinates
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"} ${x} ${y}`
    )
    .join(" ");
}

function getRoadClass(highway?: string) {
  if (
    highway === "motorway" ||
    highway === "trunk" ||
    highway === "primary"
  ) {
    return "keciRoad keciRoadPrimary";
  }

  if (
    highway === "secondary" ||
    highway === "tertiary"
  ) {
    return "keciRoad keciRoadSecondary";
  }

  return "keciRoad";
}

export default function KeciMap({
  places,
  selected,
  onSelect,
}: Props) {
  const [map, setMap] =
    useState<MapData | null>(null);

  const [hovered, setHovered] =
    useState<string | null>(null);

  useEffect(() => {
    fetch("/api/batumi-map")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Не удалось получить карту"
          );
        }

        return res.json();
      })
      .then((data) => {
        setMap(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const points = useMemo(() => {
    if (!map) return [];

    return places.map((place) => ({
      ...place,
      ...project(
        place.lat,
        place.lng,
        map.bbox
      ),
    }));
  }, [places, map]);

  if (!map) {
    return (
      <div className="keciHomeMap keciMapLoading">
        <div className="keciMapLoadingLogo">
          keci<span>.</span>
        </div>

        <span>
          Загружаем карту Батуми…
        </span>
      </div>
    );
  }

  return (
    <div className="keciHomeMap">

      <div className="keciMapHeader">

        <div>
          <span>KECI MAP</span>
          <strong>BATUMI</strong>
        </div>

        <small>
          REAL CITY GEOMETRY
        </small>

      </div>

      <svg
        className="keciBatumiMap"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
      >

        {/* background */}

        <rect
          x="0"
          y="0"
          width="1000"
          height="700"
          className="keciMapBg"
        />

        {/* sea */}

        <path
          className="keciSea"
          d="
            M0 0
            H260
            C225 80 235 155 210 225
            C190 290 180 355 195 420
            C210 490 235 555 280 700
            H0
            Z
          "
        />

        {/* coastline */}

        {map.coastline.map(
          (line, index) => (
            <path
              key={`coast-${index}`}
              d={linePath(
                line.coordinates
              )}
              className="keciCoastline"
            />
          )
        )}

        {/* streets */}

        {map.roads.map(
          (road, index) => (
            <path
              key={`road-${index}`}
              d={linePath(
                road.coordinates
              )}
              className={getRoadClass(
                road.highway
              )}
            />
          )
        )}

        {/* venue points */}

        {points.map((place) => {

          const active =
            selected === place.name;

          return (
            <g
              key={place.name}
              transform={`translate(${place.x} ${place.y})`}
              className={
                active
                  ? "keciVenue active"
                  : "keciVenue"
              }
              onClick={() =>
                onSelect(place.name)
              }
              onMouseEnter={() =>
                setHovered(place.name)
              }
              onMouseLeave={() =>
                setHovered(null)
              }
            >

              <circle
                className="keciVenueHalo"
                r={active ? 18 : 12}
              />

              <circle
                className="keciVenuePoint"
                r={active ? 7 : 5}
              />

            </g>
          );
        })}

      </svg>

      {/* selected venue */}

      {points.map((place) => {

        if (
          selected !== place.name &&
          hovered !== place.name
        ) {
          return null;
        }

        const left = Math.min(
          Math.max(
            (place.x / 1000) * 100,
            12
          ),
          82
        );

        const top = Math.min(
          Math.max(
            (place.y / 700) * 100,
            20
          ),
          78
        );

        return (
          <button
            key={`info-${place.name}`}
            className="keciVenueCard"
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            onClick={() =>
              onSelect(place.name)
            }
          >

            <strong>
              {place.name}
            </strong>

            <span>
              ★ {place.rating}
            </span>

            <small>
              {place.type}
            </small>

          </button>
        );
      })}

      <div className="keciMapFooter">

        <span>
          <i />
          Популярные места
        </span>

        <small>
          © OpenStreetMap
        </small>

      </div>

    </div>
  );
}
