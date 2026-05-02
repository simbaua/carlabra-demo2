const STORAGE_KEY = "carlabra_estimate_requests";
const TELEGRAM_ENDPOINT = "/.netlify/functions/send-estimate";
const LANGUAGE_KEY = "carlabra_language";
const DEFAULT_LANGUAGE = "fi";
const SUPPORTED_LANGUAGES = ["en", "fi"];
const TRANSLATIONS = {
  en: {
    meta: {
      title: "Car painting and auto body repair in Espoo | CarLabra",
      description: "CarLabra provides online car paint cost estimates and auto body repair in Espoo and Helsinki.",
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
    hero: {
      eyebrow: "Espoo auto body workshop",
      title: "Car painting and auto body repair in Espoo – online price estimate",
      copy:
        "Get an accurate repair estimate in under 60 seconds. Professional auto body repair, paint restoration, and precision color matching in Espoo.",
      cta: "Get your estimate",
      trust: {
        fast: "Fast estimate",
        finish: "Premium finish",
        color: "Precision color matching",
      },
      panel: { paint: "Paint", body: "Body", finish: "Finish" },
    },
    estimate: {
      eyebrow: "Photo-based estimate",
      title: "Upload photos and get a repair estimate range",
      copy:
        "Add up to three photos, select the affected areas, and receive a structured estimate before continuing with the workshop team.",
    },
    form: {
      photos: {
        legend: "Upload photos for a more accurate estimate",
        choose: "Choose up to 3 photos",
      },
      parts: { legend: "Damaged parts" },
      damage: { legend: "Damage level" },
      name: "Name",
      phone: "Phone",
      email: "Email",
      car: "Car model",
      optional: "Optional",
      calculate: "Calculate estimate",
    },
    parts: {
      bumper: "Bumper",
      frontFender: "Front fender",
      rearQuarterPanel: "Rear quarter panel",
      door: "Door",
      hood: "Hood",
      sideSkirtThreshold: "Side skirt / threshold",
      smallParts: "Small parts",
      roof: "Roof",
    },
    damage: {
      light: {
        label: "Light damage",
        description: "Small scratches or minor paint defects",
      },
      medium: {
        label: "Medium damage",
        description: "Visible scratches, dents, or paint damage",
      },
      heavy: {
        label: "Heavy damage",
        description: "Large damage, deep dents, or complex repair",
      },
    },
    result: {
      eyebrow: "Estimate result",
      emptyTitle: "Complete the form to calculate",
      defaultSummary:
        "Upload photos, select damaged parts, and choose a damage level to see your estimate.",
      note:
        "This is an approximate estimate based on your selected details and uploaded photos. Final price is confirmed after inspection.",
      send: "Send request",
      whatsapp: "Continue in WhatsApp",
      gallery: "View gallery",
      shop: "Visit shop",
      selectedParts: "Selected parts",
      damageLevel: "Damage level",
      estimatedRange: "Estimated price range",
      pricePrefix: "Estimated price",
      selectParts: "Select damaged parts",
    },
    messages: {
      required:
        "Please upload photos, select damaged parts, choose damage level, and enter your name and phone.",
      photoLimit: "Please upload no more than 3 photos.",
      noSaved: "No saved requests yet.",
      notProvided: "Not provided",
      savedLocal: "Request saved locally. Telegram delivery is available on the deployed site.",
      savedTelegram: "Request saved locally and sent to Telegram. You can also continue in WhatsApp.",
      telegramFailedPrefix: "Request saved locally, but Telegram notification was not sent: ",
    },
    whatsapp: {
      title: "New CarLabra estimate request",
      estimate: "Estimate",
      parts: "Parts",
      damage: "Damage level",
      price: "Estimated price",
      customer: "Customer",
      name: "Name",
      phone: "Phone",
      car: "Car",
      source: "Sent from website.",
    },
    services: {
      eyebrow: "Services",
      title: "Complete body and paint care for drivers in Helsinki and Espoo",
      copy:
        "From the first estimate to the final handover, every stage follows a precise CarLabra process. Clear pricing, disciplined timelines, and finish quality built for demanding automotive standards.",
      paint: {
        title: "Paint refinishing",
        copy:
          "Professional paintwork with high-grade materials and careful shade matching for a smooth, consistent factory-level finish.",
      },
      body: {
        title: "Body repair",
        copy:
          "Collision repair, dent removal, and body restoration performed with measured precision to preserve the vehicle's original geometry.",
      },
      supply: {
        title: "Automotive paint supply",
        copy:
          "Accurate automotive paint matching and supply for repairs, refinishing, and specialist color requirements.",
      },
    },
    about: {
      eyebrow: "ABOUT CARLABRA",
      title: "Car paint cost estimate and auto body repair in Espoo and Helsinki",
      copy1:
        "CarLabra is an auto paint and body repair shop based in Espoo. We provide fast and clear price estimates for car painting, body repairs and paint surface damage.",
      copy2:
        "Customers can upload photos of the damage and receive an initial repair estimate online before contacting the workshop. The final price is always confirmed after inspection.",
      copy3:
        "Our services include car paint cost estimates, auto body repair, damage repair, color matching and finishing. We serve customers in the Espoo and Helsinki area.",
    },
    admin: {
      eyebrow: "Request dashboard",
      title: "Saved estimate requests",
      copy: "Requests are stored in this browser with localStorage.",
      refresh: "Refresh requests",
      headers: {
        name: "Name",
        phone: "Phone",
        car: "Car",
        parts: "Parts",
        damage: "Damage",
        price: "Price",
        date: "Date",
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
        sales: "Paint sales",
      },
      hours: { title: "Working hours", copy: "Mon-Fri: 8:00-16:00" },
      contacts: { title: "Contacts", website: "Website" },
      bottom: "All rights reserved.",
    },
  },
  fi: {
    meta: {
      title: "Automaalaus ja korikorjaus Espoossa | CarLabra",
      description: "CarLabra tarjoaa auton maalauksen hinta-arvion ja korikorjauksen Espoon ja Helsingin alueella.",
    },
    language: { aria: "Kieli" },
    brand: { subtitle: "Maalaus & kori" },
    nav: {
      aria: "Päänavigaatio",
      estimate: "Arvio",
      gallery: "Galleria",
      shop: "Kauppa",
      about: "MEISTÄ",
      contact: "Yhteys",
    },
    hero: {
      eyebrow: "Automaalaamo ja korikorjaamo Espoossa",
      title: "Automaalaus ja korikorjaus Espoossa – hinta-arvio verkossa",
      copy:
        "Pyydä korjausarvio alle minuutissa. Teemme korikorjaukset, maalipinnan korjaukset ja tarkan värinsävytyksen Espoossa.",
      cta: "Pyydä arvio",
      trust: {
        fast: "Nopea arvio",
        finish: "Laadukas viimeistely",
        color: "Tarkka värinsävytys",
      },
      panel: { paint: "Maalaus", body: "Kori", finish: "Viimeistely" },
    },
    estimate: {
      eyebrow: "Kuvapohjainen arvio",
      title: "Lataa kuvat ja saat hinta-arvion",
      copy:
        "Lisää enintään kolme kuvaa, valitse vaurioituneet kohdat ja saat selkeän arvion ennen yhteydenottoa korjaamolle.",
    },
    form: {
      photos: {
        legend: "Lataa kuvat tarkempaa arviota varten",
        choose: "Valitse enintään 3 kuvaa",
      },
      parts: { legend: "Vaurioituneet osat" },
      damage: { legend: "Vaurion aste" },
      name: "Nimi",
      phone: "Puhelin",
      email: "Sähköposti",
      car: "Automalli",
      optional: "Valinnainen",
      calculate: "Laske arvio",
    },
    parts: {
      bumper: "Puskuri",
      frontFender: "Etulokasuoja",
      rearQuarterPanel: "Takakylki",
      door: "Ovi",
      hood: "Konepelti",
      sideSkirtThreshold: "Helma / kynnys",
      smallParts: "Pienosat",
      roof: "Katto",
    },
    damage: {
      light: {
        label: "Kevyt vaurio",
        description: "Pieniä naarmuja tai lieviä maalipinnan virheitä",
      },
      medium: {
        label: "Keskitasoinen vaurio",
        description: "Selviä naarmuja, lommoja tai maalivaurioita",
      },
      heavy: {
        label: "Laaja vaurio",
        description: "Suuria vaurioita, syviä lommoja tai vaativa korjaus",
      },
    },
    result: {
      eyebrow: "Arvion tulos",
      emptyTitle: "Täytä tiedot arvion laskemiseksi",
      defaultSummary: "Lataa kuvat, valitse vaurioituneet osat ja vaurion aste nähdäksesi arvion.",
      note:
        "Tämä on suuntaa-antava arvio valittujen tietojen ja ladattujen kuvien perusteella. Lopullinen hinta vahvistetaan tarkastuksen jälkeen.",
      send: "Lähetä pyyntö",
      whatsapp: "Jatka WhatsAppissa",
      gallery: "Katso galleria",
      shop: "Siirry kauppaan",
      selectedParts: "Valitut osat",
      damageLevel: "Vaurion aste",
      estimatedRange: "Arvioitu hintahaarukka",
      pricePrefix: "Arvioitu hinta",
      selectParts: "Valitse vaurioituneet osat",
    },
    messages: {
      required:
        "Lataa kuvat, valitse vaurioituneet osat ja vaurion aste sekä täytä nimi ja puhelinnumero.",
      photoLimit: "Lataa enintään 3 kuvaa.",
      noSaved: "Tallennettuja pyyntöjä ei vielä ole.",
      notProvided: "Ei annettu",
      savedLocal: "Pyyntö tallennettu tähän selaimeen. Telegram-lähetys toimii julkaistulla sivustolla.",
      savedTelegram: "Pyyntö tallennettu ja lähetetty Telegramiin. Voit jatkaa myös WhatsAppissa.",
      telegramFailedPrefix: "Pyyntö tallennettu tähän selaimeen, mutta Telegram-ilmoitusta ei lähetetty: ",
    },
    whatsapp: {
      title: "Uusi CarLabra-arviopyyntö",
      estimate: "Arvio",
      parts: "Osat",
      damage: "Vaurion aste",
      price: "Arvioitu hinta",
      customer: "Asiakas",
      name: "Nimi",
      phone: "Puhelin",
      car: "Auto",
      source: "Lähetetty verkkosivulta.",
    },
    services: {
      eyebrow: "Palvelut",
      title: "Korikorjaukset ja automaalaukset Helsingin ja Espoon alueella",
      copy:
        "Ensimmäisestä arviosta luovutukseen asti työ etenee selkeän CarLabra-prosessin mukaan. Saat läpinäkyvän hinnoittelun, sovitut aikataulut ja viimeistelyn, joka kestää tarkastelun.",
      paint: {
        title: "Automaalaus",
        copy:
          "Laadukas maalaustyö, huolellinen sävyn sovitus ja tasainen, tehdastasoinen viimeistely.",
      },
      body: {
        title: "Korikorjaus",
        copy:
          "Kolarikorjaukset, lommojen korjaukset ja korin oikaisut tehdään mitatusti auton alkuperäistä muotoa kunnioittaen.",
      },
      supply: {
        title: "Automalien myynti",
        copy:
          "Tarkka automaalien sävytys ja toimitus korjauksiin, maalauksiin ja erikoisväreihin.",
      },
    },
    about: {
      eyebrow: "TIETOA CARLABRASTA",
      title: "Auton maalauksen hinta ja korjausarvio Espoossa ja Helsingissä",
      copy1:
        "CarLabra on Espoossa toimiva automaalaamo ja korikorjaamo. Tarjoamme nopean ja selkeän hinta-arvion auton maalauksesta, korikorjauksesta ja maalipinnan vaurioista.",
      copy2:
        "Voit lähettää kuvat vauriosta ja saada alustavan korjausarvion verkossa ennen yhteydenottoa korjaamolle. Lopullinen hinta vahvistetaan aina tarkastuksen jälkeen.",
      copy3:
        "Palveluihimme kuuluvat auton maalauksen hinta-arvio, korikorjaus, vauriokorjaus, värinsävytys ja viimeistely. Palvelemme asiakkaita Espoon ja Helsingin alueella.",
    },
    admin: {
      eyebrow: "Pyyntöjen hallinta",
      title: "Tallennetut arviopyynnöt",
      copy: "Pyynnöt tallennetaan tämän selaimen localStorage-muistiin.",
      refresh: "Päivitä pyynnöt",
      headers: {
        name: "Nimi",
        phone: "Puhelin",
        car: "Auto",
        parts: "Osat",
        damage: "Vaurio",
        price: "Hinta",
        date: "Päivä",
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
        sales: "Maalien myynti",
      },
      hours: { title: "Aukioloajat", copy: "Ma-pe: 8:00-16:00" },
      contacts: { title: "Yhteystiedot", website: "Verkkosivusto" },
      bottom: "Kaikki oikeudet pidätetään.",
    },
  },
};
const PARTS = [
  { id: "bumper", labelKey: "parts.bumper", min: 490, max: 570 },
  { id: "front-fender", labelKey: "parts.frontFender", min: 260, max: 350 },
  { id: "rear-quarter-panel", labelKey: "parts.rearQuarterPanel", min: 350, max: 440 },
  { id: "door", labelKey: "parts.door", min: 390, max: 490 },
  { id: "hood", labelKey: "parts.hood", min: 580, max: 700 },
  { id: "side-skirt-threshold", labelKey: "parts.sideSkirtThreshold", min: 310, max: 400 },
  { id: "small-parts", labelKey: "parts.smallParts", min: 150, max: 200 },
  { id: "roof", labelKey: "parts.roof", min: 700, max: 900 },
];
const DAMAGE_LEVELS = [
  {
    id: "light",
    labelKey: "damage.light.label",
    descriptionKey: "damage.light.description",
    coefficient: 1,
  },
  {
    id: "medium",
    labelKey: "damage.medium.label",
    descriptionKey: "damage.medium.description",
    coefficient: 1.25,
  },
  {
    id: "heavy",
    labelKey: "damage.heavy.label",
    descriptionKey: "damage.heavy.description",
    coefficient: 1.5,
  },
];
const WHATSAPP_URL = "https://wa.me/358449019789";
const partsGrid = document.querySelector("#partsGrid");
const damageOptions = document.querySelector("#damageOptions");
const photoUpload = document.querySelector("#photoUpload");
const photoPreview = document.querySelector("#photoPreview");
const photoError = document.querySelector("#photoError");
const partsError = document.querySelector("#partsError");
const priceOutput = document.querySelector("#priceOutput");
const summaryOutput = document.querySelector("#summaryOutput");
const estimateForm = document.querySelector("#estimateForm");
const calculateButton = document.querySelector("#calculateButton");
const whatsappButton = document.querySelector("#whatsappButton");
const resultActions = document.querySelector("#resultActions");
const adminRows = document.querySelector("#adminRows");
const refreshAdmin = document.querySelector("#refreshAdmin");
const adminSection = document.querySelector("#admin");
const year = document.querySelector("#year");
const languageButtons = document.querySelectorAll("[data-lang-option]");

let currentEstimate = null;
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
}

function t(key, language = currentLanguage) {
  return key.split(".").reduce((value, part) => value?.[part], TRANSLATIONS[language]) || key;
}

function getPartLabel(part, language = currentLanguage) {
  return t(part.labelKey, language);
}

function getDamageLabel(damage, language = currentLanguage) {
  return t(damage.labelKey, language);
}

function getDamageDescription(damage, language = currentLanguage) {
  return t(damage.descriptionKey, language);
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
}

function updateLanguageButtons() {
  languageButtons.forEach((button) => {
    const isSelected = button.dataset.langOption === currentLanguage;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function renderDefaultEstimateState() {
  priceOutput.textContent = t("result.emptyTitle");
  summaryOutput.textContent = t("result.defaultSummary");
}

function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  currentLanguage = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  applyStaticTranslations();
  updateLanguageButtons();

  if (currentEstimate) {
    renderEstimateResult(currentEstimate);
  } else {
    renderDefaultEstimateState();
  }

  renderAdmin();
}

function formatPrice(min, max) {
  return `${Math.round(min)}€ – ${Math.round(max)}€`;
}

function calculatePriceRange(parts, damage) {
  if (!parts.length || !damage) {
    return null;
  }

  const baseMin = parts.reduce((sum, part) => sum + part.min, 0);
  const baseMax = parts.reduce((sum, part) => sum + part.max, 0);
  const min = Math.round(baseMin * damage.coefficient);
  const max = Math.round(baseMax * damage.coefficient);

  return {
    min,
    max,
    price: formatPrice(min, max),
  };
}

function createWhatsAppLink(request) {
  const message = `${t("whatsapp.title")}

${t("whatsapp.estimate")}:
${t("whatsapp.parts")}: ${request.parts.join(", ")}
${t("whatsapp.damage")}: ${request.damage}
${t("whatsapp.price")}: ${request.price}

${t("whatsapp.customer")}:
${t("whatsapp.name")}: ${request.name}
${t("whatsapp.phone")}: ${request.phone}
${t("whatsapp.car")}: ${request.car}

${t("whatsapp.source")}`;

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

function resetEstimateResult() {
  currentEstimate = null;
  renderDefaultEstimateState();
  whatsappButton.setAttribute("href", "#");
  resultActions.hidden = true;
}

function getSavedRequests() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRequest(request) {
  const requests = getSavedRequests();
  requests.unshift(request);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function selectedParts() {
  return [...document.querySelectorAll('input[name="parts"]:checked')]
    .map((input) => PARTS.find((part) => part.id === input.value))
    .filter(Boolean);
}

function selectedDamage() {
  const input = document.querySelector('input[name="damage"]:checked');
  return input
    ? DAMAGE_LEVELS.find((damage) => damage.id === input.value) || DAMAGE_LEVELS[0]
    : null;
}

function getCustomerData() {
  return {
    name: document.querySelector("#customerName").value.trim(),
    phone: document.querySelector("#customerPhone").value.trim(),
    email: document.querySelector("#customerEmail").value.trim(),
    car: document.querySelector("#carModel").value.trim(),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderOptions() {
  if (partsGrid.children.length && damageOptions.children.length) {
    return;
  }

  partsGrid.innerHTML = PARTS.map(
    (part) => `
      <label class="part-card">
        <input type="checkbox" name="parts" value="${part.id}" />
        <span>
          <span class="part-title" data-i18n="${part.labelKey}">${getPartLabel(part)}</span>
        </span>
      </label>
    `
  ).join("");

  damageOptions.innerHTML = DAMAGE_LEVELS.map(
    (damage, index) => `
      <label class="damage-card">
        <input type="radio" name="damage" value="${damage.id}" ${index === 0 ? "checked" : ""} />
        <span>
          <span class="damage-title" data-i18n="${damage.labelKey}">${getDamageLabel(damage)}</span>
          <span class="damage-copy" data-i18n="${damage.descriptionKey}">${getDamageDescription(damage)}</span>
        </span>
      </label>
    `
  ).join("");
}

function selectedPhotoNames() {
  return [...photoUpload.files].map((file) => file.name);
}

function selectedPhotoFiles() {
  return [...photoUpload.files].slice(0, 3);
}

function validatePhotos() {
  const files = [...photoUpload.files];

  if (files.length > 3) {
    photoUpload.value = "";
    photoPreview.innerHTML = "";
    photoError.textContent = t("messages.photoLimit");
    resetEstimateResult();
    return false;
  }

  photoError.textContent = "";
  return true;
}

function showRequiredFieldsError() {
  currentEstimate = null;
  priceOutput.textContent = t("result.emptyTitle");
  summaryOutput.textContent = t("messages.required");
  photoError.textContent = t("messages.required");
  resultActions.hidden = true;
}

function validateRequiredEstimateFields() {
  const parts = selectedParts();
  const damage = selectedDamage();
  const customer = getCustomerData();

  if (!parts.length || !damage || !customer.name || !customer.phone) {
    showRequiredFieldsError();
    partsError.textContent = parts.length ? "" : t("messages.required");
    return null;
  }

  partsError.textContent = "";
  photoError.textContent = "";
  return { parts, damage };
}

function renderPhotoPreview() {
  if (!validatePhotos()) {
    return;
  }

  const files = [...photoUpload.files];

  if (!files.length) {
    photoPreview.innerHTML = "";
    return;
  }

  photoPreview.innerHTML = files
    .map((file) => `<span>${escapeHtml(file.name)}</span>`)
    .join("");
}

function renderEstimateResult(estimate) {
  priceOutput.textContent = `${t("result.pricePrefix")}: ${estimate.price}`;
  summaryOutput.innerHTML = `
    <dl>
      <div>
        <dt>${escapeHtml(t("result.selectedParts"))}</dt>
        <dd>${escapeHtml(estimate.parts.map((part) => getPartLabel(part)).join(", "))}</dd>
      </div>
      <div>
        <dt>${escapeHtml(t("result.damageLevel"))}</dt>
        <dd>${escapeHtml(getDamageLabel(estimate.damage))}</dd>
      </div>
      <div>
        <dt>${escapeHtml(t("result.estimatedRange"))}</dt>
        <dd>${escapeHtml(estimate.price)}</dd>
      </div>
    </dl>
  `;
  const request = createRequest();
  if (request) {
    whatsappButton.setAttribute("href", createWhatsAppLink(request));
  }
  resultActions.hidden = false;
}

function calculateEstimate({ showError = true, requireForm = false } = {}) {
  if (!validatePhotos()) {
    return null;
  }

  const requiredFields = requireForm ? validateRequiredEstimateFields() : null;

  if (requireForm && !requiredFields) {
    return null;
  }

  if (requireForm && !estimateForm.reportValidity()) {
    showRequiredFieldsError();
    return null;
  }

  const parts = requiredFields?.parts || selectedParts();

  if (!parts.length) {
    currentEstimate = null;
    priceOutput.textContent = t("result.selectParts");
    summaryOutput.textContent = t("messages.required");
    resultActions.hidden = true;
    if (showError) {
      partsError.textContent = t("messages.required");
    }
    return null;
  }

  partsError.textContent = "";
  photoError.textContent = "";
  const damage = requiredFields?.damage || selectedDamage();
  const range = calculatePriceRange(parts, damage);

  if (!range || Number.isNaN(range.min) || Number.isNaN(range.max)) {
    showRequiredFieldsError();
    return null;
  }

  currentEstimate = {
    parts,
    damage,
    ...range,
  };

  renderEstimateResult(currentEstimate);
  return currentEstimate;
}

function createRequest() {
  const estimate = currentEstimate || calculateEstimate();
  if (!estimate) {
    return null;
  }

  const customer = getCustomerData();

  return {
    id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
    name: customer.name || t("messages.notProvided"),
    phone: customer.phone || t("messages.notProvided"),
    email: customer.email || t("messages.notProvided"),
    car: customer.car || t("messages.notProvided"),
    photos: selectedPhotoNames(),
    parts: estimate.parts.map((part) => getPartLabel(part)),
    damage: getDamageLabel(estimate.damage),
    price: estimate.price,
    date: new Date().toISOString(),
  };
}

function getTelegramEndpoint() {
  if (!["http:", "https:"].includes(window.location.protocol)) {
    return null;
  }

  return TELEGRAM_ENDPOINT;
}

async function sendRequestToTelegram(request) {
  const endpoint = getTelegramEndpoint();

  if (!endpoint) {
    return {
      ok: false,
      skipped: true,
      message: "Telegram delivery is available on the deployed site.",
    };
  }

  const payload = new FormData();
  payload.append("request", JSON.stringify(request));

  for (const photo of selectedPhotoFiles()) {
    payload.append("photos", photo, photo.name);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: payload,
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.error) {
    throw new Error(result.error || "Telegram notification failed.");
  }

  return { ok: true };
}

function appendSaveMessage(message) {
  summaryOutput.querySelector(".save-message")?.remove();
  summaryOutput.insertAdjacentHTML(
    "beforeend",
    `<p class="save-message">${escapeHtml(message)}</p>`
  );
}

function renderAdmin() {
  if (adminSection.hidden) {
    return;
  }

  const requests = getSavedRequests();

  if (!requests.length) {
    adminRows.innerHTML = `
      <tr>
        <td class="empty-row" colspan="7">${escapeHtml(t("messages.noSaved"))}</td>
      </tr>
    `;
    return;
  }

  adminRows.innerHTML = requests
    .map((request) => {
      const date = new Date(request.date).toLocaleString();
      return `
        <tr>
          <td>${escapeHtml(request.name)}</td>
          <td>${escapeHtml(request.phone)}</td>
          <td>${escapeHtml(request.car)}</td>
          <td>${escapeHtml(request.parts.join(", "))}</td>
          <td>${escapeHtml(request.damage)}</td>
          <td>${escapeHtml(request.price)}</td>
          <td>${escapeHtml(date)}</td>
        </tr>
      `;
    })
    .join("");
}

function isAdminView() {
  return new URLSearchParams(window.location.search).get("admin") === "true";
}

function updateAdminVisibility() {
  adminSection.hidden = !isAdminView();
}

async function handleSubmit(event) {
  event.preventDefault();

  if (!estimateForm.reportValidity()) {
    return;
  }

  const request = createRequest();
  if (!request) {
    return;
  }

  saveRequest(request);
  renderAdmin();

  try {
    const result = await sendRequestToTelegram(request);
    appendSaveMessage(
      result.skipped
        ? t("messages.savedLocal")
        : t("messages.savedTelegram")
    );
  } catch (error) {
    appendSaveMessage(`${t("messages.telegramFailedPrefix")}${error.message}`);
  }
}

function handleWhatsApp(event) {
  if (!estimateForm.reportValidity()) {
    event.preventDefault();
    return;
  }

  const request = createRequest();
  if (!request) {
    event.preventDefault();
    return;
  }

  saveRequest(request);
  renderAdmin();
  whatsappButton.setAttribute("href", createWhatsAppLink(request));
}

renderOptions();
updateAdminVisibility();
setLanguage(currentLanguage);
year.textContent = new Date().getFullYear();

calculateButton.addEventListener("click", () => calculateEstimate({ requireForm: true }));
estimateForm.addEventListener("submit", handleSubmit);
whatsappButton.addEventListener("click", handleWhatsApp);
refreshAdmin.addEventListener("click", renderAdmin);
photoUpload.addEventListener("change", renderPhotoPreview);
languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langOption));
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[name="parts"], input[name="damage"]')) {
    resetEstimateResult();
  }
});
