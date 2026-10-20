"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Clock,
  Music2,
  ExternalLink,
  Instagram,
} from "lucide-react";

import {
  allGenres,
  clubMapHref,
  clubs,
  instagramUrl,
} from "../clubsData";
import { useFavorites } from "../useFavorites";

export default function ClubsPage() {
  const favorites = useFavorites();

  const [genre, setGenre] = useState<string>("Все");
  const [onlyEighteen, setOnlyEighteen] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const genres = useMemo(() => ["Все", ...allGenres()], []);

  const visible = useMemo(
    () =>
      clubs.filter((club) => {
        if (genre !== "Все" && !club.genres.includes(genre)) return false;
        if (onlyEighteen && club.age > 18) return false;
        if (onlyFavorites && !favorites.has(club.id)) return false;
        return true;
      }),
    // favorites.ids меняется при добавлении/удалении
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genre, onlyEighteen, onlyFavorites, favorites.ids]
  );

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

        <div className="clubsHeaderTitle">Клубы</div>

        <div className="clubsHeaderRight">
          <span>Батуми</span>
        </div>
      </header>

      {/* HERO */}

      <section className="clubsHero">
        <div className="clubsHeroContent">
          <span className="clubsEyebrow">NIGHTLIFE · BATUMI</span>

          <h1>
            Ночная жизнь
            <br />
            <em>Батуми.</em>
          </h1>

          <p>Клубы, музыка и вечеринки, которые стоит знать.</p>
        </div>
      </section>

      {/* CLUBS */}

      <section className="clubsContent">
        <div className="clubsSectionHead">
          <div>
            <span className="clubsEyebrow dark">НОЧНАЯ ЖИЗНЬ</span>

            <h2>
              Клубы
              <small>{visible.length}</small>
            </h2>
          </div>

          <div className="clubsMusicLabel">
            <Music2 />
            <span>Nightlife</span>
          </div>
        </div>

        {/* FILTERS */}

        <div className="clubsFilters">
          {genres.map((item) => (
            <button
              key={item}
              className={
                genre === item
                  ? "clubsFilterChip selected"
                  : "clubsFilterChip"
              }
              onClick={() => setGenre(item)}
            >
              {item}
            </button>
          ))}

          <span className="clubsFilterDivider" />

          <button
            className={
              onlyEighteen
                ? "clubsFilterChip selected"
                : "clubsFilterChip"
            }
            onClick={() => setOnlyEighteen(!onlyEighteen)}
          >
            Вход с 18 лет
          </button>

          <button
            className={
              onlyFavorites
                ? "clubsFilterChip selected"
                : "clubsFilterChip"
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
                ? "Нажмите на сердечко у клуба, чтобы добавить его в избранное."
                : "Попробуйте снять часть фильтров."}
            </span>
          </div>
        )}

        <div className="clubsGrid">
          {visible.map((club, index) => (
            <article className="clubCard" key={club.id}>
              {/* PHOTO */}

              <div className="clubVisual">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  className="clubVisualImage"
                />

                <div className="clubVisualOverlay" />

                <div className="clubVisualNumber">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <button
                  className={
                    favorites.has(club.id)
                      ? "clubFavorite active"
                      : "clubFavorite"
                  }
                  aria-label={
                    favorites.has(club.id)
                      ? "Убрать из избранного"
                      : "Добавить в избранное"
                  }
                  aria-pressed={favorites.has(club.id)}
                  onClick={() => favorites.toggle(club.id)}
                >
                  <Heart />
                </button>

                <div className="clubVisualBottom">
                  <span>{club.status ?? "Night Club"}</span>
                  <span>{club.age}+</span>
                </div>
              </div>

              {/* INFO */}

              <div className="clubInfo">
                <div className="clubTitleRow">
                  <div>
                    <h3>
                      <Link
                        href={"/clubs/" + club.id}
                        className="clubTitleLink"
                      >
                        {club.name}
                      </Link>
                    </h3>

                    <span>{club.subtitle}</span>
                  </div>
                </div>

                <p className="clubDescription">{club.description}</p>

                <div className="clubDetails">
                  <div>
                    <MapPin />
                    <span>{club.address}</span>
                  </div>

                  <div>
                    <Clock />
                    <span>
                      {club.hours ?? "Часы работы — в Instagram клуба"}
                    </span>
                  </div>

                  <div>
                    <Music2 />
                    <span>{club.music}</span>
                  </div>

                  {club.instagram && (
                    <div>
                      <Instagram />
                      <a
                        href={instagramUrl(club.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clubInlineLink"
                      >
                        @{club.instagram}
                      </a>
                    </div>
                  )}
                </div>

                <div className="clubActions">
                  <Link href={clubMapHref(club)}>
                    <MapPin />
                    На карте
                  </Link>

                  <Link
                    href={"/clubs/" + club.id}
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
