"use client";

import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  MapPin,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Place } from "./RealBatumiMap";

const RealBatumiMap = dynamic(
  () => import("./RealBatumiMap"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);
  const [selected, setSelected] = useState<string | null>(
    null
  );

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRestaurants() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/restaurants"
        );

        if (!response.ok) {
          throw new Error(
            "Ошибка загрузки ресторанов"
          );
        }

        const data = await response.json();

        if (!cancelled) {
          setPlaces(data);

          if (data.length > 0) {
            setSelected(data[0].id);
          }
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError(
            "Не удалось загрузить рестораны. Попробуйте обновить страницу."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRestaurants();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return places;
    }

    return places.filter((place) =>
      [
        place.name,
        place.cuisine,
        place.address,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [places, query]);

  return (
    <main className="fullMapPage">
      {/* HEADER */}

      <header className="fullMapHeader">
        <button
          className="fullMapBack"
          onClick={() => router.push("/")}
        >
          <ArrowLeft />
          <span>Назад</span>
        </button>

        <div className="fullMapLogo">
          keci<span>.</span>
        </div>

        <div className="fullMapTitle">
          Карта Батуми
        </div>

        <div className="fullMapActions">
          {/* SEARCH */}

          <div className="fullMapSearch">
            <Search />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Поиск ресторана..."
              aria-label="Поиск ресторана"
            />

            {query && (
              <button
                className="mapSearchClear"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
              >
                <X />
              </button>
            )}
          </div>

          {/* FILTER */}

          <button className="fullMapFilter">
            <SlidersHorizontal />

            <span>Рестораны</span>
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <section className="fullMapContent">
        {/* SIDEBAR */}

        <aside className="mapSidebar">
          <div className="mapSidebarTop">
            <span>
              РЕАЛЬНЫЕ МЕСТА В БАТУМИ
            </span>

            <h1>
              Рестораны

              <small>
                {filteredPlaces.length}
              </small>
            </h1>

            {loading && (
              <p className="mapLoading">
                Загружаем рестораны…
              </p>
            )}

            {error && (
              <p className="mapError">
                {error}
              </p>
            )}
          </div>

          {/* EMPTY */}

          {!loading &&
            filteredPlaces.length === 0 &&
            !error && (
              <div className="mapEmpty">
                <MapPin />

                <strong>
                  Ничего не найдено
                </strong>

                <span>
                  Попробуйте другое название
                  или кухню.
                </span>
              </div>
            )}

          {/* RESTAURANTS */}

          {filteredPlaces.map((place) => (
            <button
              key={place.id}
              className={
                selected === place.id
                  ? "mapPlace selected"
                  : "mapPlace"
              }
              onClick={() =>
                setSelected(place.id)
              }
            >
              <div className="mapPlaceImage">
                <MapPin />
              </div>

              <div className="mapPlaceInfo">
                <strong>
                  {place.name}
                </strong>

                {place.cuisine && (
                  <div className="mapPlaceRating">
                    {place.cuisine.replaceAll(
                      "_",
                      " · "
                    )}
                  </div>
                )}

                {place.address && (
                  <p>
                    {place.address}
                  </p>
                )}

                {place.openingHours && (
                  <small>
                    {place.openingHours}
                  </small>
                )}
              </div>
            </button>
          ))}
        </aside>

        {/* MAP */}

        <div className="realMapWrapper">
          <RealBatumiMap
            places={filteredPlaces}
            selected={selected}
            onSelect={setSelected}
          />

          <div className="mapAttribution">
            Данные мест: OpenStreetMap
          </div>
        </div>
      </section>
    </main>
  );
}
