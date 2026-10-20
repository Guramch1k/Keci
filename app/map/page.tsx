"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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
import { clubs, instagramUrl } from "../clubsData";

type Category = "all" | "restaurant" | "club";

const categoryLabels: Record<Category, string> = {
  all: "Все места",
  restaurant: "Рестораны",
  club: "Клубы",
};

const nextCategory: Record<Category, Category> = {
  all: "restaurant",
  restaurant: "club",
  club: "all",
};

// Клубы берём из нашего файла данных (app/data/clubs.ts)
const clubPlaces: Place[] = clubs.map((club) => ({
  id: "club-" + club.id,
  name: club.name,
  lat: club.lat,
  lng: club.lng,
  cuisine: "Клуб · " + club.music,
  address: club.address,
  phone: club.phone ?? "",
  website: club.website ?? (club.instagram ? instagramUrl(club.instagram) : ""),
  openingHours: club.hours ?? "",
  category: "club",
  href: "/clubs/" + club.id,
}));

const RealBatumiMap = dynamic(
  () => import("./RealBatumiMap"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [category, setCategory] = useState<Category>("all");
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
          setRestaurants(
            (data as Place[]).map((item) => ({
              ...item,
              category: "restaurant" as const,
            }))
          );

          // /map?place=club-senate — открыть карту сразу на нужном месте
          const requested = new URLSearchParams(
            window.location.search
          ).get("place");

          if (requested) {
            setSelected(requested);
          } else if (data.length > 0) {
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

  // Клубы показываем сразу, не дожидаясь загрузки ресторанов
  useEffect(() => {
    const requested = new URLSearchParams(
      window.location.search
    ).get("place");

    if (requested && requested.startsWith("club-")) {
      setSelected(requested);
    }
  }, []);

  const places = useMemo(() => {
    if (category === "restaurant") return restaurants;
    if (category === "club") return clubPlaces;
    return [...clubPlaces, ...restaurants];
  }, [category, restaurants]);

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

        <Link href="/" className="fullMapLogo" aria-label="keci — на главную">
          keci<span>.</span>
        </Link>

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
              placeholder="Поиск места..."
              aria-label="Поиск места"
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

          <button
            className="fullMapFilter"
            onClick={() => setCategory(nextCategory[category])}
            aria-label="Сменить категорию"
          >
            <SlidersHorizontal />

            <span>{categoryLabels[category]}</span>
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <section className="fullMapContent">
        {/* SIDEBAR */}

        <aside className="mapSidebar">
          <div className="mapSidebarTop">
            <span>
              МЕСТА В БАТУМИ
            </span>

            <h1>
              {categoryLabels[category]}

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
