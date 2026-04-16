export interface Service {
  id: string;
  numeral: string;
  de: { title: string; tagline: string; body: string; bullets: string[] };
  ar: { title: string; tagline: string; body: string; bullets: string[] };
  image: string;
}

export const services: Service[] = [
  {
    id: "massanzuege",
    numeral: "I",
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1400&q=85",
    de: {
      title: "Maßanzüge",
      tagline: "Der Anzug, der Ihnen gehört.",
      body:
        "Von der ersten Messung bis zur letzten Naht — jeder Anzug entsteht ausschließlich für Sie. Wir wählen gemeinsam Stoff, Schnitt und Details, und unser Team fertigt das Stück in geduldiger Handarbeit.",
      bullets: [
        "Persönliche Maßanfertigung",
        "Edle italienische & britische Stoffe",
        "Zwei Anproben, eine Passform fürs Leben",
        "Canvas-Konstruktion auf Wunsch",
      ],
    },
    ar: {
      title: "بدلات حسب الطلب",
      tagline: "بدلة تحمل اسمك وحدك.",
      body:
        "من أول قياس إلى آخر غرزة — كل بدلة تُخاط لك وحدك. نختار معاً القماش والقَصّ والتفاصيل، ويصنع فريقنا القطعة بصبر ودقّة يدوية.",
      bullets: [
        "تفصيل شخصي بالكامل",
        "أقمشة إيطالية وبريطانية راقية",
        "بروفتان اثنتان وقَصّة ترافقك سنوات",
        "هيكل كانفاس حسب الطلب",
      ],
    },
  },
  {
    id: "kleider",
    numeral: "II",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1400&q=85",
    de: {
      title: "Kleider nach Maß",
      tagline: "Eleganz, die sich trägt wie Luft.",
      body:
        "Ob Abendkleid, Brautkleid oder das eine Lieblingsstück — wir entwerfen jedes Kleid gemeinsam mit Ihnen. Silhouette, Material, Verarbeitung: jedes Detail spiegelt Ihre Persönlichkeit.",
      bullets: [
        "Abendkleider & Brautkleider",
        "Festkleider nach persönlichem Entwurf",
        "Feinste Seiden, Spitzen, Wolltuche",
        "Kurzfristige Termine auf Anfrage",
      ],
    },
    ar: {
      title: "فساتين حسب القياس",
      tagline: "أناقة تُلبَس كأنّها نسمة.",
      body:
        "فستان سهرة أو عرس أو قطعتك المفضّلة — نصمّمها معك. القوام والقماش والتفاصيل، كلّها تعكس شخصيّتك.",
      bullets: [
        "فساتين سهرة وأعراس",
        "فساتين مناسبات بتصميم شخصي",
        "حرير وأقمشة دانتيل وصوف فاخرة",
        "مواعيد عاجلة عند الطلب",
      ],
    },
  },
  {
    id: "anpassungen",
    numeral: "III",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1400&q=85",
    de: {
      title: "Umbauten & Anpassungen",
      tagline: "Damit jedes Kleidungsstück wieder passt.",
      body:
        "Hosen kürzen, Jacken enger stellen, Kleider umarbeiten — wir behandeln Ihre Lieblingsstücke mit derselben Sorgfalt wie eine Maßanfertigung. Schnell, präzise, unsichtbar.",
      bullets: [
        "Hosen- und Ärmelkürzungen",
        "Taillierung & Weitenänderung",
        "Reißverschlüsse & Futter",
        "Reparatur und Wiederherstellung",
      ],
    },
    ar: {
      title: "تعديلات وتفصيلات",
      tagline: "حتى تعود كلّ قطعة على قياسك.",
      body:
        "تقصير بنطال، تضييق جاكيت، تعديل فستان — نعامل قطعك المفضّلة بالعناية ذاتها التي نمنحها لقطعة مفصّلة. سريع ودقيق وغير مرئي.",
      bullets: [
        "تقصير بناطيل وأكمام",
        "تضييق وتوسيع",
        "سحّابات وبطانات",
        "ترميم وإصلاح",
      ],
    },
  },
  {
    id: "zubehoer",
    numeral: "IV",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=1400&q=85",
    de: {
      title: "Zubehör & Details",
      tagline: "Das Detail, das alles verändert.",
      body:
        "Krawatten, Einstecktücher, Schals — individuell gefertigt aus dem Stoff Ihres Anzugs oder eines anderen Lieblingsmaterials. Die kleinen Dinge machen den Herrn, die Dame, den Stil.",
      bullets: [
        "Maßkrawatten & Fliegen",
        "Einstecktücher aus Seide",
        "Schals aus Kaschmir & Wolle",
        "Passend zum Anzug gefertigt",
      ],
    },
    ar: {
      title: "إكسسوارات وتفاصيل",
      tagline: "التفصيل الصغير يُغيّر كلّ شيء.",
      body:
        "ربطات عنق، محارم جيب، شالات — كلّها مصنوعة من قماش بدلتك أو من قماشك المفضّل. التفاصيل هي التي تصنع الأسلوب.",
      bullets: [
        "ربطات عنق وفيونكات مفصّلة",
        "محارم جيب حرير",
        "شالات كشمير وصوف",
        "منسجمة مع بدلتك",
      ],
    },
  },
];
