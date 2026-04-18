export interface GalleryItem {
  id: string;
  src: string;
  alt: { de: string; ar: string };
  category: "anderung" | "anzug" | "kleid" | "detail" | "atelier";
  aspect: "portrait" | "landscape" | "square";
}

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/atelier/suit-buttons.jpg",
    alt: {
      de: "Sakko-Manschetten — Knopfdetail nach der Anpassung",
      ar: "كمّات جاكيت — تفاصيل الأزرار بعد التعديل",
    },
    category: "detail",
    aspect: "portrait",
  },
  {
    id: "g2",
    src: "/images/atelier/brother-machine.jpg",
    alt: {
      de: "Brother Industriemaschine im Atelier",
      ar: "ماكينة خياطة برذر الصناعية في الأتولييه",
    },
    category: "atelier",
    aspect: "portrait",
  },
  {
    id: "g3",
    src: "/images/atelier/plaid-dress.jpg",
    alt: {
      de: "Kariertes Kinderkleid — angepasst auf Größe",
      ar: "فستان أطفال مقلّم — بعد تعديل القياس",
    },
    category: "kleid",
    aspect: "portrait",
  },
  {
    id: "g4",
    src: "/images/atelier/tools-flatlay.jpg",
    alt: {
      de: "Werkzeug des Schneiders — Schere, Maßband, Nahttrenner",
      ar: "أدوات الخيّاط — مقصّات ومتر ونازع غُرز",
    },
    category: "atelier",
    aspect: "landscape",
  },
  {
    id: "g5",
    src: "/images/atelier/polka-dress.jpg",
    alt: {
      de: "Punktekleid mit Tüllsaum — Maßanfertigung",
      ar: "فستان منقّط بحاشية تول — تفصيل",
    },
    category: "kleid",
    aspect: "portrait",
  },
  {
    id: "g6",
    src: "/images/atelier/embroidery-machine.jpg",
    alt: {
      de: "Stickmaschine — Namen und Logos auf Stoff",
      ar: "ماكينة تطريز — أسماء وشعارات على القماش",
    },
    category: "detail",
    aspect: "landscape",
  },
  {
    id: "g7",
    src: "/images/atelier/yellow-suit-form.jpg",
    alt: {
      de: "Gelber Zweiteiler auf der Schneiderpuppe",
      ar: "طقم أصفر على كرّاكة الخياطة",
    },
    category: "anzug",
    aspect: "portrait",
  },
  {
    id: "g8",
    src: "/images/atelier/button-press.jpg",
    alt: {
      de: "Knopfpresse — für präzise Knopfanbringung",
      ar: "مكبس الأزرار — لتركيب دقيق",
    },
    category: "detail",
    aspect: "portrait",
  },
  {
    id: "g9",
    src: "/images/atelier/workstation.jpg",
    alt: {
      de: "Arbeitsplatz im Atelier — Maschinen und Garn",
      ar: "طاولة العمل في الأتولييه — مكائن وخيوط",
    },
    category: "atelier",
    aspect: "landscape",
  },
  {
    id: "g10",
    src: "/images/atelier/reception.jpg",
    alt: {
      de: "Atelier Keba — Empfang und Garderobe",
      ar: "أتولييه كيبا — الاستقبال والخزانة",
    },
    category: "atelier",
    aspect: "landscape",
  },
];
