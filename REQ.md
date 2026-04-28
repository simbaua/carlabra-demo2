# Requirements — CarLabra Estimate Tool

## 1. Product goal

Create a premium web-based car paint/body repair estimate tool for CarLabra.

The website should:
- look like a professional automotive brand
- calculate estimated repair price ranges
- collect customer request data
- allow customer to contact CarLabra through WhatsApp with a pre-filled message
- guide customers to existing Gallery and Shop pages
- be mobile-first and fast

## 2. Brand

Brand name:

`CarLabra`

Logo:

Use logo from:

`/public/assets/logoCarlabra.svg`

If the logo file is missing, use a clean text logo: `CarLabra`.

Primary brand color:

`#9b5edb`

## 3. Main pages / sections

The site should include:

1. Header
2. Hero section
3. Estimate calculator
4. Services section
5. About section
6. External navigation buttons: Gallery and Shop
7. Footer
8. Admin view

## 4. Header requirements

Header should include:
- CarLabra logo or text fallback
- navigation links/buttons:
  - Estimate
  - Gallery
  - Shop
  - Contact

External links:
- Gallery: `https://carlabra.fi/ru/gallery`
- Shop: `https://carlabra.fi/ru/shop`

Open Gallery and Shop in a new tab.

## 5. Hero section

Hero headline:

`CarLabra — Professional Car Paint & Body Repair`

Hero subheadline:

`Get an accurate repair estimate in under 60 seconds. Professional auto body repair, paint restoration, and precision color matching in Espoo.`

Trust badges:
- Fast estimate
- Premium finish
- Precision color matching

CTA:
- `Get your estimate`

Design:
- dark cinematic background
- premium automotive feeling
- purple accent used with restraint

## 6. Estimate calculator

The calculator must allow the customer to:

- select damaged car part(s)
- select damage level
- see estimated price range
- enter personal/contact information
- submit request
- open WhatsApp with pre-filled request message

## 7. Car parts and price ranges

Use these real CarLabra price ranges:

- Bumper: 490–570€
- Front fender: 260–350€
- Rear quarter panel: 350–440€
- Door: 390–490€
- Hood: 580–700€
- Side skirt / threshold: 310–400€
- Small parts: 150–200€
- Roof: 700–900€

Update the website part list to match these items.

## 8. Multi-part selection

The estimate form should support multiple selected parts.

Example:
- Door + Front fender
- Bumper + Hood

Calculation:
- sum all selected part minimum prices
- sum all selected part maximum prices
- apply damage coefficient to both min and max

If no part is selected, prevent calculation and show a clear message.

## 9. Damage levels

Keep only these damage levels for now:

- Light damage → x1.0
- Medium damage → x1.25
- Heavy damage → x1.5

Do not add more damage categories now.

## 10. Pricing logic

Use price range calculation:

`estimatedMin = sum(selectedParts.min) * damageCoefficient`

`estimatedMax = sum(selectedParts.max) * damageCoefficient`

Round prices to whole euros.

Show format:

`Estimated price: 390€ – 490€`

Important note:

`This is an approximate estimate. Final price is confirmed after physical inspection.`

## 11. Services section

Keep a Services section in the layout.

For now:
- do not overcomplicate it
- keep it ready for future content
- it can show minimal placeholder or use the text below if needed

Approved professional services copy:

Title:
`Полный кузовной сервис для водителей Хельсинки и Эспоо`

Subtitle:
`От первичной оценки до выдачи автомобиля — каждый этап выстроен по чёткой системе CarLabra. Мы обеспечиваем прозрачные расчёты, соблюдение сроков и стабильное качество на уровне заводских стандартов.`

Cards:

`Покраска`
`Профессиональные лакокрасочные работы с использованием качественных материалов и точного подбора оттенка. Результат — равномерное покрытие и идеальное совпадение цвета.`

`Кузовной ремонт`
`Восстановление после ДТП, удаление вмятин и геометрии кузова. Работаем аккуратно и точно, сохраняя заводские параметры автомобиля.`

`Продажа краски`
`Подбор и продажа автомобильной краски с высокой точностью оттенка. Поможем найти оптимальное решение под вашу задачу.`

Note:
If the current implementation would become too heavy, keep the section structure and add content later.

## 12. About section

Approved copy:

Title:
`Фокус на качестве и клиенте с 2022 года`

Text:
`CarLabra Oy — кузовная и малярная мастерская в Эспоо, работающая с 2022 года. Мы специализируемся на ремонте и покраске автомобилей, уделяя внимание деталям на каждом этапе работы.`

`Наша команда и оборудование позволяют работать с любыми типами транспорта — от мотоциклов до коммерческих автомобилей. Наша цель — вернуть автомобилю безупречный внешний вид и обеспечить результат, соответствующий ожиданиям клиента.`

## 13. Gallery and Shop buttons

Add external navigation buttons:

Gallery:
`https://carlabra.fi/ru/gallery`

Shop:
`https://carlabra.fi/ru/shop`

Use them:
- in header
- near hero or near estimate result if appropriate
- in footer

Open in new tab.

## 14. WhatsApp behavior

The WhatsApp button in the estimate form must generate a pre-filled WhatsApp message using form data.

Use number:

`+358449019789`

WhatsApp URL format:

`https://wa.me/358449019789?text=ENCODED_TEXT`

Do not include images in WhatsApp message.

Message format:

`New CarLabra estimate request:

Parts: ...
Damage level: ...
Estimated price: ...

Customer:
Name: ...
Phone: ...
Car: ...

Sent from website.`

Requirements:
- include selected parts
- include damage level
- include estimated price range
- include customer name
- include customer phone
- include car model if available
- encode the message properly
- open WhatsApp in a new tab

## 15. Contact information

Use:

Phone:
`+358 44 901 9789`

Email:
`info@carlabra.fi`

Address:
`Kylänportti 4B, 02940 Espoo`

Working hours:
`Mon–Fri: 8:00–16:00`

## 16. Footer

Add footer section.

Footer structure:

Left column:
- logo or text logo
- short company description

Second column:
- Services list

Third column:
- Working hours

Fourth column:
- Contact information

Bottom:
- copyright line

Footer design:
- black background
- white/gray text
- purple accents
- clean premium automotive style
- social media links/icons if available

Suggested footer description:

`Professional auto body repair and paint workshop in Espoo. Quality repairs, accurate estimates, and premium finish.`

## 17. Admin view

Keep admin view.

Admin view must show saved requests from localStorage.

Each request should show:
- name
- phone
- car model
- selected parts
- damage level
- estimated price range
- date

Do not add real login yet.

Do not add backend yet.

## 18. What NOT to implement now

Do not implement now:
- real backend
- database
- authentication
- photo storage
- AI damage recognition
- CABAS-lite
- PDF estimates
- multilingual support
- Telegram bot
- WhatsApp Business API

These are future improvements.

## 19. Future improvements

Planned for later:
- Finnish + English language switcher
- Telegram lead notifications
- real photo storage
- admin login
- request statuses
- PDF estimate
- online booking
- CABAS-lite module
- CRM dashboard
- AI photo analysis

## 20. Deployment note

The project is deployed through GitHub + Netlify.

After changes:
- commit
- push to GitHub
- Netlify rebuilds automatically
