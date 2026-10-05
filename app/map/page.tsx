"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const RealBatumiMap = dynamic(
  () => import("./RealBatumiMap"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  const router = useRouter();

  return (
    <main className="fullMapPage">

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

          <button className="fullMapSearch">
            <Search />
            <span>Поиск</span>
          </button>

          <button className="fullMapFilter">
            <SlidersHorizontal />
            <span>Фильтры</span>
          </button>

        </div>

      </header>

      <section className="fullMapContent">

        <aside className="mapSidebar">

          <div className="mapSidebarTop">
            <span>МЕСТА РЯДОМ</span>

            <h1>
              Рестораны
              <small>4</small>
            </h1>
          </div>

          <button className="mapPlace">
            <div className="mapPlaceImage" />

            <div className="mapPlaceInfo">
              <strong>
                Medea Restaurant
              </strong>

              <div className="mapPlaceRating">
                ★ 4.8
                <span>
                  1 320 отзывов
                </span>
              </div>

              <p>
                Грузинская · $$
              </p>

              <small>
                1.2 км
              </small>
            </div>
          </button>

          <button className="mapPlace">
            <div className="mapPlaceImage" />

            <div className="mapPlaceInfo">
              <strong>
                Heart of Batumi
              </strong>

              <div className="mapPlaceRating">
                ★ 4.7
                <span>
                  982 отзыва
                </span>
              </div>

              <p>
                Грузинская · $$
              </p>

              <small>
                800 м
              </small>
            </div>
          </button>

          <button className="mapPlace">
            <div className="mapPlaceImage" />

            <div className="mapPlaceInfo">
              <strong>
                Umami at Clouds
              </strong>

              <div className="mapPlaceRating">
                ★ 4.9
                <span>
                  1 014 отзывов
                </span>
              </div>

              <p>
                Азиатская · $$$
              </p>

              <small>
                1.5 км
              </small>
            </div>
          </button>

          <button className="mapPlace">
            <div className="mapPlaceImage" />

            <div className="mapPlaceInfo">
              <strong>
                Black Sea Restaurant
              </strong>

              <div className="mapPlaceRating">
                ★ 4.6
                <span>
                  756 отзывов
                </span>
              </div>

              <p>
                Морепродукты · $$
              </p>

              <small>
                1.1 км
              </small>
            </div>
          </button>

        </aside>

        <div className="realMapWrapper">
          <RealBatumiMap />
        </div>

      </section>

    </main>
  );
}
