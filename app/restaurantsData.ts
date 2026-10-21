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
  /** true — ресторан показывается на главной странице в блоке «Популярное» */
  featured?: boolean;
  lat?: number;
  lng?: number;
};

export const restaurants: Restaurant[] = [
  { id: "hb-batumi", name: "HB Batumi", image: "/restaurants/HB.WEBP", cuisine: "Грузинская · Европейская", hours: "10:30 – 23:30", phone: "+995 593 52 56 52", featured: true },
  { id: "tavaduri", name: "Tavaduri", nameKa: "თავადური", image: "/restaurants/tavaduri.JPG", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 514 00 00 08" },
  { id: "pirosmani", name: "Pirosmani", nameKa: "ფიროსმანი", image: "/restaurants/pirosmani.JPG", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 595 26 30 30" },
  { id: "gourmand", name: "Gourmand", nameKa: "გურმანი", image: "/restaurants/gourmand.JPG", cuisine: "Грузинская · Европейская", hours: "09:00 – 00:00", phone: "+995 514 68 06 80" },
  { id: "new-era", name: "New Era", nameKa: "ახალი ერა", image: "/restaurants/new%20era.JPG", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 593 72 22 77" },
  { id: "bern", name: "Bern", nameKa: "ბერნი", image: "/restaurants/bern.PNG", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 591 62 00 05", featured: true },
  { id: "grill-town", name: "Grill Town", nameKa: "გრილ თაუნი", image: "/restaurants/grill%20town.JPG", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 500 10 00 05" },
  { id: "veranda-acropoli", name: "Veranda Acropoli", nameKa: "ვერანდა აკროპოლი", image: "/restaurants/veranda%20acropoli.JPG", cuisine: "Грузинская · Европейская", hours: "10:00 – 02:00", phone: "+995 596 21 00 11", featured: true },
  { id: "panorama", name: "Panorama", nameKa: "პანორამა", image: "/restaurants/panorama.JPG", cuisine: "Грузинская · Европейская", hours: "12:00 – 00:00", phone: "+995 598 42 42 42", featured: true },
  { id: "bk", name: "BK", image: "/restaurants/BK.JPG", cuisine: "Грузинская · Европейская", hours: "09:00 – 02:00", phone: "+995 514 81 13 13" },
  { id: "g17", name: "G17", image: "/restaurants/G17.JPG", cuisine: "Грузинская · Европейская", hours: "11:00 – 02:00", phone: "+995 511 44 17 17" },
  { id: "alaverdi", name: "Alaverdi", nameKa: "ალავერდი", image: "/restaurants/alaverdi.JPG", cuisine: "Грузинская · Европейская", hours: "10:00 – 00:00", phone: "+995 555 77 36 36" },
  { id: "rustaveli", name: "Rustaveli", image: "/restaurants/rustaveli.JPG", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 550 00 80 80" },
  { id: "munich", name: "Munich", image: "/restaurants/munich.JPG", cuisine: "Грузинская · Европейская", hours: "11:00 – 00:00", phone: "+995 514 88 83 38" },
  { id: "senate-restaurant", name: "Senate", image: "/restaurants/senate.WEBP", cuisine: "Грузинская · Европейская", hours: "10:00 – 01:00", phone: "+995 550 00 00 80" },
  { id: "ambassadori", name: "Ambassadori", image: "/restaurants/ambassadori.WEBP", cuisine: "Европейская", hours: "12:00 – 22:30", phone: "+995 555 77 44 88" },
];

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
