# Codex Agent Rules — CarLabra Estimate Tool

You are working on a production-ready web application for CarLabra.

## Core rules

- Do not break existing working functionality.
- Do not remove pricing logic unless explicitly requested.
- Keep the estimate form functional at all times.
- Preserve the admin view and localStorage functionality unless requested.
- Make changes step-by-step, not full rewrites.
- Always preserve mobile responsiveness.
- Use clean, readable code.
- Avoid unnecessary dependencies.
- Do not introduce backend, database, authentication, or real file storage unless explicitly requested.

## Design rules

- Follow `DESIGN.md` strictly.
- Use CarLabra Purple `#9b5edb` as the primary accent color.
- Keep the layout premium, minimal, editorial, and automotive.
- Use black/white/gray as the dominant palette.
- Purple must be used with restraint, similar to how Ferrari uses red.
- Do not make the whole site purple.
- Keep corners sharp/minimal, not overly rounded.
- Maintain good spacing and mobile-first usability.

## Functional protection

Do not remove or break:
- estimate form
- pricing calculation
- price range output
- WhatsApp button behavior
- admin view
- localStorage request saving
- mobile responsiveness

## Logo rule

Use the logo from:

`/public/assets/logoCarlabra.svg`

If the file is missing, keep a clean text logo: `CarLabra`.
