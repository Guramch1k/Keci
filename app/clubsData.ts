// Данные клубов Батуми.
//
// Чтобы добавить клуб — скопируйте один блок целиком, вставьте в конец списка
// и поменяйте значения. Больше нигде в коде ничего менять не нужно.
//
// Обязательные поля: id, name, subtitle, description, address, age, music,
// genres, image, lat, lng.
// Необязательные (если поля нет, на сайте оно просто не показывается):
// hours, status, phone, instagram, website.
//
// Координаты: правый клик на месте в Google Maps или на openstreetmap.org
// и копирование широты (lat) и долготы (lng).
// Фото: положите файл в public/clubs/ с простым именем без пробелов.

export type Club = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  address: string;
  /** Минимальный возраст, например 18 или 24 */
  age: number;
  /** Строка для показа, например "House · Electronic" */
  music: string;
  /** Теги для фильтра */
  genres: string[];
  image: string;
  lat: number;
  lng: number;
  hours?: string;
  status?: string;
  phone?: string;
  /** Только имя аккаунта, без https://instagram.com/ */
  instagram?: string;
  website?: string;
};

export const clubs: Club[] = [
  {
    id: "rooftop34",
    name: "ROOFTOP34",
    subtitle: "Rooftop · Electronic",
    description:
      "Rooftop-клуб на 34 этаже Panorama с панорамным видом на Батуми и море. Электронная музыка, DJ-сеты и ночные мероприятия.",
    address: "Sherif Khimshiashvili 15B · 34 этаж",
    age: 24,
    music: "House · Electronic",
    genres: ["House", "Electronic"],
    status: "Работает вне сезона",
    image: "/clubs/rooftop34.webp",
    lat: 41.61049,
    lng: 41.63724,
    instagram: "rooftop34_batumi",
  },
  {
    id: "senate",
    name: "SENATE",
    subtitle: "Night Club · Batumi",
    description:
      "Премиальный ночной клуб Батуми с DJ, танцполом, VIP-зонами и атмосферой до самого утра.",
    address: "Sherif Khimshiashvili 14",
    hours: "22:00 – 06:00",
    age: 24,
    music: "Open Format · DJ",
    genres: ["Open Format"],
    status: "Night Club",
    image: "/clubs/senate.webp",
    lat: 41.6109,
    lng: 41.6373,
    instagram: "senate_night_club_batumi",
  },
  {
    id: "teatro",
    name: "TEATRO",
    subtitle: "Lounge · Night Club",
    description:
      "Большой night club с живыми выступлениями, шоу-программами, DJ и VIP-зонами.",
    address: "Lech & Maria Kaczynski 5B",
    hours: "00:00 – 06:00",
    age: 18,
    music: "DJ · Live Shows",
    genres: ["Live Shows", "Open Format"],
    status: "Night Club",
    image: "/clubs/teatro.jpg",
    lat: 41.6258,
    lng: 41.6289,
    instagram: "teatro.club.batumi",
  },
];

export function getClub(id: string): Club | undefined {
  return clubs.find((club) => club.id === id);
}

export function instagramUrl(handle: string): string {
  return "https://www.instagram.com/" + handle;
}

/** Ссылка на нашу карту с выбранным клубом */
export function clubMapHref(club: Club): string {
  return "/map?place=club-" + club.id;
}

/** Все теги по алфавиту — для кнопок фильтра */
export function allGenres(): string[] {
  const set = new Set<string>();
  clubs.forEach((club) => club.genres.forEach((g) => set.add(g)));
  return Array.from(set).sort();
}
