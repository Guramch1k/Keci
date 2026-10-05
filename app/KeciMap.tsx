"use client";

import { useState } from "react";

type Place = {
  name: string;
  rating: string;
  type: string;
  lat: number;
  lng: number;
};

type Props = {
  places: Place[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function KeciMap({
  places,
  selected,
  onSelect,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  /*
    Условные координаты внутри нашего силуэта.
    Они не являются реальными координатами карты.
    Реальные координаты используются только в /map.
  */

  const points = [
    { x: 49, y: 25 },
    { x: 57, y: 34 },
    { x: 43, y: 39 },
    { x: 67, y: 45 },
  ];

  const getPoint = (index: number) => {
    return points[index % points.length];
  };

  return (
    <div className="keciHomeMap">

      {/* Background */}
      <div className="keciMapNoise" />

      {/* Header */}
      <div className="keciMapLabel">
        <span>KECI MAP</span>
        <strong>BATUMI</strong>
      </div>

      <div className="keciMapHint">
        <span className="keciMapHintDot" />
        Популярные места
      </div>

      {/* Decorative coastline / sea */}
      <div className="keciSea">
        <span>BLACK SEA</span>
      </div>

      {/* SVG map */}
      <svg
        className="keciBatumiSvg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >

        {/* Main Batumi silhouette */}
        <path
          className="keciCityShape"
          d="
            M35 12
            C42 9 51 10 59 13
            C67 16 75 20 81 27
            C86 33 88 41 87 49
            C86 57 82 64 78 70
            C74 76 69 82 62 87
            C56 91 49 93 42 91
            C35 89 29 84 25 78
            C20 71 17 64 16 56
            C15 47 17 39 21 32
            C25 24 29 17 35 12
            Z
          "
        />

        {/* Main coastline */}
        <path
          className="keciCoastline"
          d="
            M16 56
            C25 58 32 62 39 67
            C46 72 54 78 62 87
          "
        />

        {/* Main boulevard */}
        <path
          className="keciRoad major"
          d="
            M29 23
            C38 31 48 38 58 44
            C67 50 75 58 80 68
          "
        />

        {/* Roads */}
        <path
          className="keciRoad"
          d="M22 38 C36 40 49 43 63 50 C72 55 79 61 83 68"
        />

        <path
          className="keciRoad"
          d="M20 49 C34 48 45 51 57 57 C67 62 73 69 77 78"
        />

        <path
          className="keciRoad"
          d="M27 67 C38 61 49 59 60 62 C68 65 74 72 78 81"
        />

        <path
          className="keciRoad"
          d="M34 18 C34 30 36 40 42 50 C47 58 54 65 63 71"
        />

        <path
          className="keciRoad"
          d="M48 13 C47 25 49 36 54 46 C58 55 65 64 72 70"
        />

        <path
          className="keciRoad"
          d="M63 17 C59 28 60 39 64 49 C68 58 75 64 82 70"
        />

        {/* Smaller streets */}
        <path
          className="keciStreet"
          d="M25 31 L72 57"
        />

        <path
          className="keciStreet"
          d="M23 58 L70 39"
        />

        <path
          className="keciStreet"
          d="M31 76 L72 51"
        />

        <path
          className="keciStreet"
          d="M40 85 L76 60"
        />

        <path
          className="keciStreet"
          d="M31 25 L65 76"
        />

        <path
          className="keciStreet"
          d="M43 17 L74 70"
        />

        {/* District labels */}
        <text
          x="32"
          y="31"
          className="keciDistrict"
        >
          OLD BATUMI
        </text>

        <text
          x="55"
          y="42"
          className="keciDistrict"
        >
          CENTRE
        </text>

        <text
          x="59"
          y="63"
          className="keciDistrict"
        >
          NEW BATUMI
        </text>

        <text
          x="40"
          y="79"
          className="keciDistrict"
        >
          BOULEVARD
        </text>

        {/* Sea line */}
        <path
          className="keciSeaLine"
          d="
            M8 61
            C16 58 21 57 28 59
            C35 61 42 66 49 71
          "
        />
      </svg>

      {/* Restaurant points */}
      <div className="keciMapPoints">

        {places.map((place, index) => {
          const point = getPoint(index);
          const isSelected = selected === place.name;
          const isHovered = hovered === place.name;

          return (
            <button
              key={place.name}
              className={
                isSelected
                  ? "keciPlacePoint selected"
                  : "keciPlacePoint"
              }
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
              onClick={() => onSelect(place.name)}
              onMouseEnter={() => setHovered(place.name)}
              onMouseLeave={() => setHovered(null)}
              aria-label={place.name}
            >
              <span className="keciPointPulse" />
              <span className="keciPointCore" />

              {(isHovered || isSelected) && (
                <span className="keciPointPopup">
                  <strong>{place.name}</strong>

                  <small>
                    ★ {place.rating} · {place.type}
                  </small>
                </span>
              )}
            </button>
          );
        })}

      </div>

      {/* Bottom legend */}
      <div className="keciMapLegend">
        <div>
          <span className="legendDot restaurantDot" />
          Рестораны
        </div>

        <div>
          <span className="legendDot barDot" />
          Бары
        </div>

        <div>
          <span className="legendDot clubDot" />
          Клубы
        </div>
      </div>

    </div>
  );
}
