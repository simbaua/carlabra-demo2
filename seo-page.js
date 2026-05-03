const LANGUAGE_KEY = "carlabra_language";
const DEFAULT_LANGUAGE = "fi";
const SUPPORTED_LANGUAGES = ["en", "fi"];

const TRANSLATIONS = {
  fi: {
    meta: {
      title: "Auton maalauksen hinta Espoossa | CarLabra",
      description: "Laske auton maalauksen hinta nopeasti verkossa. Lataa kuvat ja saat arvion minuuteissa.",
    },
    language: { aria: "Kieli" },
    brand: { subtitle: "Maalaus & kori" },
    nav: {
      aria: "Päänavigaatio",
      estimate: "Arvio",
      gallery: "Galleria",
      shop: "Kauppa",
      about: "Meistä",
      contact: "Yhteys",
    },
    page: {
      eyebrow: "Automaalaus Espoossa",
      title: "Auton maalauksen hinta Espoossa",
      intro:
        "Auton maalauksen hinta riippuu vaurion laajuudesta, maalattavasta osasta ja värisävystä. CarLabra tarjoaa nopean ja selkeän arvion suoraan verkossa.",
      cta: "Laske tarkka hinta-arvio",
      priceFactorsEyebrow: "Hinnan muodostuminen",
      priceFactorsTitle: "Mistä auton maalauksen hinta koostuu?",
      factors: {
        partSize: "Maalattavan osan koko (esim. puskuri, ovi, kylki)",
        damageType: "Vaurion tyyppi (naarmu, kolhu, maalivaurio)",
        colorMatch: "Värin sävy ja mahdollinen sävyn sovitus",
        prepWork: "Työn vaativuus ja valmistelutyöt",
      },
      estimatedPricesEyebrow: "Hinta-arviot",
      estimatedPricesTitle: "Arvioidut hinnat",
      prices: {
        small: "Pienet maalivauriot",
        medium: "Keskisuuret vauriot",
        large: "Laajemmat korjaukset",
      },
    },
    footer: {
      copy:
        "Espoossa toimiva automaalaamo ja korikorjaamo. Laadukkaat korjaukset, selkeät arviot ja viimeistelty lopputulos.",
      services: {
        title: "Palvelut",
        painting: "Automaalaus",
        body: "Korikorjaus",
        color: "Värinsävytys",
        priceEstimate: "Auton maalauksen hinta",
      },
      hours: { title: "Aukioloajat", copy: "Ma-pe: 8:00-16:00" },
      contacts: { title: "Yhteystiedot", website: "Verkkosivusto" },
      bottom: "Kaikki oikeudet pidätetään.",
    },
  },
  en: {
    meta: {
      title: "Car paint price estimate in Espoo | CarLabra",
      description: "Get a quick car paint price estimate online. Upload photos and receive an estimate in minutes.",
    },
    language: { aria: "Language" },
    brand: { subtitle: "Paint & Body" },
    nav: {
      aria: "Primary navigation",
      estimate: "Estimate",
      gallery: "Gallery",
      shop: "Shop",
      about: "ABOUT",
      contact: "Contact",
    },
    page: {
      eyebrow: "Car painting in Espoo",
      title: "Car paint price estimate in Espoo",
      intro:
        "The cost of car painting depends on damage size, affected parts and color matching. Use our tool to get a quick estimate online.",
      cta: "Get estimate",
      priceFactorsEyebrow: "Price factors",
      priceFactorsTitle: "What affects the cost of car painting?",
      factors: {
        partSize: "Size of the painted part, such as bumper, door or side panel",
        damageType: "Type of damage, such as scratch, dent or paint damage",
        colorMatch: "Paint shade and required color matching",
        prepWork: "Repair complexity and preparation work",
      },
      estimatedPricesEyebrow: "Price ranges",
      estimatedPricesTitle: "Estimated prices",
      prices: {
        small: "Small paint damage",
        medium: "Medium damage",
        large: "Larger repairs",
      },
    },
    footer: {
      copy:
        "Professional auto body repair and paint workshop in Espoo. Quality repairs, accurate estimates, and premium finish.",
      services: {
        title: "Services",
        painting: "Car painting",
        body: "Body repair",
        color: "Color matching",
        priceEstimate: "Paint price estimate",
      },
      hours: { title: "Working hours", copy: "Mon-Fri: 8:00-16:00" },
      contacts: { title: "Contacts", website: "Website" },
      bottom: "All rights reserved.",
    },
  },
};

const languageButtons = document.querySelectorAll("[data-lang-option]");
const year = document.querySelector("#year");
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
}

function t(key) {
  return key.split(".").reduce((value, part) => value?.[part], TRANSLATIONS[currentLanguage]) || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.langOption === currentLanguage;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  currentLanguage = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  applyTranslations();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langOption));
});

year.textContent = new Date().getFullYear();
applyTranslations();
