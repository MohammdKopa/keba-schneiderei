export interface GalleryItem {
  id: string;
  src: string;
  alt: { de: string; ar: string };
  category: "anzug" | "kleid" | "detail" | "atelier";
  aspect: "portrait" | "landscape" | "square";
}

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=85",
    alt: { de: "Dreiteiler in Marineblau", ar: "بدلة ثلاثية باللون الكحلي" },
    category: "anzug",
    aspect: "portrait",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&q=85",
    alt: { de: "Handgenähtes Knopfloch", ar: "عروة مخيطة يدوياً" },
    category: "detail",
    aspect: "square",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=85",
    alt: { de: "Abendkleid in Seide", ar: "فستان سهرة من الحرير" },
    category: "kleid",
    aspect: "portrait",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=85",
    alt: { de: "Stoffauswahl im Atelier", ar: "اختيار الأقمشة في الأتولييه" },
    category: "atelier",
    aspect: "landscape",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=85",
    alt: { de: "Maßband und Kreide", ar: "متر التفصيل والطباشير" },
    category: "atelier",
    aspect: "square",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=1200&q=85",
    alt: { de: "Anprobe — Schulternaht", ar: "بروفة — خياطة الكتف" },
    category: "detail",
    aspect: "portrait",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=1200&q=85",
    alt: { de: "Hochzeitsanzug", ar: "بدلة عرس" },
    category: "anzug",
    aspect: "portrait",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=1200&q=85",
    alt: { de: "Seidenkrawatte", ar: "ربطة عنق من الحرير" },
    category: "detail",
    aspect: "square",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1508243771214-6e95d137426b?w=1200&q=85",
    alt: { de: "Kleid in Creme", ar: "فستان بلون الكريم" },
    category: "kleid",
    aspect: "portrait",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=85",
    alt: { de: "Sakko — Revers-Detail", ar: "تفصيل الياقة" },
    category: "detail",
    aspect: "landscape",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=85",
    alt: { de: "Stoffrollen", ar: "لفائف أقمشة" },
    category: "atelier",
    aspect: "landscape",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&q=85",
    alt: { de: "Maßanzug in Anthrazit", ar: "بدلة بلون الفحم" },
    category: "anzug",
    aspect: "portrait",
  },
];
