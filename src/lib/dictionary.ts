import type { Locale } from "./business";

export const dict = {
  de: {
    nav: {
      home: "Startseite",
      atelier: "Atelier",
      leistungen: "Leistungen",
      galerie: "Galerie",
      kontakt: "Kontakt",
      call: "Vorbeikommen",
      langLabel: "العربية",
    },
    hero: {
      eyebrow: "Änderungsschneiderei · Marl · seit 2022",
      titleLines: ["Änderungen,", "die", "sitzen."],
      lede:
        "Keba Schneiderei in Marl — Änderungen, Bestickung, Reparaturen und Maßanfertigung. Wir machen, dass jedes Stück wieder auf Sie passt.",
      cta: "Vorbeikommen",
      ctaSecondary: "Unser Atelier entdecken",
      scrollHint: "Scrollen",
    },
    craft: {
      eyebrow: "Das Handwerk",
      title: "Bringen. Prüfen. Ändern. Anprobieren. Fertig.",
      body:
        "Jedes Stück wird mit der gleichen Sorgfalt behandelt — ob Änderung, Reparatur oder Maßanfertigung. Wir arbeiten gründlich, weil ein Kleidungsstück erst dann sitzt, wenn Sie es nicht mehr spüren.",
      steps: [
        { n: "01", t: "Gespräch", d: "Was stört, was soll besser sitzen? Wir hören zu, bevor wir messen." },
        { n: "02", t: "Prüfen", d: "Nahtbild, Stoff, Verschluss — wir zeigen Ihnen, was möglich ist und was nicht." },
        { n: "03", t: "Arbeit", d: "Industriemaschinen für Struktur, Handarbeit für die unsichtbaren Stellen." },
        { n: "04", t: "Anprobe", d: "Sie kommen zur Probe, wir justieren nach. Bis die Linie sitzt." },
        { n: "05", t: "Fertig", d: "Sauber gebügelt, verpackt, abholbereit — meist innerhalb weniger Tage." },
      ],
    },
    services: {
      eyebrow: "Leistungen",
      title: "Was wir für Sie machen.",
      seeAll: "Alle Leistungen",
    },
    portfolio: {
      eyebrow: "Aus dem Atelier",
      title: "Arbeiten, die unser Haus verlassen.",
      body: "Ein Blick in den Alltag bei Keba — Nähte, Stoffe, Details.",
    },
    atelier: {
      eyebrow: "Der Schneider",
      title: "Ahmad Keba.",
      subtitle: "Über dreißig Jahre an der Nadel.",
      body: [
        "Ahmad Keba hat sein Handwerk über mehr als drei Jahrzehnte gelernt — in Ateliers, in denen das Wort „gut genug\u201C nicht existierte. 2022 eröffnete er mit seiner Familie sein eigenes Atelier in Marl.",
        "Heute kürzen wir Hosen, engen Jacken ein, wechseln Reißverschlüsse, besticken T-Shirts mit Ihrem Namen, nähen Vorhänge für Krankenhäuser und Restaurants — und fertigen, wenn Sie es wünschen, einen ganzen Anzug nach Maß.",
        "Wir sprechen Deutsch, Arabisch, Englisch. Und vor allem: die Sprache der Passform.",
      ],
      stats: [
        { n: 3, suffix: "+", label: "Jahre in Marl" },
        { n: 30, suffix: "+", label: "Jahre Erfahrung" },
        { n: 1000, suffix: "+", label: "Änderungen pro Jahr" },
        { n: 3, suffix: "", label: "Sprachen im Atelier" },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Kommen Sie vorbei.",
      body:
        "Am schnellsten ist es, wenn Sie das Kleidungsstück direkt mitbringen. Rufen Sie an, schreiben Sie uns — oder kommen Sie einfach spontan in der Berststraße vorbei.",
      form: {
        name: "Name",
        namePh: "Ihr Name",
        email: "E-Mail",
        emailPh: "name@email.de",
        phone: "Telefon (optional)",
        phonePh: "+49 …",
        subject: "Anliegen",
        subjects: [
          "Änderung / Anpassung",
          "Reparatur / Reißverschluss",
          "Bestickung",
          "Vorhänge",
          "Waschen & Bügeln",
          "Maßanfertigung",
          "Sonstiges",
        ],
        message: "Nachricht",
        messagePh: "Beschreiben Sie kurz, um welches Stück es geht.",
        submit: "Anfrage senden",
        note: "Wir antworten in der Regel innerhalb von 24 Stunden.",
      },
      details: { call: "Anrufen", write: "Schreiben", findUs: "Zu Google Maps" },
      hours: "Öffnungszeiten",
      closed: "geschlossen",
    },
    footer: {
      tagline:
        "Änderungsschneiderei in Marl. Bestickung, Reparaturen und Maßanfertigung — damit jedes Stück wieder passt.",
      links: "Navigation",
      hours: "Öffnungszeiten",
      visit: "Besuchen Sie uns",
      rights: "Alle Rechte vorbehalten.",
      impressum: "Impressum",
      datenschutz: "Datenschutz",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      atelier: "الأتولييه",
      leistungen: "الخدمات",
      galerie: "المعرض",
      kontakt: "تواصل",
      call: "مرّ علينا",
      langLabel: "Deutsch",
    },
    hero: {
      eyebrow: "خياطة تعديلات · مارل · منذ ٢٠٢٢",
      titleLines: ["تعديلاتٌ", "تليقُ", "بك."],
      lede:
        "كيبا في مارل — تعديلات، تطريز، إصلاحات، وتفصيل. نُعيد كلّ قطعة إلى مقاسها.",
      cta: "مرّ علينا",
      ctaSecondary: "تعرّف على الأتولييه",
      scrollHint: "انزل",
    },
    craft: {
      eyebrow: "الحرفة",
      title: "تأتي. نفحص. نُعدّل. بروفة. جاهز.",
      body:
        "كلّ قطعة تُعامَل بالعناية ذاتها — سواء أكانت تعديلاً، إصلاحاً أم تفصيلاً جديداً. نعمل بدقّة، لأنّ القطعة لا تليق بك إلّا حين تنساها على جسدك.",
      steps: [
        { n: "٠١", t: "حديث", d: "ما الذي يزعجك، وما الذي يجب أن يليق أكثر؟ نُصغي قبل أن نقيس." },
        { n: "٠٢", t: "فحص", d: "خياطة، قماش، سحّاب — نريك ما يمكن وما لا يمكن." },
        { n: "٠٣", t: "عمل", d: "مكائن صناعية للبنية، ويد للتفاصيل غير المرئية." },
        { n: "٠٤", t: "بروفة", d: "تأتي للبروفة، نُعدّل مرّة أخيرة. حتى يستوي الخطّ." },
        { n: "٠٥", t: "جاهز", d: "مكويّة، مغلّفة، جاهزة للاستلام — عادةً خلال أيام." },
      ],
    },
    services: {
      eyebrow: "الخدمات",
      title: "ما نعمله لك.",
      seeAll: "كلّ الخدمات",
    },
    portfolio: {
      eyebrow: "من الأتولييه",
      title: "أعمالٌ تخرج من بيتنا.",
      body: "لمحة من يوميات كيبا — خياطات وأقمشة وتفاصيل.",
    },
    atelier: {
      eyebrow: "الخيّاط",
      title: "أحمد كيبا.",
      subtitle: "أكثر من ثلاثين عاماً بالإبرة.",
      body: [
        "تعلّم أحمد كيبا الحرفة عبر أكثر من ثلاثة عقود، في ورش لم تعرف كلمة «يكفي». في عام ٢٠٢٢ افتتح مع عائلته الأتولييه الخاصّ في مدينة مارل.",
        "اليوم نُقصّر البناطيل، نُضيّق الجاكيتات، نُبدّل السحّابات، نطرّز الأسماء على القمصان، نخيط ستائر المستشفيات والمطاعم — ونُفصّل بدلةً كاملة حين تطلبها.",
        "نتحدّث الألمانية والعربية والإنجليزية. وقبل كلّ شيء: لغةَ القصّة.",
      ],
      stats: [
        { n: 3, suffix: "+", label: "سنوات في مارل" },
        { n: 30, suffix: "+", label: "سنة خبرة" },
        { n: 1000, suffix: "+", label: "تعديل في السنة" },
        { n: 3, suffix: "", label: "لغات في الأتولييه" },
      ],
    },
    contact: {
      eyebrow: "تواصل",
      title: "مرّ علينا.",
      body:
        "الأسرع أن تُحضر القطعة معك. اتّصل بنا، اكتب لنا، أو مرّ بنا في شارع Berststraße.",
      form: {
        name: "الاسم",
        namePh: "اسمك",
        email: "البريد الإلكتروني",
        emailPh: "name@email.com",
        phone: "الهاتف (اختياري)",
        phonePh: "+49 …",
        subject: "الموضوع",
        subjects: [
          "تعديل",
          "إصلاح / سحّاب",
          "تطريز",
          "ستائر",
          "غسيل وكيّ",
          "تفصيل حسب الطلب",
          "أخرى",
        ],
        message: "رسالتك",
        messagePh: "أخبرنا باختصار عن القطعة.",
        submit: "إرسال الطلب",
        note: "نردّ عادةً خلال ٢٤ ساعة.",
      },
      details: { call: "اتّصال", write: "مراسلة", findUs: "جوجل مابس" },
      hours: "أوقات العمل",
      closed: "مغلق",
    },
    footer: {
      tagline:
        "خياطة تعديلات في مارل. تطريز، إصلاحات، وتفصيل — لتعود كلّ قطعة على مقاسك.",
      links: "تصفّح",
      hours: "أوقات العمل",
      visit: "زُرنا",
      rights: "جميع الحقوق محفوظة.",
      impressum: "البيانات القانونية",
      datenschutz: "الخصوصية",
    },
  },
} as const;

export function t(locale: Locale) {
  return dict[locale];
}
