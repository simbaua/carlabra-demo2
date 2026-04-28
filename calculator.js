export const PARTS = [
  { id: "bumper", label: "Bumper", min: 490, max: 570 },
  { id: "front-fender", label: "Front fender", min: 260, max: 350 },
  { id: "rear-quarter-panel", label: "Rear quarter panel", min: 350, max: 440 },
  { id: "door", label: "Door", min: 390, max: 490 },
  { id: "hood", label: "Hood", min: 580, max: 700 },
  { id: "side-skirt-threshold", label: "Side skirt / threshold", min: 310, max: 400 },
  { id: "small-parts", label: "Small parts", min: 150, max: 200 },
  { id: "roof", label: "Roof", min: 700, max: 900 },
];

export const DAMAGE_LEVELS = [
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

export const WHATSAPP_URL = "https://wa.me/358449019789";

export function formatPrice(min, max) {
  return `${Math.round(min)}€ – ${Math.round(max)}€`;
}

export function calculatePriceRange(parts, damage) {
  if (!parts.length) {
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

export function createWhatsAppLink(request) {
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
