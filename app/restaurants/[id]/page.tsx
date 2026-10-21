import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Globe,
  Instagram,
  MapPin,
  Phone,
  Utensils,
  BookOpen,
  Facebook,
} from "lucide-react";

import { getRestaurant, restaurants } from "../../restaurantsData";
import FavoriteButton from "../../clubs/FavoriteButton";

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = getRestaurant(params.id);

  if (!r) {
    return { title: "Ресторан не найден — keci" };
  }

  return {
    title: r.name + " — ресторан в Батуми | keci",
    description:
      r.description ??
      r.name + " — ресторан в Батуми" + (r.cuisine ? ". " + r.cuisine + "." : "."),
  };
}

export default function RestaurantPage({ params }: Props) {
  const r = getRestaurant(params.id);

  if (!r) {
    notFound();
  }

  const hasCoords = r.lat != null && r.lng != null;

  return (
    <main className="clubsPage">
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

      <section className="clubPageHero">
        <Image
          src={r.image}
          alt={r.name}
          fill
          priority
          sizes="100vw"
          className="clubPageHeroImage"
        />

        <div className="clubPageHeroShade" />

        <div className="clubPageHeroContent">
          <span className="clubsEyebrow">РЕСТОРАН · БАТУМИ</span>

          <h1>{r.name}</h1>

          {(r.nameKa || r.cuisine) && (
            <div className="clubPageBadges">
              {r.nameKa && <span>{r.nameKa}</span>}
              {r.cuisine && <span>{r.cuisine}</span>}
              {r.price && <span>{r.price}</span>}
            </div>
          )}
        </div>
      </section>

      <section className="clubPageBody">
        <div className="clubPageMain">
          {r.description && (
            <p className="clubPageDescription">{r.description}</p>
          )}

          <div className="clubPageActions">
            {r.phone && (
              <a
                href={"tel:" + r.phone.replace(/\s/g, "")}
                className="clubPageRoute"
              >
                <Phone />
                Позвонить
              </a>
            )}

            {r.menu && (
              <a
                href={r.menu}
                target="_blank"
                rel="noopener noreferrer"
                className="clubPageSecondary"
              >
                <BookOpen />
                Меню
              </a>
            )}

            {r.instagram && (
              <a
                href={"https://www.instagram.com/" + r.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="clubPageSecondary"
              >
                <Instagram />
                Instagram
              </a>
            )}

            {hasCoords && (
              <a
                href={
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                  r.lat +
                  "," +
                  r.lng
                }
                target="_blank"
                rel="noopener noreferrer"
                className="clubPageSecondary"
              >
                <MapPin />
                Построить маршрут
              </a>
            )}

            <FavoriteButton id={r.id} />
          </div>
        </div>

        <aside className="clubPageInfo">
          {r.cuisine && (
            <div className="clubPageRow">
              <Utensils />
              <div>
                <small>Кухня</small>
                <span>{r.cuisine}</span>
              </div>
            </div>
          )}

          {r.hours && (
            <div className="clubPageRow">
              <Clock />
              <div>
                <small>Часы работы</small>
                <span>{r.hours}</span>
              </div>
            </div>
          )}

          {r.address && (
            <div className="clubPageRow">
              <MapPin />
              <div>
                <small>Адрес</small>
                <span>{r.address}</span>
              </div>
            </div>
          )}

          {r.phone && (
            <div className="clubPageRow">
              <Phone />
              <div>
                <small>Телефон</small>
                <a href={"tel:" + r.phone.replace(/\s/g, "")}>{r.phone}</a>
              </div>
            </div>
          )}

          {r.instagram && (
            <div className="clubPageRow">
              <Instagram />
              <div>
                <small>Instagram</small>
                <a
                  href={"https://www.instagram.com/" + r.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{r.instagram}
                </a>
              </div>
            </div>
          )}

          {r.facebook && (
            <div className="clubPageRow">
              <Facebook />
              <div>
                <small>Facebook</small>
                <a href={r.facebook} target="_blank" rel="noopener noreferrer">
                  {r.facebook.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </div>
            </div>
          )}

          {r.menu && (
            <div className="clubPageRow">
              <BookOpen />
              <div>
                <small>Меню</small>
                <a href={r.menu} target="_blank" rel="noopener noreferrer">
                  Открыть меню
                </a>
              </div>
            </div>
          )}

          {r.website && (
            <div className="clubPageRow">
              <Globe />
              <div>
                <small>Сайт</small>
                <a href={r.website} target="_blank" rel="noopener noreferrer">
                  {r.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}
        </aside>
      </section>

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
