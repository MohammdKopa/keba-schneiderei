/**
 * Real Google reviews for Keba Schneiderei.
 * Pulled from https://www.google.com/maps/place/Keba+Schneiderei
 *
 * The German text is the verbatim review. The Arabic is a translation.
 */

export interface Review {
  name: string;
  stars: number;
  context?: string;
  quote: { de: string; ar: string };
  featured?: boolean;
}

export const reviewsMeta = {
  rating: 5.0,
  total: 11,
  profileUrl: "https://www.google.com/maps/place/Keba+Schneiderei/@51.6655074,7.1268205,17z",
};

export const reviews: Review[] = [
  {
    name: "— Google Rezension",
    stars: 5,
    context: "vor 4 Monaten",
    featured: true,
    quote: {
      de: "Ein außergewöhnlich guter Fachmann mit sehr großem Herz und beeindruckendem Talent. Seine Arbeit ist echte Kunst — er ist ein wahrer Künstler. Jede Änderung wird mit Sorgfalt und höchstem Qualitätsanspruch ausgeführt.",
      ar: "حِرفيٌّ استثنائيّ بقلب كبير وموهبة مُبهرة. عمله فنٌّ حقيقي — إنّه فنّانٌ بالفعل. كلّ تعديل يُنفَّذ بعناية ومعيار عالٍ من الجودة.",
    },
  },
  {
    name: "Marcel Retkowski",
    stars: 5,
    context: "vor einem Jahr",
    quote: {
      de: "Die Schneiderei in Marl überzeugt auf ganzer Linie. Fachwissen und Handwerkskunst sind erstklassig, jede Arbeit wird präzise und sorgfältig ausgeführt. Der Service ist professionell und freundlich. Absolut empfehlenswert!",
      ar: "أتولييه مارل يُقنع على كلّ الأصعدة. المعرفة والحرفة من الطراز الأوّل، كلّ قطعة تُنفَّذ بدقّة وعناية. الخدمة مهنيّة وودودة. أنصح به بشدّة!",
    },
  },
  {
    name: "Melek Bas",
    stars: 5,
    context: "vor 2 Monaten",
    quote: {
      de: "Sehr nett — hat von unserer Tochter den Reißverschluss der Jacke genäht und keinen Cent genommen, was heutzutage nicht selbstverständlich ist.",
      ar: "لطيفٌ جدّاً — خاط سحّاب جاكيت ابنتنا ولم يأخذ سنتاً واحداً، وهذا شيء غير بديهيّ في أيّامنا.",
    },
  },
  {
    name: "Daniel Wagner",
    stars: 5,
    context: "vor 3 Monaten",
    quote: {
      de: "Sympathischer Mann. Super gute Arbeit. Schnell, günstig und gut. Ich bin spontan vorbei gekommen und mein Rucksack wurde sofort genäht — sieht wie neu aus. 10/10!",
      ar: "رجلٌ لطيف. عملٌ رائع. سريع، مناسب السعر، وجيّد. مررتُ عفوياً فخاط حقيبة ظهري على الفور — صارت كأنّها جديدة. ١٠/١٠!",
    },
  },
  {
    name: "Hang Chu",
    stars: 5,
    context: "Local Guide · vor 4 Monaten",
    quote: {
      de: "Ich bin hier schon zweimal gewesen und vollkommen zufrieden. Der Inhaber ist sympathisch und hilfsbereit, kennt sich aus und macht gute Arbeit. Preislich ist es auch in Ordnung. Top, weiter so!",
      ar: "جئتُ إلى هنا مرّتين وأنا راضٍ تماماً. صاحب المحل لطيف ومتعاون، يفهم عمله ويُتقنه. الأسعار معقولة أيضاً. رائع، استمرّوا!",
    },
  },
  {
    name: "Destan",
    stars: 5,
    context: "vor 4 Monaten",
    quote: {
      de: "Super und schnelle Arbeit. Bin sehr zufrieden und laufe lieber hier hin als zum Schneider vor meiner Haustür. Viel bessere Arbeit und guter Service. Top.",
      ar: "عمل رائع وسريع. أنا راضٍ جدّاً وأُفضّل القدوم إلى هنا بدلاً من الخيّاط أمام بيتي. عمل أفضل بكثير وخدمة ممتازة.",
    },
  },
  {
    name: "Emad Bacha",
    stars: 5,
    context: "Local Guide · vor 10 Monaten",
    quote: {
      de: "Ja, er ist der beste Schneider und Kleidermacher.",
      ar: "نعم، إنّه أفضل خيّاط ومُفصِّل ملابس.",
    },
  },
  {
    name: "Marie Ratsch",
    stars: 5,
    context: "vor 4 Monaten",
    quote: {
      de: "Ich kann sie nur empfehlen — sehr nett, versteht sein Handwerk und auch schnell. Eine wirkliche Herzensempfehlung.",
      ar: "لا يمكنني إلاّ التوصية — لطيفٌ جدّاً، يُتقن حرفته وسريع أيضاً. توصيةٌ من القلب.",
    },
  },
  {
    name: "Winfried Cirkel",
    stars: 5,
    context: "vor einem Jahr",
    quote: {
      de: "Sehr freundlich, hilfsbereit, sehr gute und schnelle Arbeit. Wirklich zu empfehlen. Ich wünsche ihnen viel Erfolg mit ihrer Schneiderei.",
      ar: "ودودٌ جدّاً، متعاون، عمل راقٍ وسريع. أنصح به حقّاً. أتمنّى لهم كلّ النجاح في الأتولييه.",
    },
  },
  {
    name: "Corinna N.",
    stars: 5,
    context: "vor 5 Monaten",
    quote: {
      de: "Schnell, sehr gute Arbeit und immer freundlich. Empfehle ich sehr gerne weiter!",
      ar: "سريع، عمل راقٍ، ودائماً ودود. أنصح به بكلّ سرور!",
    },
  },
  {
    name: "Tayfun Ankara",
    stars: 5,
    context: "vor 4 Monaten",
    quote: {
      de: "Empfehlenswert! Ging ganz schnell und dazu super Arbeit geleistet!",
      ar: "جديرٌ بالتوصية! كان سريعاً جدّاً، ومع ذلك قدّم عملاً راقياً!",
    },
  },
];
