# CarLabra Estimate Tool

## Purpose

This is a web-based estimate tool for CarLabra auto body repair and paint services.

It allows customers to:
- choose damaged parts
- select damage level
- get an estimated price range
- send request
- open WhatsApp with pre-filled message

## Project structure

Important files:

- `agent.md` — rules for Codex
- `CONTEXT.md` — project context
- `DESIGN.md` — visual design rules
- `REQ.md` — functional requirements
- `public/assets/logoCarlabra.svg` — CarLabra logo file

## Logo

Place the final logo here:

`public/assets/logoCarlabra.svg`

If the logo is missing, the website should use text logo `CarLabra`.

## Local development

Run:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Updating public website

After editing the project:

```bash
git add . && git commit -m "update" && git push
```

Netlify will automatically rebuild the website.

## Current pricing logic

Parts:

- Bumper: 490–570€
- Front fender: 260–350€
- Rear quarter panel: 350–440€
- Door: 390–490€
- Hood: 580–700€
- Side skirt / threshold: 310–400€
- Small parts: 150–200€
- Roof: 700–900€

Damage coefficients:

- Light: x1.0
- Medium: x1.25
- Heavy: x1.5

## Important note

The price is approximate.

Final repair price is confirmed after physical inspection.
