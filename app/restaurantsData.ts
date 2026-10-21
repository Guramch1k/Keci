// Данные ресторанов Батуми.
//
// Чтобы добавить ресторан — скопируйте один блок целиком, вставьте в конец
// списка и поменяйте значения. Фото кладите в public/restaurants/
// с простым именем без пробелов (например retro.webp).
//
// Обязательные поля: id, name, image.
// Ссылки: instagram (только имя аккаунта), facebook, website, menu (полные адреса).
// Остальные поля необязательны: если поля нет, на сайте оно не показывается.
// Координаты (lat, lng) нужны для карты: правый клик на месте в Google Maps.

export type Restaurant = {
  id: string;
  name: string;
  /** Название на грузинском */
  nameKa?: string;
  image: string;
  /** Например "Грузинская" */
  cuisine?: string;
  /** "$", "$$" или "$$$" */
  price?: string;
  address?: string;
  hours?: string;
  phone?: string;
  /** Только имя аккаунта, без https://instagram.com/ */
  instagram?: string;
  website?: string;
  /** Ссылка на Facebook-страницу целиком, например https://facebook.com/... */
  facebook?: string;
  /** Ссылка на меню (сайт, PDF или Instagram-подборка) */
  menu?: string;
  description?: string;
  lat?: number;
  lng?: number;
};

export const restaurants: Restaurant[] = [
  { id: "hb-batumi", name: "HB Batumi", image: "/restaurants/hb-batumi.webp", cuisine: "Грузинская · Европейская", hours: "10:30 – 23:30", phone: "+995 593 52 56 52" },
  { id: "tavaduri", name: "Tavaduri", nameKa: "თავადური", image: "/restaurants/tavaduri.webp", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 514 00 00 08" },
  { id: "pirosmani", name: "Pirosmani", nameKa: "ფიროსმანი", image: "/restaurants/pirosmani.webp", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 595 26 30 30" },
  { id: "gourmand", name: "Gourmand", nameKa: "გურმანი", image: "/restaurants/gourmand.webp", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 514 68 06 80" },
  { id: "new-era", name: "New Era", nameKa: "ახალი ერა", image: "/restaurants/new-era.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 593 72 22 77" },
  { id: "bern", name: "Bern", nameKa: "ბერნი", image: "/restaurants/bern.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 591 62 00 05" },
  { id: "grill-town", name: "Grill Town", nameKa: "გრილ თაუნი", image: "/restaurants/grill-town.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 500 10 00 05" },
  { id: "veranda-acropoli", name: "Veranda Acropoli", nameKa: "ვერანდა აკროპოლი", image: "/restaurants/veranda-acropoli.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 02:00", phone: "+995 596 21 00 11" },
  { id: "panorama", name: "Panorama", nameKa: "პანორამა", image: "/restaurants/panorama.webp", cuisine: "Грузинская · Европейская", hours: "12:00 – 00:00", phone: "+995 598 42 42 42" },
  { id: "bk", name: "BK", image: "/restaurants/bk.webp", cuisine: "Грузинская · Европейская", hours: "09:00 – 02:00", phone: "+995 514 81 13 13" },
  { id: "g17", name: "G17", image: "/restaurants/g17.webp", cuisine: "Грузинская · Европейская", hours: "11:00 – 02:00", phone: "+995 511 44 17 17" },
  { id: "alaverdi", name: "Alaverdi", nameKa: "ალავერდი", image: "/restaurants/alaverdi.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 555 77 36 36" },
  { id: "rustaveli", name: "Rustaveli", image: "/restaurants/rustaveli.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 550 00 80 80" },
  { id: "munich", name: "Munich", image: "/restaurants/munich.webp", cuisine: "Грузинская · Европейская", hours: "11:00 – 00:00", phone: "+995 514 88 83 38" },
  { id: "senate-restaurant", name: "Senate", image: "/restaurants/senate-restaurant.webp", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 550 00 00 80" },
  { id: "ambassadori", name: "Ambassadori", image: "/restaurants/ambassadori.webp", cuisine: "Европейская", hours: "12:00 – 22:30", phone: "+995 555 77 44 88" },
];

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
