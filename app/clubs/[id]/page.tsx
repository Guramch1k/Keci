import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  Music2,
  Phone,
  Globe,
} from "lucide-react";

import {
  clubMapHref,
  clubs,
  getClub,
  instagramUrl,
} from "../../clubsData";
import FavoriteButton from "../FavoriteButton";

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return clubs.map((club) => ({ id: club.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const club = getClub(params.id);

  if (!club) {
    return { title: "Клуб не найден — keci" };
  }

  return {
    title: club.name + " — клуб в Батуми | keci",
    description: club.description,
  };
}

export default function ClubPage({ params }: Props) {
  const club = getClub(params.id);

  if (!club) {
    notFound();
  }

  const googleRoute =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    club.lat +
    "," +
    club.lng;

  return (
    <main className="clubsPage">
      <header className="clubsHeader">
        <Link href="/clubs" className="clubsBack">
          <ArrowLeft />
          <span>Все клубы</span>
        </Link>

        <Link href="/" className="clubsLogo" aria-label="keci — на главную">
          keci<span>.</span>
        </Link>

        <div className="clubsHeaderTitle">Клубы</div>

        <div className="clubsHeaderRight">
          <span>Батуми</span>
        </div>
      </header>

      <section className="clubPageHero">
        <Image
          src={club.image}
          alt={club.name}
          fill
          priority
          sizes="100vw"
          className="clubPageHeroImage"
        />

        <div className="clubPageHeroShade" />

        <div className="clubPageHeroContent">
          <span className="clubsEyebrow">
            {club.subtitle.toUpperCase()}
          </span>

          <h1>{club.name}</h1>

          <div className="clubPageBadges">
            <span>{club.age}+</span>
            {club.status && <span>{club.status}</span>}
          </div>
        </div>
      </section>

      <section className="clubPageBody">
        <div className="clubPageMain">
          <p className="clubPageDescription">{club.description}</p>

          <div className="clubPageActions">
            <a
              href={googleRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="clubPageRoute"
            >
              <MapPin />
              Построить маршрут
            </a>

            <Link href={clubMapHref(club)} className="clubPageSecondary">
              На карте keci
            </Link>

            <FavoriteButton id={club.id} />
          </div>
        </div>

        <aside className="clubPageInfo">
          <div className="clubPageRow">
            <MapPin />
            <div>
              <small>Адрес</small>
              <span>{club.address}</span>
            </div>
          </div>

          <div className="clubPageRow">
            <Clock />
            <div>
              <small>Часы работы</small>
              <span>
                {club.hours ?? "Уточняйте в Instagram клуба"}
              </span>
            </div>
          </div>

          <div className="clubPageRow">
            <Music2 />
            <div>
              <small>Музыка</small>
              <span>{club.music}</span>
            </div>
          </div>

          {club.phone && (
            <div className="clubPageRow">
              <Phone />
              <div>
                <small>Телефон</small>
                <a href={"tel:" + club.phone.replace(/\s/g, "")}>
                  {club.phone}
                </a>
              </div>
            </div>
          )}

          {club.instagram && (
            <div className="clubPageRow">
              <Instagram />
              <div>
                <small>Instagram</small>
                <a
                  href={instagramUrl(club.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{club.instagram}
                </a>
              </div>
            </div>
          )}

          {club.website && (
            <div className="clubPageRow">
              <Globe />
              <div>
                <small>Сайт</small>
                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {club.website.replace(/^https?:\/\//, "")}
                  <ExternalLink />
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
