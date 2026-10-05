"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  Heart,
  UtensilsCrossed,
  Martini,
  Coffee,
  Waves,
  Leaf,
  Music2,
  SlidersHorizontal,
  ArrowRight,
  Star,
  Navigation,
  Menu,
  X,
  MapPin,
} from "lucide-react";

const KeciMap = dynamic(() => import("./KeciMap"), { ssr: false });

const categories = [
  ["Грузинская", "food"],
  ["Итальянская", "food"],
  ["Азиатская", "food"],
  ["Морепродукты", "sea"],
  ["Бары", "bar"],
  ["Завтраки", "coffee"],
  ["Вид на море", "sea"],
  ["Вегетарианская", "leaf"],
  ["Клубы", "club"],
] as const;

const places = [
  {
    name: "Medea Restaurant",
    rating: "4.8",
    reviews: "1 320",
    type: "Грузинская · $$",
    distance: "1.2 км",
    lat: 41.6502,
    lng: 41.6367,
  },
  {
    name: "Heart of Batumi",
    rating: "4.7",
    reviews: "982",
    type: "Грузинская · $$",
    distance: "800 м",
    lat: 41.6471,
    lng: 41.6359,
  },
  {
    name: "Umami at Clouds",
    rating: "4.9",
    reviews: "1 014",
    type: "Азиатская · $$$",
    distance: "1.5 км",
    lat: 41.6418,
    lng: 41.6338,
  },
  {
    name: "Black Sea Restaurant",
    rating: "4.6",
    reviews: "756",
    type: "Морепродукты · $$",
    distance: "1.1 км",
    lat: 41.6492,
    lng: 41.6415,
  },
];

function CategoryIcon({ type }: { type: string }) {
  if (type === "bar") return <Martini />;
  if (type === "coffee") return <Coffee />;
  if (type === "sea") return <Waves />;
  if (type === "leaf") return <Leaf />;
  if (type === "club") return <Music2 />;

  return <UtensilsCrossed />;
}

export default function Home() {
  const [active, setActive] = useState("Все");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Medea Restaurant");
  const [menu, setMenu] = useState(false);

  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();

    return places.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="site">
      <header className="topbar">
        <div className="logo">
          keci<span>.</span>
        </div>

        <nav className={menu ? "nav open" : "nav"}>
          <button
            className="navItem active"
            onClick={() => setActive("Рестораны")}
          >
            <UtensilsCrossed />
            Рестораны
          </button>

          <button
            className="navItem"
            onClick={() => setActive("Клубы")}
          >
            <Music2 />
            Клубы
          </button>

          <button
            className="navItem"
            onClick={() => setActive("Бары")}
          >
            <Martini />
            Бары
          </button>

          <button
            className="navItem"
            onClick={() => setActive("Кафе")}
          >
            <Coffee />
            Кафе
          </button>

          <button className="navItem">
            <Heart />
            Избранное
          </button>
        </nav>

        <div className="topActions">
          <span className="lang">
            RU
            <ChevronDown />
          </span>

          <button className="login">
            Войти
          </button>

          <button
            className="mobileMenu"
            onClick={() => setMenu(!menu)}
            aria-label="Меню"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero">
        <Image
          src="/batumi.webp"
          alt="Ночной Батумский пейзаж"
          fill
          priority
          className="heroImage"
          sizes="100vw"
        />

        <div className="heroShade" />

        <div className="heroContent">
          <div className="eyebrow">
            РЕСТОРАНЫ · КЛУБЫ · БАРЫ · КАФЕ
          </div>

          <h1>
            Найди
            <br />
            свой <em>keci.</em>
          </h1>

          <p>
            Лучшие места Батуми — в одном месте.
          </p>

          <div className="searchBox">
            <Search />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Кухня, название, район..."
              aria-label="Поиск"
            />

            <button aria-label="Искать">
              <ArrowRight />
            </button>
          </div>

          <div className="chips">
            {categories.map(([label, type]) => (
              <button
                key={label}
                className={
                  active === label
                    ? "chip selected"
                    : "chip"
                }
                onClick={() => setActive(label)}
              >
                <CategoryIcon type={type} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="explore">
        <div className="listPanel">
          <div className="sectionHead">
            <div>
              <span className="eyebrow dark">
                ПОПУЛЯРНОЕ В БАТУМИ
              </span>

              <h2>
                {active === "Клубы"
                  ? "Клубы"
                  : "Рестораны"}

                <small>
                  {visible.length}
                </small>
              </h2>
            </div>

            <button className="filter">
              <SlidersHorizontal />
              Фильтры
            </button>
          </div>

          <div className="filters">
            <button>
              Кухня
              <ChevronDown />
            </button>

            <button>
              Цена
              <ChevronDown />
            </button>

            <button>
              Рейтинг
              <ChevronDown />
            </button>
          </div>

          <div className="restaurantList">
            {visible.map((p) => (
              <button
                className={
                  selected === p.name
                    ? "restaurant selected"
                    : "restaurant"
                }
                key={p.name}
                onClick={() => setSelected(p.name)}
              >
                <div className="thumb">
                  <Image
                    src="/batumi.webp"
                    alt=""
                    fill
                    sizes="102px"
                  />

                  <span>
                    <Heart />
                  </span>
                </div>

                <div className="placeInfo">
                  <strong>{p.name}</strong>

                  <div className="rating">
                    <Star />
                    {p.rating}
                    <span>
                      ({p.reviews})
                    </span>
                  </div>

                  <p>{p.type}</p>

                  <small>
                    <MapPin />
                    {p.distance}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mapPanel">
          <KeciMap
            places={places}
            selected={selected}
            onSelect={setSelected}
          />

          <button
            className="locate"
            aria-label="Моё местоположение"
          >
            <Navigation />
          </button>
        </div>
      </section>

      <footer>
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
