export interface Service {
  id: string;
  numeral: string;
  de: { title: string; tagline: string; body: string; bullets: string[] };
  ar: { title: string; tagline: string; body: string; bullets: string[] };
  image: string;
}

export const services: Service[] = [
  {
    id: "anderungen",
    numeral: "I",
    image: "/images/atelier/tools-flatlay.jpg",
    de: {
      title: "Änderungen",
      tagline: "Damit jedes Stück wieder passt.",
      body:
        "Das Herz unseres Ateliers. Hosen kürzen, Taillen enger, Ärmel anpassen, Kleider umarbeiten — wir nehmen jedes Stück in die Hand, ob Jeans aus dem Kaufhaus oder Lieblingsjacke aus dem Schrank.",
      bullets: [
        "Hosen und Ärmel kürzen",
        "Taillierung & Weitenänderung",
        "Kleider und Röcke umarbeiten",
        "Meist innerhalb weniger Tage fertig",
      ],
    },
    ar: {
      title: "تعديلات",
      tagline: "لتعود كلّ قطعة على مقاسك.",
      body:
        "قلب أتوليييهنا. نُقصّر البناطيل، نُضيّق الخصر، نُعدّل الأكمام، نُعيد خياطة الفساتين — أيّ قطعة: من جينز الأسواق إلى الجاكيت المفضّل في خزانتك.",
      bullets: [
        "تقصير بناطيل وأكمام",
        "تضييق وتوسيع",
        "تعديل فساتين وتنّورات",
        "عادةً جاهزة خلال أيام",
      ],
    },
  },
  {
    id: "reparaturen",
    numeral: "II",
    image: "/images/atelier/button-press.jpg",
    de: {
      title: "Reparaturen & Reißverschlüsse",
      tagline: "Unsichtbar geflickt, nicht ersetzt.",
      body:
        "Der Reißverschluss an der Lieblingsjacke ist kaputt? Die Naht an der Sporttasche geplatzt? Ein Knopf fehlt? Wir reparieren, statt wegzuwerfen — und die Stelle sieht aus, als wäre nie etwas gewesen.",
      bullets: [
        "Reißverschluss-Wechsel (alle Größen)",
        "Nähte, Risse, Löcher unsichtbar schließen",
        "Knöpfe ersetzen oder neu annähen",
        "Leder- und Kunstleder-Reparatur",
      ],
    },
    ar: {
      title: "إصلاحات وسحّابات",
      tagline: "نرقَعُ بلا أثرٍ، ولا نستبدل.",
      body:
        "سحّابُ جاكيتك المفضّلة لا يعمل؟ خياطة الحقيبة انفتقت؟ زرٌّ ناقص؟ نُصلح بدل أن نُلقي — ويعود الموضع كأنّ شيئاً لم يكن.",
      bullets: [
        "تبديل السحّابات بجميع القياسات",
        "إغلاق الخياطات والفتوق والثقوب بلا أثر",
        "تبديل الأزرار وتثبيتها",
        "إصلاح الجلد والجلد الصناعي",
      ],
    },
  },
  {
    id: "bestickung",
    numeral: "III",
    image: "/images/atelier/embroidery-machine.jpg",
    de: {
      title: "Bestickung",
      tagline: "Ihr Name, Ihr Logo — gestickt statt gedruckt.",
      body:
        "Mit unserer Happy-Industriestickmaschine besticken wir T-Shirts, Arbeitskleidung, Handtücher und Stoffe mit Namen und Logos. Langlebig, waschfest, hochwertig — perfekt für Vereine, Firmen und Gastgeschenke.",
      bullets: [
        "Namen und Initialen",
        "Firmenlogos auf Berufskleidung",
        "Vereinsemblem und Mannschaftstrikots",
        "Kleinauflagen ab einem Stück",
      ],
    },
    ar: {
      title: "تطريز",
      tagline: "اسمك، شعارُك — تطريزاً لا طبعاً.",
      body:
        "نُطرّز القمصان وملابس العمل والمناشف والأقمشة بالأسماء والشعارات عبر ماكينة Happy الصناعية. خياطة متينة تتحمّل الغسيل — مثالية للأندية والشركات والهدايا.",
      bullets: [
        "أسماء وأحرف أولى",
        "شعارات شركات على الزيّ الرسمي",
        "شارات أندية وقمصان فرق",
        "حتى قطعة واحدة",
      ],
    },
  },
  {
    id: "vorhaenge",
    numeral: "IV",
    image: "/images/atelier/workstation.jpg",
    de: {
      title: "Vorhänge",
      tagline: "Für Krankenhäuser, Restaurants, Säle — und Zuhause.",
      body:
        "Wir fertigen und ändern Vorhänge in allen Größen: vom Patientenzimmer über den Restaurantsaal bis zum Wohnzimmerfenster. Inklusive Zuschnitt, Säumen, Bänder und Ringe.",
      bullets: [
        "Neu anfertigen nach Maß",
        "Kürzen und Anpassen bestehender Vorhänge",
        "Objektaufträge: Klinik, Gastronomie, Halle",
        "Transparent, blickdicht, Verdunklung",
      ],
    },
    ar: {
      title: "ستائر",
      tagline: "للمستشفيات والمطاعم والقاعات — والبيوت أيضاً.",
      body:
        "نخيط ونُعدّل الستائر بجميع القياسات: من غرف المرضى إلى قاعات المطاعم إلى نوافذ غرف المعيشة. يشمل القصّ والتَكعيب والأشرطة والحلقات.",
      bullets: [
        "خياطة جديدة حسب المقاس",
        "تقصير وتعديل ستائر قائمة",
        "مشاريع: عيادات ومطاعم وقاعات",
        "شفّافة أو عاتمة أو كاتمة للضوء",
      ],
    },
  },
  {
    id: "massanfertigung",
    numeral: "V",
    image: "/images/atelier/suit-buttons.jpg",
    de: {
      title: "Maßanfertigung",
      tagline: "Wenn Sie es wirklich als Ihres wollen.",
      body:
        "Neben dem Alltag im Atelier fertigen wir auch komplette Stücke nach Maß — Anzüge, Kleider, Festgarderobe. Persönliche Beratung, zwei bis drei Anproben, das Stück entsteht ausschließlich für Sie.",
      bullets: [
        "Maßanzüge und Sakkos",
        "Abendkleider & Festgarderobe",
        "Eigener Entwurf oder nach Vorbild",
        "Zwei bis drei Anproben",
      ],
    },
    ar: {
      title: "تفصيل حسب الطلب",
      tagline: "حين تريدها لك وحدك.",
      body:
        "إلى جانب يوميات الأتولييه، نُفصّل القطع كاملة — بدلات، فساتين، أزياء المناسبات. استشارة شخصية وبروفتان إلى ثلاث، والقطعة تُخاط لك وحدك.",
      bullets: [
        "بدلات وسترات حسب الطلب",
        "فساتين سهرة وأزياء مناسبات",
        "تصميم خاصّ أو نقل عن نموذج",
        "بروفتان إلى ثلاث",
      ],
    },
  },
];
