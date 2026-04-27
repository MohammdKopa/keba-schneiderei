import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der Keba Schneiderei in Marl.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/impressum", languages: { "de-DE": "/impressum", ar: "/ar/impressum" } },
};

export default function ImpressumDE() {
  return (
    <LegalPage locale="de" title="Impressum">
      <p className="lede">
        Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV.
      </p>

      <h2>Anbieter</h2>
      <p>
        <strong>{business.name}</strong>
        <br />
        Inhaber: {business.owner}
        <br />
        {business.address.street}
        <br />
        {business.address.zip} {business.address.city}
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${business.email}`}>{business.email}</a>
      </p>

      <h2>Unternehmensform</h2>
      <p>Einzelunternehmen</p>

      <h2>Steuernummer</h2>
      <p>359/5195/2369</p>

      <h2>Aufsichtsbehörde / Kammer</h2>
      <p>
        <strong>Handwerkskammer Münster</strong>
        <br />
        Bismarckallee 1, 48151 Münster
        <br />
        <a href="https://www.hwk-muenster.de" target="_blank" rel="noopener noreferrer">
          www.hwk-muenster.de
        </a>
      </p>
      <p>Eintragungsnummer in der Handwerksrolle: <strong>41977159</strong></p>

      <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p>
        Berufsbezeichnung: <strong>Schneider</strong>
        <br />
        Verliehen in: Syrische Arabische Republik
      </p>
      <p>
        Es gelten die berufsrechtlichen Regelungen der Handwerksordnung (HwO) der Bundesrepublik
        Deutschland. Diese können bei der zuständigen Handwerkskammer Münster eingesehen werden.
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {business.owner}
        <br />
        {business.address.street}, {business.address.zip} {business.address.city}
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
        von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
        des jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalPage>
  );
}
