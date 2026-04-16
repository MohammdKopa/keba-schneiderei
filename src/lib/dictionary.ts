import type { Locale } from "./business";

export const dict = {
  de: {
    nav: {
      home: "Startseite",
      atelier: "Atelier",
      leistungen: "Leistungen",
      galerie: "Galerie",
      kontakt: "Kontakt",
      call: "Termin vereinbaren",
      langLabel: "العربية",
    },
    hero: {
      eyebrow: "Seit 2022 · Marl",
      titleLines: ["Maßarbeit,", "die", "bleibt."],
      lede:
        "Keba Schneiderei — traditionelles Handwerk, modernes Design. Für jedes Kleidungsstück, das Ihnen wirklich gehören soll.",
      cta: "Termin vereinbaren",
      ctaSecondary: "Unser Atelier entdecken",
      scrollHint: "Scrollen",
    },
    craft: {
      eyebrow: "Das Handwerk",
      title: "Vier Hände, drei Anproben, ein perfektes Stück.",
      body:
        "Jedes Stück aus unserem Atelier durchläuft über siebzig Arbeitsschritte — von der Entwurfszeichnung bis zur letzten unsichtbaren Naht. Wir arbeiten langsam, weil wir nichts Halbes übergeben.",
      steps: [
        { n: "01", t: "Beratung", d: "Wir hören zu. Stil, Anlass, Geschichte — zuerst der Mensch, dann das Kleidungsstück." },
        { n: "02", t: "Maß", d: "Über zwanzig Messpunkte, jeder per Hand. Ihre Silhouette wird zur Vorlage." },
        { n: "03", t: "Schnitt", d: "Der Papierschnitt entsteht individuell — kein Standard, keine Kompromisse." },
        { n: "04", t: "Anprobe", d: "Zwei bis drei Anproben, bis jede Linie sitzt. Die Geduld gehört zum Handwerk." },
        { n: "05", t: "Finish", d: "Handgenähte Knopflöcher, präzise Bügelarbeit — die Details, die bleiben." },
      ],
    },
    services: {
      eyebrow: "Leistungen",
      title: "Was wir für Sie fertigen.",
      seeAll: "Alle Leistungen",
    },
    portfolio: {
      eyebrow: "Aus dem Atelier",
      title: "Stücke, die wir geliefert haben.",
      body: "Ein kleiner Auszug aus unserer Arbeit.",
    },
    atelier: {
      eyebrow: "Atelier",
      title: "Ahmad Keba.",
      subtitle: "Der Schneider hinter jedem Stich.",
      body: [
        "Ahmad Keba hat sein Handwerk über Jahrzehnte gelernt — in Ateliers, in denen das Wort „gut genug\u201C nicht existierte. 2022 eröffnete er mit seiner Familie sein eigenes Atelier in Marl.",
        "Was er seinen Kunden mitgibt, ist nicht nur ein Kleidungsstück: es ist die Haltung, dass echte Qualität Zeit braucht — und dass Zeit, die in ein Stück Stoff fließt, sich im Tragen zurückgibt.",
        "Wir sprechen Deutsch, Arabisch, Englisch. Und vor allem: die Sprache der Passform.",
      ],
      stats: [
        { n: 3, suffix: "+", label: "Jahre in Marl" },
        { n: 20, suffix: "+", label: "Jahre Erfahrung" },
        { n: 70, suffix: "+", label: "Arbeitsschritte pro Stück" },
        { n: 3, suffix: "", label: "Sprachen im Atelier" },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Vereinbaren Sie einen Termin.",
      body:
        "Wir nehmen uns Zeit. Rufen Sie uns an, schreiben Sie uns eine Nachricht, oder kommen Sie vorbei. Beratungstermine sind unverbindlich und kostenfrei.",
      form: {
        name: "Name",
        namePh: "Ihr Name",
        email: "E-Mail",
        emailPh: "name@email.de",
        phone: "Telefon (optional)",
        phonePh: "+49 …",
        subject: "Anliegen",
        subjects: ["Maßanzug", "Kleid nach Maß", "Änderung / Anpassung", "Sonstiges"],
        message: "Nachricht",
        messagePh: "Erzählen Sie uns, wofür wir da sein dürfen.",
        submit: "Anfrage senden",
        note: "Wir antworten in der Regel innerhalb von 24 Stunden.",
      },
      details: { call: "Anrufen", write: "Schreiben", findUs: "Zu Google Maps" },
      hours: "Öffnungszeiten",
      closed: "geschlossen",
    },
    footer: {
      tagline:
        "Maßgeschneiderte Exzellenz aus Marl. Traditionelles Handwerk, modernes Design.",
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
      call: "احجز موعداً",
      langLabel: "Deutsch",
    },
    hero: {
      eyebrow: "منذ ٢٠٢٢ · مارل",
      titleLines: ["تفصيلٌ", "يبقى،", "كأنّك."],
      lede:
        "كيبا للتفصيل — حرفة تقليدية بتصميم عصري. لكلّ قطعة تريدها أن تكون لك وحدك.",
      cta: "احجز موعداً",
      ctaSecondary: "تعرّف على الأتولييه",
      scrollHint: "انزل",
    },
    craft: {
      eyebrow: "الحرفة",
      title: "يدان، ثلاث بروفات، قطعة واحدة متقنة.",
      body:
        "كلّ قطعة تمرّ بأكثر من سبعين خطوة — من الرسم الأوّل إلى آخر غرزة غير مرئية. نعمل ببطء، لأنّنا لا نسلّم شيئاً نصف مكتمل.",
      steps: [
        { n: "٠١", t: "استشارة", d: "نُصغي أوّلاً. الأسلوب، المناسبة، الحكاية — الإنسان قبل القطعة." },
        { n: "٠٢", t: "قياس", d: "أكثر من عشرين نقطة قياس، كلّها باليد. قوامك يصير قالباً." },
        { n: "٠٣", t: "قَصّ", d: "قالب ورقي خاصّ بك — لا مقاسات جاهزة ولا تنازلات." },
        { n: "٠٤", t: "بروفة", d: "بروفتان أو ثلاث حتى يستوي كلّ خطّ. الصبر جزء من الحرفة." },
        { n: "٠٥", t: "لمسة أخيرة", d: "عراوي يدوية وكيّ دقيق — تفاصيل تبقى." },
      ],
    },
    services: {
      eyebrow: "الخدمات",
      title: "ما نخيطه لك.",
      seeAll: "كلّ الخدمات",
    },
    portfolio: {
      eyebrow: "من الأتولييه",
      title: "قطع سلّمناها.",
      body: "لمحة من عملنا.",
    },
    atelier: {
      eyebrow: "الأتولييه",
      title: "أحمد كيبا.",
      subtitle: "الخيّاط خلف كلّ غرزة.",
      body: [
        "تعلّم أحمد كيبا الحرفة عبر عقود، في ورش لم تعرف كلمة «يكفي». في عام ٢٠٢٢ افتتح مع عائلته الأتولييه الخاصّ في مدينة مارل.",
        "ما يمنحه لزبائنه ليس قطعة ملابس فقط: بل القناعة أنّ الجودة الحقيقية تحتاج وقتاً — وأنّ الوقت الذي يدخل في القماش، يردّه لك القماشُ كلّما ارتديته.",
        "نتحدّث الألمانية والعربية والإنجليزية. وقبل كلّ شيء: لغةَ القصّة.",
      ],
      stats: [
        { n: 3, suffix: "+", label: "سنوات في مارل" },
        { n: 20, suffix: "+", label: "سنة خبرة" },
        { n: 70, suffix: "+", label: "خطوة لكلّ قطعة" },
        { n: 3, suffix: "", label: "لغات في الأتولييه" },
      ],
    },
    contact: {
      eyebrow: "تواصل",
      title: "احجز موعدك.",
      body:
        "نعطيك وقتنا. اتّصل بنا، اكتب لنا، أو مرّ بنا. المواعيد الاستشارية مجّانية وغير ملزمة.",
      form: {
        name: "الاسم",
        namePh: "اسمك",
        email: "البريد الإلكتروني",
        emailPh: "name@email.com",
        phone: "الهاتف (اختياري)",
        phonePh: "+49 …",
        subject: "الموضوع",
        subjects: ["بدلة حسب الطلب", "فستان حسب القياس", "تعديل", "أخرى"],
        message: "رسالتك",
        messagePh: "أخبرنا كيف يمكننا مساعدتك.",
        submit: "إرسال الطلب",
        note: "نردّ عادةً خلال ٢٤ ساعة.",
      },
      details: { call: "اتّصال", write: "مراسلة", findUs: "جوجل مابس" },
      hours: "أوقات العمل",
      closed: "مغلق",
    },
    footer: {
      tagline: "تفصيلٌ متقَن من مارل. حرفة تقليدية بتصميم عصري.",
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
