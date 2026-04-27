import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Wie die Keba Schneiderei in Marl mit Ihren Daten umgeht: Hosting, Kontaktformular, Cookies, Ihre Rechte nach DSGVO.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/datenschutz",
    languages: { "de-DE": "/datenschutz", ar: "/ar/datenschutz" },
  },
};

export default function DatenschutzDE() {
  return (
    <LegalPage locale="de" title="Datenschutzerklärung" lastUpdated="April 2026">
      <p className="lede">
        Der Schutz Ihrer Daten ist uns wichtig. Wir verarbeiten so wenig personenbezogene Daten
        wie möglich — und nur, wenn es einen klaren Grund dafür gibt.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
        Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        <strong>{business.name}</strong>
        <br />
        {business.owner}
        <br />
        {business.address.street}, {business.address.zip} {business.address.city}
        <br />
        Telefon: <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${business.email}`}>{business.email}</a>
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird auf einem virtuellen Server (vServer) der{" "}
        <strong>IONOS SE</strong>, Elgendorfer Straße 57, 56410 Montabaur, gehostet. Die Server
        befinden sich in Deutschland.
      </p>
      <p>
        Beim Aufruf der Website werden vom Server automatisch sogenannte Server-Logfiles erfasst,
        die Ihr Browser übermittelt. Dies sind:
      </p>
      <ul>
        <li>IP-Adresse (gekürzt / anonymisiert, sofern technisch möglich)</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite / URL</li>
        <li>Referrer-URL (zuvor besuchte Seite)</li>
        <li>Browser-Typ und -Version, Betriebssystem</li>
      </ul>
      <p>
        Diese Daten sind technisch erforderlich, um die Website auszuliefern, ihre Stabilität und
        Sicherheit zu gewährleisten und Missbrauch zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse). Die Logfiles werden nach maximal 14 Tagen gelöscht,
        sofern keine sicherheitsrelevanten Vorfälle eine längere Speicherung erfordern.
      </p>

      <h2>3. Cookies und lokaler Speicher</h2>
      <p>
        Diese Website setzt <strong>keine</strong> Tracking-Cookies und verwendet{" "}
        <strong>keine</strong> Analyse- oder Marketing-Cookies. Es findet keine geräteübergreifende
        Wiedererkennung und kein Profiling statt.
      </p>
      <p>
        Wir speichern lediglich einen technisch notwendigen Eintrag im{" "}
        <em>Local Storage</em> Ihres Browsers, um zu merken, dass Sie unseren Cookie-Hinweis
        bereits gesehen und geschlossen haben. Dieser Eintrag enthält keine personenbezogenen
        Daten und wird nicht an unseren Server übertragen. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG
        (unbedingt erforderlich für den Dienst).
      </p>

      <h2>4. Kontaktformular</h2>
      <p>
        Auf unserer Seite finden Sie ein Kontaktformular. Wenn Sie es ausfüllen und auf „Anfrage
        senden“ klicken, öffnet sich Ihr Standard-E-Mail-Programm mit den eingegebenen Daten in der
        E-Mail. Die Übertragung erfolgt also über Ihren eigenen E-Mail-Anbieter — die Daten
        durchlaufen <strong>nicht unseren Server</strong>.
      </p>
      <p>
        Erst wenn Sie die E-Mail aus Ihrem Programm absenden, erreicht uns Ihre Anfrage über die
        oben genannte E-Mail-Adresse. Die übermittelten Daten (Name, E-Mail, Telefon, Anliegen,
        Nachricht) verarbeiten wir ausschließlich zur Bearbeitung Ihrer Anfrage.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertragsverhältnisses) bzw.
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Wir
        speichern Ihre Anfrage so lange, wie es zur Bearbeitung erforderlich ist; bei
        anschließendem Auftragsverhältnis gelten die gesetzlichen Aufbewahrungsfristen (insb. § 257
        HGB, § 147 AO).
      </p>

      <h2>5. Anruf, E-Mail, WhatsApp</h2>
      <p>
        Wenn Sie uns telefonisch, per E-Mail oder per WhatsApp kontaktieren, verarbeiten wir die
        von Ihnen übermittelten Daten zur Bearbeitung Ihres Anliegens. Bei WhatsApp gelten
        zusätzlich die Datenschutzbestimmungen der Meta Platforms Ireland Ltd.
      </p>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Eine Übermittlung an Dritte findet
        nicht statt.
      </p>

      <h2>6. Schriftarten (Fonts)</h2>
      <p>
        Diese Website verwendet die Schriftarten <em>Fraunces</em>, <em>Instrument Serif</em>,{" "}
        <em>Inter</em>, <em>Noto Naskh Arabic</em> und <em>Amiri</em>. Diese werden lokal vom
        eigenen Server ausgeliefert (Self-Hosting durch das Next.js Font-System). Es findet{" "}
        <strong>keine Verbindung zu Google-Servern</strong> beim Aufruf der Seite statt.
      </p>

      <h2>7. Externe Links</h2>
      <p>
        Unsere Seite enthält Links zu externen Diensten — insbesondere zu Instagram, Google Maps,
        WhatsApp und einer Telefonnummer. Erst <em>wenn Sie diese Links anklicken</em>, wird eine
        Verbindung zu den jeweiligen Anbietern aufgebaut. Auf das Datenverarbeitungsverhalten
        dieser Anbieter haben wir keinen Einfluss; es gelten dort die jeweiligen
        Datenschutzbestimmungen:
      </p>
      <ul>
        <li>Instagram (Meta Platforms Ireland Ltd.) — <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer">privacycenter.instagram.com/policy</a></li>
        <li>Google Maps (Google Ireland Ltd.) — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
        <li>WhatsApp (Meta Platforms Ireland Ltd.) — <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer">whatsapp.com/legal/privacy-policy-eea</a></li>
      </ul>

      <h2>8. Strukturierte Daten / SEO</h2>
      <p>
        Auf der Startseite ist eine Schema.org-Auszeichnung („JSON-LD“) eingebettet, die
        Suchmaschinen helfen soll, unser Geschäft zu verstehen (Adresse, Öffnungszeiten,
        Leistungen). Diese Daten sind öffentliche Geschäftsinformationen und enthalten keine
        personenbezogenen Daten unserer Besucher.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung („Recht auf Vergessenwerden“, Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Wenden Sie sich dazu formlos per E-Mail oder Post an uns. Daneben steht Ihnen ein
        Beschwerderecht bei der zuständigen Aufsichtsbehörde zu (Art. 77 DSGVO):
      </p>
      <div className="block">
        Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
        <br />
        Kavalleriestraße 2–4, 40213 Düsseldorf
        <br />
        <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer">
          www.ldi.nrw.de
        </a>
      </div>

      <h2>10. SSL-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Sie erkennen eine
        verschlüsselte Verbindung an dem Schloss-Symbol Ihres Browsers und am „https://“ in der
        Adresszeile.
      </p>

      <h2>11. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, falls sich die Rechtslage,
        unsere Dienste oder die Datenverarbeitung ändern. Es gilt jeweils die aktuelle, auf dieser
        Seite veröffentlichte Fassung.
      </p>
    </LegalPage>
  );
}
