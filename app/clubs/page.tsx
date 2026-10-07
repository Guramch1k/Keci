"use client";

import {
  ArrowLeft,
  Heart,
  MapPin,
  Clock,
  Music2,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

const clubs = [
  {
    id: "rooftop34",
    name: "ROOFTOP34",
    subtitle: "Rooftop · Electronic",
    description:
      "Rooftop-клуб на 34 этаже Panorama с панорамным видом на Батуми и море. Электронная музыка, DJ-сеты и ночные мероприятия.",
    address: "Sherif Khimshiashvili 15B · 34 этаж",
    hours: "Вечерние мероприятия",
    age: "24+",
    music: "House · Electronic",
    status: "Работает вне сезона",
    image: "/clubs/rooftop34.webp",
    map: "https://www.openstreetmap.org/?mlat=41.61049&mlon=41.63724#map=18/41.61049/41.63724",
  },

  {
    id: "senate",
    name: "SENATE",
    subtitle: "Night Club · Batumi",
    description:
      "Премиальный ночной клуб Батуми с DJ, танцполом, VIP-зонами и атмосферой до самого утра.",
    address: "Sherif Khimshiashvili 14",
    hours: "22:00 – 06:00",
    age: "24+",
    music: "Open Format · DJ",
    status: "Night Club",
    image: "/clubs/senate.webp",
    map: "https://www.openstreetmap.org/?mlat=41.6109&mlon=41.6373#map=18/41.6109/41.6373",
  },

  {
    id: "teatro",
    name: "TEATRO",
    subtitle: "Lounge · Night Club",
    description:
      "Большой night club с живыми выступлениями, шоу-программами, DJ и VIP-зонами.",
    address: "Lech & Maria Kaczynski 5B",
    hours: "00:00 – 06:00",
    age: "18+",
    music: "DJ · Live Shows",
    status: "Night Club",
    image: "/clubs/teatro.jpg",
    map: "https://www.openstreetmap.org/?mlat=41.6258&mlon=41.6289#map=18/41.6258/41.6289",
  },
];

export default function ClubsPage() {
  const router = useRouter();

  return (
    <main className="clubsPage">

      {/* HEADER */}

      <header className="clubsHeader">

        <button
          className="clubsBack"
          onClick={() => router.push("/")}
        >
          <ArrowLeft />
          <span>Назад</span>
        </button>

        <div className="clubsLogo">
          keci<span>.</span>
        </div>

        <div className="clubsHeaderTitle">
          Клубы
        </div>

        <div className="clubsHeaderRight">
          <span>Батуми</span>
        </div>

      </header>


      {/* HERO */}

      <section className="clubsHero">

        <div className="clubsHeroContent">

          <span className="clubsEyebrow">
            NIGHTLIFE · BATUMI
          </span>

          <h1>
            Ночная жизнь
            <br />
            <em>Батуми.</em>
          </h1>

          <p>
            Клубы, музыка и вечеринки,
            которые стоит знать.
          </p>

        </div>

      </section>


      {/* CLUBS */}

      <section className="clubsContent">

        <div className="clubsSectionHead">

          <div>

            <span className="clubsEyebrow dark">
              ВНЕ СЕЗОНА
            </span>

            <h2>
              Клубы
              <small>{clubs.length}</small>
            </h2>

          </div>

          <div className="clubsMusicLabel">
            <Music2 />
            <span>Nightlife</span>
          </div>

        </div>


        <div className="clubsGrid">

          {clubs.map((club, index) => (

            <article
              className="clubCard"
              key={club.id}
            >

              {/* PHOTO */}

              <div
                className="clubVisual"
                style={{
                  backgroundImage: `url("${club.image}")`,
                }}
              >

                <div className="clubVisualOverlay" />

                <div className="clubVisualNumber">
                  0{index + 1}
                </div>

                <button
                  className="clubFavorite"
                  aria-label="Добавить в избранное"
                >
                  <Heart />
                </button>

                <div className="clubVisualBottom">

                  <span>
                    {club.status}
                  </span>

                  <span>
                    {club.age}
                  </span>

                </div>

              </div>


              {/* INFO */}

              <div className="clubInfo">

                <div className="clubTitleRow">

                  <div>

                    <h3>
                      {club.name}
                    </h3>

                    <span>
                      {club.subtitle}
                    </span>

                  </div>

                </div>


                <p className="clubDescription">
                  {club.description}
                </p>


                <div className="clubDetails">

                  <div>
                    <MapPin />
                    <span>
                      {club.address}
                    </span>
                  </div>

                  <div>
                    <Clock />
                    <span>
                      {club.hours}
                    </span>
                  </div>

                  <div>
                    <Music2 />
                    <span>
                      {club.music}
                    </span>
                  </div>

                </div>


                <div className="clubActions">

                  <button
                    onClick={() =>
                      window.open(
                        club.map,
                        "_blank"
                      )
                    }
                  >
                    <MapPin />
                    На карте
                  </button>

                  <button
                    className="clubDetailsButton"
                    onClick={() =>
                      alert(
                        `Страница ${club.name} будет добавлена следующим этапом.`
                      )
                    }
                  >
                    Подробнее
                    <ExternalLink />
                  </button>

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

        <span>
          Discover Batumi
        </span>

        <span>
          © 2026 keci
        </span>

      </footer>

    </main>
  );
}
