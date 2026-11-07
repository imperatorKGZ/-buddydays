# BuddyDays tools audit — Stage A inventory

Дата проверки: 2026-11-08  
Ветка: `codex/tools-audit`  
Область: только инвентаризация. В этом этапе код инструментов, статьи, slug, категории,
теги и статусы не изменялись.

## Executive summary

В репозитории есть хаб `/tools` и четыре инструмента:

1. `/tools/pet-cost-calculator`
2. `/tools/pet-size-calculator`
3. `/tools/product-finder`
4. `/tools/travel-checklist`

Все четыре страницы имеют серверный route и серверно отрисовывают начальный HTML
клиентского компонента. Однако ни один инструмент пока не имеет полного SEO-контракта
из ТЗ: WebApplication/BreadcrumbList JSON-LD, FAQ-контента, отдельного canonical,
URL-share state, print/PDF и карточки результата. На уровне приложения подключён
только общий Organization JSON-LD.

Критический пробел по данным: `src/data/catalog/sources.ts` экспортирует пустой
массив, а `src/data/catalog/products/dogs.ts` и `cats.ts` также пусты. Поэтому в
репозитории нет подтверждённых первоисточников для чисел, коэффициентов, диапазонов,
правил или product-атрибутов. Встроенные значения ниже должны рассматриваться как
пользовательские значения, UI-константы или неподтверждённые данные, а не как
научные рекомендации.

## Общий SEO и SSR baseline

| Проверка                     | Наблюдение                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Серверный текст без JS       | Заголовок, описание, форма/список и пояснения находятся в JSX route или SSR-HTML client component; начальный результат расчёта без JS не показывается.                                                                               |
| Metadata                     | Все tool routes используют `createPageMetadata(title, description)`. Есть title, description, `metadataBase` и общий Open Graph через helper. Уникальные OG-image, Twitter metadata и explicit canonical для tool pages отсутствуют. |
| JSON-LD                      | В `src/app/layout.tsx` есть общий Organization JSON-LD. WebApplication, BreadcrumbList и FAQ JSON-LD для tools отсутствуют.                                                                                                          |
| Sitemap/navigation           | `/tools` есть в `src/config/navigation.ts`; sitemap сейчас включает только базовые editorial/public routes и не включает tool routes.                                                                                                |
| Related content              | Хаб содержит ссылки на четыре инструмента. Страницы инструментов не содержат связанные инструменты/статьи и не проверяют наличие published articles перед показом блока.                                                             |
| URL sharing                  | Ни один инструмент не кодирует состояние формы или результат в query-параметры.                                                                                                                                                      |
| Copy/print/PDF               | Кнопок Copy, Print или PDF нет.                                                                                                                                                                                                      |
| Newsletter/lead magnet/embed | Интерфейс, согласие и валидация отсутствуют; provider и сбор данных не подключены.                                                                                                                                                   |
| Data freshness               | Только product model предусматривает `lastVerifiedAt`, но фактических products/sources нет. Travel copy прямо отправляет владельца проверять текущие правила вручную.                                                                |

## 1. Pet Cost Calculator

**Route:** `/tools/pet-cost-calculator`  
**Files:** `src/app/tools/pet-cost-calculator/page.tsx`,
`src/features/cost-calculator/components/cost-calculator-form.tsx`,
`src/features/cost-calculator/logic/calculate-cost.ts`.

### Что считает

Функция `calculateOwnershipCost` считает одну сумму:

```text
total = initialCost + floor(periodDays / recurringIntervalDays) * recurringCost
```

Начальные значения UI: `initialCost=40`, `recurringCost=8`,
`recurringIntervalDays=30`, `periodDays=365`. Это не встроенные цены из каталога,
но они всё равно являются числовыми значениями в коде и не имеют записи в реестре
источников. Их следует заменить на пустые пользовательские поля или явно пометить
как UI-пример до этапа B.

### Inputs/outputs

- Input: initial cost in dollars, recurring cost in dollars, interval in days,
  period in days.
- Output: one dollar total after submit; no monthly/yearly/lifetime breakdown.
- Units: dollars and days; no unit switch.

### Validation and edge cases

- Logic rejects non-finite and negative values and rejects interval `<= 0`.
- `periodDays=0` is accepted.
- Decimal day values are accepted by the pure function despite the UI using `step=1`.
- No Zod schema; browser `min`/`step` attributes are not a server/domain contract.
- No upper bounds, currency selection, monthly/yearly/lifetime modes, configurable
  lifespan, or explicit handling of `NaN` generated by blank numeric inputs beyond
  the generic error.
- `floor` means a recurrence exactly at day 30 is counted, while a partial period is
  discarded; this behavior is not explained to the user.

### Sources and legal risk

There are no external numbers or scientific claims in the formula. The formula is a
local arithmetic convention, not a sourced ownership-cost estimate. The UI correctly
states that values are user-entered and not store/veterinary estimates. No prices,
merchant offers, or affiliate data are imported.

### Existing tests

`tests/unit/cost-calculator.test.ts` covers one expected total (`40 + 3*8 = 64`) and
interval zero rejection. The expected value is a test fixture, not a source registry
entry. Missing: boundaries, negative/non-finite inputs, zero period, decimal behavior,
and Zod error contract. No tool-specific E2E or no-JS assertion exists.

## 2. Pet Size Calculator

**Route:** `/tools/pet-size-calculator`  
**Files:** `src/app/tools/pet-size-calculator/page.tsx`,
`src/features/size-calculator/components/size-calculator-form.tsx`,
`src/features/size-calculator/logic/validate-dimensions.ts`.

### Что делает

This is a positive-number validator, not a size recommendation or geometric fit
calculation. It accepts length, width, height in inches and optional weight in pounds,
then returns a boolean. The UI displays a generic confirmation telling the owner to
compare the measurements with the exact manufacturer's chart.

### Inputs/outputs

- Required: `lengthInches`, `widthInches`, `heightInches`.
- Optional: `weightPounds`.
- Output: `true/false` in logic; a status message in UI.
- Units: imperial only (`in`, `lb`); no metric conversion.

### Validation and edge cases

- Logic requires finite values strictly greater than zero.
- UI uses `min=0.1`, but logic accepts values between `0` and `0.1`.
- Optional blank weight is omitted; a typed invalid weight becomes `NaN` and fails.
- No Zod schema, upper bounds, conversion, carrier/bed/bowl geometry, tolerance,
  or result range.

### Sources and legal risk

No formula, coefficient, or external claim is used. Manufacturer sizing charts are
mentioned but not imported or stored. The tool avoids claiming universal compatibility.

### Existing tests

No unit test, integration test, E2E test, axe test specific to this route, or no-JS
assertion exists.

## 3. Product Finder

**Route:** `/tools/product-finder`  
**Files:** `src/app/tools/product-finder/page.tsx`,
`src/features/product-finder/components/*`,
`src/features/product-finder/logic/matching-engine.ts`,
`src/features/product-finder/logic/scoring-engine.ts`,
`src/features/product-finder/schemas/finder.schema.ts`.

### Что считает

`matchProducts` performs hard eligibility filtering:

- product status must be `active`;
- species must match or be `both`;
- category must match exactly;
- optional pet size/age excludes a product only when that product has a non-empty
  suitability list that does not include the selected value.

`scoreProduct` counts exact matches in `preferredAttributes`, converts that count to
`round(matched / preferenceCount * 100)`, then subtracts up to 20 points for missing
verification limitations. It is explicitly a preference-fit score, not product quality.

### Inputs/outputs

- Validated criteria: species, non-empty category, optional pet size/age/use cases,
  and primitive preferred attributes.
- Output: `ProductMatch[]` with product, score, reasons, limitations.
- Current catalog: both dog and cat product arrays are empty, so the normal result is
  an empty-state message.

### Validation and edge cases

- Zod validates species/category lengths and array sizes, but the UI only exposes
  species and free-text category.
- `useCases` is accepted by schema/type but ignored by `matchProducts` and scoring.
- Empty preference set produces score `0` for every eligible product.
- Product ordering ties are not explicitly stabilized after score sorting.
- Unknown attributes lower the score through limitations; unknown suitability is not a
  hard exclusion.
- No URL state, pagination, source display, or result sharing.

### Sources and legal risk

The algorithm does not use offers, prices, ratings, reviews, or merchant APIs, which
matches the Product/Offer boundary. However `productSources` is empty and the catalog
is empty, so there are no actual verified product claims to audit. No product result is
currently exposed to search engines beyond the explanatory page copy.

### Existing tests

`tests/unit/matching-engine.test.ts` covers species/category/fit, species mismatch,
and exclusion of `needs-review`. There are no scoring tests, schema tests, finder E2E,
finder-specific axe test, or no-JS assertion.

## 4. Travel Checklist

**Route:** `/tools/travel-checklist`  
**Files:** `src/app/tools/travel-checklist/page.tsx`,
`src/features/travel-planner/components/travel-checklist.tsx`.

### Что делает

The client component renders six fixed checklist labels and tracks checked labels in
React state. It reports `checked.length` of the fixed total. The list is:

- Food and water
- Travel-safe carrier or restraint
- Leash or harness
- Waste bags or litter supplies
- Medication and care items
- Identification and trip documents

### Inputs/outputs

- Input: checkbox interactions only.
- Output: checked state and completion count in the current browser session.
- `TravelChecklistItem` type defines `id`, `label`, `required`, and `species`, but the
  actual component uses plain strings and does not use that type.

### Validation and edge cases

- No persistence, URL sharing, reset button, print/PDF, species filter, required-item
  distinction, or duplicate-safe IDs beyond label strings.
- State is lost on navigation or refresh.
- JavaScript is required for checking items; the static labels remain visible.

### Sources and legal risk

The six items have no source IDs or verification dates. The page correctly warns users
to verify destination, airline, lodging, and carrier rules instead of embedding those
rules. “Medication and care items” is a generic checklist label, not a dosage or
medical instruction, but it still needs owner/editor review before expansion.

### Existing tests

No unit, E2E, axe, or no-JS test specifically covers this checklist.

## 5. Tools hub

**Route:** `/tools`  
The hub is a server component with a static array of four links, title, description,
and cards. It has no filters, search, structured data, FAQ, source block, published
article links, or tool freshness metadata. It is visible without JavaScript.

## 6. Explicitly unsourced or unverified data

The following values/claims were found without a source-registry record:

1. Cost calculator defaults `40`, `8`, `30`, and `365`.
2. Cost recurrence convention `floor(periodDays / intervalDays)`.
3. The six travel checklist labels and their implied completeness.
4. Product scoring weight/penalty constants: percentage normalization and maximum
   20-point limitation penalty, plus 5 points per limitation.
5. Product suitability semantics and the meaning of `active`/`needs-review` are local
   domain rules, not externally sourced facts.
6. The test fixture value `64` in `tests/unit/cost-calculator.test.ts` is not a
   real-world claim but is still not linked to a source record.

No source was found for medical, toxicology, medication dosage, airline rules, prices,
regional veterinary costs, inventory, ratings, reviews, or product images. The current
code does not implement those prohibited calculations/data sources.

## 7. Search visibility and route metadata matrix

| Route                        | Main copy without JS | Interactive behavior without JS                    | Metadata                                            | JSON-LD                   | Aging-data dependency                           |
| ---------------------------- | -------------------- | -------------------------------------------------- | --------------------------------------------------- | ------------------------- | ----------------------------------------------- |
| `/tools`                     | Yes                  | Links work                                         | Generic title/description/OG                        | Organization only at root | None                                            |
| `/tools/pet-cost-calculator` | Yes                  | Form fields/button render; calculation requires JS | Generic title/description/OG; no explicit canonical | Organization only         | User-entered values; defaults need cleanup      |
| `/tools/pet-size-calculator` | Yes                  | Form fields/button render; validation requires JS  | Generic title/description/OG; no explicit canonical | Organization only         | None                                            |
| `/tools/product-finder`      | Yes                  | Form renders; matching requires JS                 | Generic title/description/OG; no explicit canonical | Organization only         | Catalog/sources are empty; no live data         |
| `/tools/travel-checklist`    | Yes                  | Labels render; checking requires JS                | Generic title/description/OG; no explicit canonical | Organization only         | Current travel rules intentionally not embedded |

## 8. Stage A decisions and open questions

Stage A is complete. No implementation changes are authorized by this report alone;
Stage B and each Stage C tool require the owner's explicit `ок` before work begins.

Open owner decisions:

- Confirm authoritative, reachable first-party sources for any formula or coefficient
  selected for the tools; record URL, publisher, checked date, source type, and scope.
- Decide whether the cost calculator should start with blank user inputs rather than
  the current illustrative defaults.
- Approve the legal/editorial wording and required veterinary disclaimer for future
  calorie, lifespan, or health-adjacent tools.
- Decide whether travel remains a generic timeless packing checklist or is deferred
  until a sourced, non-regulatory scope is approved.
- Provide or approve original illustrations if a future body-condition-score tool is
  commissioned; do not use copied charts or images.
- Confirm the production domain before canonical/OG URL validation.

## 9. Commands and evidence

Inventory commands used:

```text
git branch --show-current
rg --files src/features src/app/tools src/data/catalog src/lib/seo tests/unit tests/e2e
Get-Content on all tool routes, feature logic/components, catalog sources, SEO helpers,
relevant tests, and docs/data-sources.md, docs/architecture.md, docs/content-guidelines.md
```

No lint, typecheck, test, build, audit, or E2E command was run in Stage A because the
stage explicitly requires inventory only. The existing repository had no dedicated
tool E2E or axe coverage per route in the inspected test files.
