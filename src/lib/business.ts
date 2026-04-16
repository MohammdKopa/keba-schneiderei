export const business = {
  name: "Keba Schneiderei",
  owner: "Ahmad Keba",
  founded: 2022,
  address: {
    street: "Berststraße 25",
    zip: "45770",
    city: "Marl",
    country: "DE",
    full: "Berststraße 25, 45770 Marl",
  },
  coordinates: { lat: 51.6655074, lng: 7.1268205 },
  phone: "02365 5125212",
  phoneHref: "+4923655125212",
  email: "info@kebaschneiderei.com",
  whatsapp: "+49 176 75270270",
  whatsappHref: "4917675270270",
  instagram: "https://www.instagram.com/kebaschneiderei/",
  googleMaps:
    "https://www.google.com/maps/place/Keba+Schneiderei/@51.6655074,7.1268205,17z",
  siteUrl: "https://kebaschneiderei.com",
} as const;

export interface OpeningHour {
  dayDe: string;
  dayAr: string;
  dayEn: string;
  sessions: string[]; // empty array = closed
}

export const openingHours: OpeningHour[] = [
  { dayDe: "Montag",     dayAr: "الإثنين", dayEn: "Monday",    sessions: ["09:00 – 13:00", "14:30 – 18:00"] },
  { dayDe: "Dienstag",   dayAr: "الثلاثاء", dayEn: "Tuesday",   sessions: ["09:00 – 13:00", "14:30 – 18:00"] },
  { dayDe: "Mittwoch",   dayAr: "الأربعاء", dayEn: "Wednesday", sessions: ["09:00 – 13:00"] },
  { dayDe: "Donnerstag", dayAr: "الخميس",   dayEn: "Thursday",  sessions: ["09:00 – 13:00", "14:30 – 18:00"] },
  { dayDe: "Freitag",    dayAr: "الجمعة",   dayEn: "Friday",    sessions: ["09:00 – 13:00", "14:30 – 18:00"] },
  { dayDe: "Samstag",    dayAr: "السبت",    dayEn: "Saturday",  sessions: ["09:00 – 13:00"] },
  { dayDe: "Sonntag",    dayAr: "الأحد",    dayEn: "Sunday",    sessions: [] },
];

export type Locale = "de" | "ar";

export const locales: Locale[] = ["de", "ar"];

export const routes = {
  de: {
    home: "/",
    atelier: "/atelier",
    leistungen: "/leistungen",
    galerie: "/galerie",
    kontakt: "/kontakt",
  },
  ar: {
    home: "/ar",
    atelier: "/ar/atelier",
    leistungen: "/ar/leistungen",
    galerie: "/ar/galerie",
    kontakt: "/ar/kontakt",
  },
} as const;
