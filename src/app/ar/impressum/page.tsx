import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "البيانات القانونية",
  description: "البيانات القانونية لخياطة كيبا في مدينة مارل (ألمانيا).",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/ar/impressum",
    languages: { "de-DE": "/impressum", ar: "/ar/impressum" },
  },
};

export default function ImpressumAR() {
  return (
    <LegalPage locale="ar" title="البيانات القانونية">
      <p className="lede">
        البيانات الإلزامية وفقاً للمادة ٥ من قانون الخدمات الرقمية (DDG) والمادة ١٨ فقرة ٢ من
        اتفاقية الإعلام الإقليمية (MStV).
      </p>

      <h2>مزوّد الخدمة</h2>
      <p>
        <strong>{business.name}</strong>
        <br />
        المالك: {business.owner}
        <br />
        {business.address.street}
        <br />
        {business.address.zip} {business.address.city}
        <br />
        ألمانيا
      </p>

      <h2>التواصل</h2>
      <p>
        الهاتف: <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
        <br />
        البريد الإلكتروني: <a href={`mailto:${business.email}`}>{business.email}</a>
      </p>

      <h2>الشكل القانوني</h2>
      <p>مؤسسة فردية (Einzelunternehmen)</p>

      <h2>الرقم الضريبي</h2>
      <p>359/5195/2369</p>

      <h2>الجهة الرقابية / غرفة الحرف</h2>
      <p>
        <strong>غرفة الحرف في مونستر (Handwerkskammer Münster)</strong>
        <br />
        Bismarckallee 1, 48151 Münster
        <br />
        <a href="https://www.hwk-muenster.de" target="_blank" rel="noopener noreferrer">
          www.hwk-muenster.de
        </a>
      </p>
      <p>
        رقم القيد في سجلّ الحرف: <strong>41977159</strong>
      </p>

      <h2>المهنة والقواعد المهنية</h2>
      <p>
        المسمّى المهني: <strong>خيّاط (Schneider)</strong>
        <br />
        مُنح في: الجمهورية العربية السورية
      </p>
      <p>
        تسري القواعد المهنية الواردة في قانون الحِرف الألماني (Handwerksordnung – HwO)، ويمكن
        الاطّلاع عليها لدى غرفة الحرف المختصّة في مونستر.
      </p>

      <h2>المسؤول عن المحتوى وفقاً للمادة ١٨ فقرة ٢ MStV</h2>
      <p>
        {business.owner}
        <br />
        {business.address.street}, {business.address.zip} {business.address.city}
      </p>

      <h2>تسوية النزاعات</h2>
      <p>
        توفّر المفوّضية الأوروبية منصّة لتسوية النزاعات إلكترونياً (OS):{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
        . عنوان بريدنا الإلكتروني مذكور أعلاه.
      </p>
      <p>لسنا ملزمين ولا مستعدّين للمشاركة في إجراءات التحكيم أمام جهات استهلاكية.</p>

      <h2>المسؤولية عن المحتوى</h2>
      <p>
        كمُزوّد خدمة، نحن مسؤولون عن المحتوى الخاص بنا على هذه الصفحات وفقاً للقوانين العامّة
        (المادة ٧ فقرة ١ من DDG). لكنّنا لسنا ملزمين بمراقبة المعلومات الخارجية المنقولة أو
        المخزّنة، ولا بالبحث عن مؤشّرات على نشاطٍ مخالفٍ للقانون (المادتان ٨–١٠ من DDG).
      </p>
      <p>
        التزامات إزالة المعلومات أو حجبها بموجب القوانين العامّة تبقى قائمة. إلّا أنّ المسؤولية
        لا تنشأ إلّا من لحظة العلم بانتهاكٍ ملموس. وعند علمنا بأيّ انتهاكٍ من هذا النوع، نُزيل
        المحتوى المعنيّ فوراً.
      </p>

      <h2>المسؤولية عن الروابط</h2>
      <p>
        قد تحتوي صفحاتنا على روابط لمواقع خارجية لا نملك سيطرة على محتواها. لذلك لا نتحمّل أيّ
        ضمان عن هذه المحتويات الخارجية. المسؤولية تقع على مزوّدي تلك المواقع.
      </p>

      <h2>حقوق المؤلف</h2>
      <p>
        المحتوى والأعمال المُنشأة من قِبَلنا على هذه الصفحات تخضع لقانون حقوق المؤلف الألماني.
        أيّ نسخٍ أو تعديلٍ أو نشرٍ أو استخدامٍ خارج حدود حقوق المؤلف يستلزم موافقةً خطّية من
        المؤلف المعنيّ.
      </p>
    </LegalPage>
  );
}
