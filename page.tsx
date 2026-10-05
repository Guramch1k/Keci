"use client";

import { useMemo, useState } from "react";
import {
  Search, ChevronDown, Heart, UtensilsCrossed, Martini, Coffee,
  Waves, Leaf, Music2, SlidersHorizontal, ArrowRight, Star,
  Navigation, Menu, X, MapPin
} from "lucide-react";

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
];

const places = [
  { name: "Medea Restaurant", rating: "4.8", reviews: "1 320", type: "Грузинская · $$", distance: "1.2 км" },
  { name: "Heart of Batumi", rating: "4.7", reviews: "982", type: "Грузинская · $$", distance: "800 м" },
  { name: "Umami at Clouds", rating: "4.9", reviews: "1 014", type: "Азиатская · $$$", distance: "1.5 км" },
  { name: "Black Sea Restaurant", rating: "4.6", reviews: "756", type: "Морепродукты · $$", distance: "1.1 км" },
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

  const visible = useMemo(
    () =>
      places.filter((p) => {
        const q = query.toLowerCase();
        return (
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
        );
      }),
    [query]
  );

  const title = active === "Клубы" ? "Клубы" : "Рестораны";

  return (
    <main className="site">
      <header className="topbar">
        <div className="logo">keci<span>.</span></div>

        <nav className={menu ? "nav open" : "nav"}>
          <button className="navItem active" onClick={() => setActive("Рестораны")}>
            <UtensilsCrossed />Рестораны
          </button>
          <button className="navItem" onClick={() => setActive("Клубы")}>
            <Music2 />Клубы
          </button>
          <button className="navItem" onClick={() => setActive("Бары")}>
            <Martini />Бары
          </button>
          <button className="navItem" onClick={() => setActive("Кафе")}>
            <Coffee />Кафе
          </button>
          <button className="navItem">
            <Heart />Избранное
          </button>
        </nav>

        <div className="topActions">
          <span className="lang">RU <ChevronDown /></span>
          <button className="login">Войти</button>
          <button className="mobileMenu" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="heroShade" />
        <div className="heroContent">
          <div className="eyebrow">РЕСТОРАНЫ · КЛУБЫ · БАРЫ · КАФЕ</div>
          <h1>Открой<br />свой <em>keci.</em></h1>
          <p>Лучшие места Батуми — в одном месте.</p>

          <div className="searchBox">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Кухня, название, район..."
              aria-label="Поиск"
            />
            <button><ArrowRight /></button>
          </div>

          <div className="chips">
            {categories.map(([label, type]) => (
              <button
                key={label}
                className={active === label ? "chip selected" : "chip"}
                onClick={() => setActive(label)}
              >
                <CategoryIcon type={type} />{label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="explore">
        <div className="listPanel">
          <div className="sectionHead">
            <div>
              <span className="eyebrow dark">ПОПУЛЯРНОЕ В БАТУМИ</span>
              <h2>{title} <small>{visible.length}</small></h2>
            </div>
            <button className="filter"><SlidersHorizontal /> Фильтры</button>
          </div>

          <div className="filters">
            <button>Кухня <ChevronDown /></button>
            <button>Цена <ChevronDown /></button>
            <button>Рейтинг <ChevronDown /></button>
          </div>

          <div className="restaurantList">
            {visible.map((p) => (
              <button
                className={selected === p.name ? "restaurant selected" : "restaurant"}
                key={p.name}
                onClick={() => setSelected(p.name)}
              >
                <div className="thumb">
                  <img src="/batumi.webp" alt="Батуми" />
                  <span><Heart /></span>
                </div>
                <div className="placeInfo">
                  <strong>{p.name}</strong>
                  <div className="rating">
                    <Star /> {p.rating} <span>({p.reviews})</span>
                  </div>
                  <p>{p.type}</p>
                  <small><MapPin /> {p.distance}</small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mapPanel">
          <div className="fakeMap">
            <div className="mapGrid" />
            <div className="seaArea" />
            <div className="road r1" />
            <div className="road r2" />
            <div className="road r3" />

            {[[28,38],[42,55],[58,34],[67,62],[77,44],[51,72],[31,70]].map((x, i) => (
              <button
                key={i}
                className={selected === places[i % places.length].name ? "pin active" : "pin"}
                style={{ left: `${x[0]}%`, top: `${x[1]}%` }}
                onClick={() => setSelected(places[i % places.length].name)}
              >
                <MapPin />
              </button>
            ))}

            <div className="mapLabel">BATUMI</div>

            <div className="mapControls">
              <button>+</button>
              <button>−</button>
            </div>

            <button className="locate"><Navigation /></button>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">keci<span>.</span></div>
        <span>Discover Batumi</span>
        <span>© 2026 keci</span>
      </footer>
    </main>
  );
}