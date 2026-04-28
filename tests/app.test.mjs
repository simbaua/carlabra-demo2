import assert from "node:assert/strict";
import { calculatePriceRange, createWhatsAppLink, DAMAGE_LEVELS, PARTS } from "../calculator.js";

const door = PARTS.find((part) => part.id === "door");
const frontFender = PARTS.find((part) => part.id === "front-fender");
const bumper = PARTS.find((part) => part.id === "bumper");
const medium = DAMAGE_LEVELS.find((damage) => damage.id === "medium");

assert.equal(calculatePriceRange([], medium), null);

const estimate = calculatePriceRange([door, frontFender], medium);
assert.deepEqual(estimate, {
  min: 813,
  max: 1050,
  price: "813€ – 1050€",
});

const multiPartEstimate = calculatePriceRange([bumper, door], medium);
assert.deepEqual(multiPartEstimate, {
  min: 1100,
  max: 1325,
  price: "1100€ – 1325€",
});

const whatsappLink = createWhatsAppLink({
  parts: [door.label, frontFender.label],
  damage: medium.label,
  price: estimate.price,
  name: "QA Test",
  phone: "+358 44 000 0000",
  car: "Volvo V60",
});
const decoded = decodeURIComponent(whatsappLink);

assert.ok(whatsappLink.startsWith("https://wa.me/358449019789?text="));
assert.ok(decoded.includes("Parts: Door, Front fender"));
assert.ok(decoded.includes("Damage level: Medium damage"));
assert.ok(decoded.includes("Estimated price: 813€ – 1050€"));
assert.ok(decoded.includes("Name: QA Test"));
assert.ok(decoded.includes("Phone: +358 44 000 0000"));
assert.ok(decoded.includes("Car: Volvo V60"));

console.log("Calculator and WhatsApp tests passed.");
