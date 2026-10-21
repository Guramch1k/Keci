"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Clock,
  MapPin,
  Phone,
  Search,
  Utensils,
} from "lucide-react";

import { restaurants } from "../restaurantsData";
import { useFavorites } from "../useFavorites";

export default function RestaurantsPage() {
  const favorites = useFavorites();

  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return restaurants.filter((r) => {
      if (onlyFavorites && !favorites.has(r.id)) return false;

      if (!q) return true;

      return [r.name, r.nameKa, r.cuisine, r.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    // favorites.ids меняется при добавлении/удалении
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, onlyFavorites, favorites.ids]);

  return (
    <main className="clubsPage">
      {/* HEADER */}

      <header className="clubsHeader">
        <Link href="/" className="clubsBack">
          <ArrowLeft />
          <span>Назад</span>
        </Link>

        <Link href="/" className="clubsLogo" aria-label="keci — на главную">
          keci<span>.</span>
        </Link>

        <div className="clubsHeaderTitle">Рестораны</div>

        <div className="clubsHeaderRight">
          <span>Батуми</span>
        </div>
      </header>

      {/* HERO */}

      <section className="clubsHero">
        <div className="clubsHeroContent">
          <span className="clubsEyebrow">RESTAURANTS · BATUMI</span>

          <h1>
            Рестораны
            <br />
            <em>Батуми.</em>
          </h1>

          <p>Где поесть в Батуми: грузинская и европейская кухня.</p>
        </div>
      </section>

      {/* LIST */}

      <section className="clubsContent">
        <div className="clubsSectionHead">
          <div>
            <span className="clubsEyebrow dark">ГДЕ ПОЕСТЬ</span>

            <h2>
              Рестораны
              <small>{visible.length}</small>
            </h2>
          </div>

          <div className="clubsMusicLabel">
            <Utensils />
            <span>Restaurants</span>
          </div>
        </div>

        {/* SEARCH + FILTERS */}

        <div className="clubsFilters">
          <label className="restaurantsSearch">
            <Search />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Название ресторана..."
              aria-label="Поиск ресторана"
            />
          </label>

          <button
            className={
              onlyFavorites ? "clubsFilterChip selected" : "clubsFilterChip"
            }
            onClick={() => setOnlyFavorites(!onlyFavorites)}
          >
            <Heart />
            Избранное
          </button>
        </div>

        {visible.length === 0 && (
          <div className="clubsEmpty">
            <strong>Ничего не найдено</strong>
            <span>
              {onlyFavorites && favorites.ids.length === 0
                ? "Нажмите на сердечко у ресторана, чтобы добавить его в избранное."
                : "Попробуйте другое название."}
            </span>
          </div>
        )}

        <div className="clubsGrid">
          {visible.map((r, index) => (
            <article className="clubCard" key={r.id}>
              {/* PHOTO */}

              <Link
                href={"/restaurants/" + r.id}
                className="clubVisual"
                aria-label={r.name}
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  className="clubVisualImage"
                />

                <div className="clubVisualOverlay" />

                <div className="clubVisualNumber">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="clubVisualBottom">
                  <span>{r.cuisine ?? "Ресторан"}</span>
                  {r.price && <span>{r.price}</span>}
                </div>
              </Link>

              <button
                className={
                  favorites.has(r.id)
                    ? "clubFavorite active"
                    : "clubFavorite"
                }
                aria-label={
                  favorites.has(r.id)
                    ? "Убрать из избранного"
                    : "Добавить в избранное"
                }
                aria-pressed={favorites.has(r.id)}
                onClick={() => favorites.toggle(r.id)}
              >
                <Heart />
              </button>

              {/* INFO */}

              <div className="clubInfo">
                <div className="clubTitleRow">
                  <div>
                    <h3>
                      <Link
                        href={"/restaurants/" + r.id}
                        className="clubTitleLink"
                      >
                        {r.name}
                      </Link>
                    </h3>

                    {r.nameKa && <span>{r.nameKa}</span>}
                  </div>
                </div>

                {r.description && (
                  <p className="clubDescription">{r.description}</p>
                )}

                <div className="clubDetails">
                  {r.hours && (
                    <div>
                      <Clock />
                      <span>{r.hours}</span>
                    </div>
                  )}

                  {r.address && (
                    <div>
                      <MapPin />
                      <span>{r.address}</span>
                    </div>
                  )}

                  {r.phone && (
                    <div>
                      <Phone />
                      <a
                        href={"tel:" + r.phone.replace(/\s/g, "")}
                        className="clubInlineLink"
                      >
                        {r.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="clubActions">
                  {r.phone ? (
                    <a href={"tel:" + r.phone.replace(/\s/g, "")}>
                      <Phone />
                      Позвонить
                    </a>
                  ) : (
                    <span />
                  )}

                  <Link
                    href={"/restaurants/" + r.id}
                    className="clubDetailsButton"
                  >
                    Подробнее
                    <ExternalLink />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="clubsFooter">
        <div className="logo">
          keci<span>.</span>
        </div>

        <span>Discover Batumi</span>

        <span>© 2026 keci</span>
      </footer>
    </main>
  );
}
