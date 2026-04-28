const STORAGE_KEY = "carlabra_estimate_requests";
const TELEGRAM_ENDPOINT = "/.netlify/functions/send-estimate";
const REQUIRED_FIELDS_MESSAGE =
  "Please upload photos, select damaged parts, choose damage level, and enter your name and phone.";
const PARTS = [
  { id: "bumper", label: "Bumper", min: 490, max: 570 },
  { id: "front-fender", label: "Front fender", min: 260, max: 350 },
  { id: "rear-quarter-panel", label: "Rear quarter panel", min: 350, max: 440 },
  { id: "door", label: "Door", min: 390, max: 490 },
  { id: "hood", label: "Hood", min: 580, max: 700 },
  { id: "side-skirt-threshold", label: "Side skirt / threshold", min: 310, max: 400 },
  { id: "small-parts", label: "Small parts", min: 150, max: 200 },
  { id: "roof", label: "Roof", min: 700, max: 900 },
];
const DAMAGE_LEVELS = [
  {
    id: "light",
    label: "Light damage",
    description: "Small scratches or minor paint defects",
    coefficient: 1,
  },
  {
    id: "medium",
    label: "Medium damage",
    description: "Visible scratches, dents, or paint damage",
    coefficient: 1.25,
  },
  {
    id: "heavy",
    label: "Heavy damage",
    description: "Large damage, deep dents, or complex repair",
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

let currentEstimate = null;

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
  const message = `New CarLabra estimate request:

Parts: ${request.parts.join(", ")}
Damage level: ${request.damage}
Estimated price: ${request.price}

Customer:
Name: ${request.name}
Phone: ${request.phone}
Car: ${request.car}

Sent from website.`;

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

function resetEstimateResult() {
  currentEstimate = null;
  priceOutput.textContent = "Complete the form to calculate";
  summaryOutput.textContent =
    "Upload photos, select damaged parts, and choose a damage level to see your estimate.";
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
          <span class="part-title">${part.label}</span>
        </span>
      </label>
    `
  ).join("");

  damageOptions.innerHTML = DAMAGE_LEVELS.map(
    (damage, index) => `
      <label class="damage-card">
        <input type="radio" name="damage" value="${damage.id}" ${index === 0 ? "checked" : ""} />
        <span>
          <span class="damage-title">${damage.label}</span>
          <span class="damage-copy">${damage.description}</span>
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
    photoError.textContent = "Please upload no more than 3 photos.";
    resetEstimateResult();
    return false;
  }

  photoError.textContent = "";
  return true;
}

function showRequiredFieldsError() {
  currentEstimate = null;
  priceOutput.textContent = "Complete the form to calculate";
  summaryOutput.textContent = REQUIRED_FIELDS_MESSAGE;
  photoError.textContent = REQUIRED_FIELDS_MESSAGE;
  resultActions.hidden = true;
}

function validateRequiredEstimateFields() {
  const parts = selectedParts();
  const damage = selectedDamage();
  const customer = getCustomerData();

  if (!parts.length || !damage || !customer.name || !customer.phone) {
    showRequiredFieldsError();
    partsError.textContent = parts.length ? "" : REQUIRED_FIELDS_MESSAGE;
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
  priceOutput.textContent = `Estimated price: ${estimate.price}`;
  summaryOutput.innerHTML = `
    <dl>
      <div>
        <dt>Selected parts</dt>
        <dd>${escapeHtml(estimate.parts.map((part) => part.label).join(", "))}</dd>
      </div>
      <div>
        <dt>Damage level</dt>
        <dd>${escapeHtml(estimate.damage.label)}</dd>
      </div>
      <div>
        <dt>Estimated price range</dt>
        <dd>${escapeHtml(estimate.price)}</dd>
      </div>
    </dl>
  `;
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
    priceOutput.textContent = "Select damaged parts";
    summaryOutput.textContent = REQUIRED_FIELDS_MESSAGE;
    resultActions.hidden = true;
    if (showError) {
      partsError.textContent = REQUIRED_FIELDS_MESSAGE;
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
    name: customer.name || "Not provided",
    phone: customer.phone || "Not provided",
    email: customer.email || "Not provided",
    car: customer.car || "Not provided",
    photos: selectedPhotoNames(),
    parts: estimate.parts.map((part) => part.label),
    damage: estimate.damage.label,
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
        <td class="empty-row" colspan="7">No saved requests yet.</td>
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
        ? "Request saved locally. Telegram delivery is available on the deployed site."
        : "Request saved locally and sent to Telegram. You can also continue in WhatsApp."
    );
  } catch (error) {
    appendSaveMessage(
      `Request saved locally, but Telegram notification was not sent: ${error.message}`
    );
  }
}

function handleWhatsApp() {
  if (!estimateForm.reportValidity()) {
    return;
  }

  const request = createRequest();
  if (!request) {
    return;
  }

  saveRequest(request);
  renderAdmin();
  window.open(createWhatsAppLink(request), "_blank", "noopener,noreferrer");
}

renderOptions();
adminSection.hidden = new URLSearchParams(window.location.search).get("admin") !== "true";
renderAdmin();
year.textContent = new Date().getFullYear();

calculateButton.addEventListener("click", () => calculateEstimate({ requireForm: true }));
estimateForm.addEventListener("submit", handleSubmit);
whatsappButton.addEventListener("click", handleWhatsApp);
refreshAdmin.addEventListener("click", renderAdmin);
photoUpload.addEventListener("change", renderPhotoPreview);

document.addEventListener("change", (event) => {
  if (event.target.matches('input[name="parts"], input[name="damage"]')) {
    resetEstimateResult();
  }
});
