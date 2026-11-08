# BuddyDays — Stage 1.2 audit fixes

Пакет предназначен для применения поверх ветки `checkpoint/stage-1.2` (коммит `887f3133fdd46cd5f5519184f0cb064ad2d249af`) или вашей отдельной рабочей ветки, созданной от неё.

## Что исправлено

1. **Hero / общая сетка.** Горизонтальный gutter теперь задаётся один раз через `--site-gutter`. Удалено дополнительное сужение `.worldGrid`, которое давало двойные отступы на промежуточных ширинах.
2. **Dog World / Cat World.** Удалено позднее правило `.worldGrid :global(.world-inner) { width: 100%; }`, отменявшее внутренние отступы Stage 1.1. Сохранена мобильная композиция «иллюстрация → текст → CTA».
3. **Latest Guides.** Удалено глобальное ограничение ширины внешней секции. Контейнером остаётся `.inner` из CSS Module; тестовая проверка измеряет внутренние content rails.
4. **WCAG AA.** Затемнены мелкие kicker-лейблы Hero, Latest Guides и Tools. Для затронутых цветов контраст выше 4.5:1 на соответствующем фоне.
5. **Mobile Menu.** `aria-controls` присутствует только тогда, когда связанная навигация смонтирована. Существующее поведение Escape, scroll lock, возврата фокуса и focus trap сохранено.
6. **Visual regression test.** Добавлен Playwright-аудит на 320, 390, 480, 600, 768, 900, 1024, 1280, 1440 и 1920 px со скриншотами главной страницы и открытого мобильного меню.

## Содержимое пакета

- `src/components/home/homepage.module.css` — готовая замена.
- `src/components/home/latest-guides.module.css` — готовая замена.
- `src/components/layout/mobile-menu.tsx` — готовая замена.
- `tests/e2e/homepage-visual-audit.spec.ts` — новый тест визуального/responsive-аудита.
- `patches/globals.css.patch` — точечный patch для `src/app/globals.css`.
- `apply.sh` и `apply.ps1` — безопасное применение с резервными копиями.

## Применение на macOS / Linux

Извлеките ZIP в отдельную папку. В существующем checkout BuddyDays создайте рабочую ветку и примените пакет:

```bash
git switch checkpoint/stage-1.2
git switch -c fix/stage-1.2-audit
bash /path/to/buddydays-audit-fix/apply.sh /path/to/your/buddydays
```

## Применение на Windows PowerShell

```powershell
git switch checkpoint/stage-1.2
git switch -c fix/stage-1.2-audit
& "C:\path\to\buddydays-audit-fix\apply.ps1" -RepoRoot "C:\path\to\your\buddydays"
```

Скрипт откажется работать непосредственно на `main`, сначала проверит применимость patch, сохранит затрагиваемые оригиналы в `.patch-backups/stage-1.2-audit/<timestamp>/`, затем установит файлы и выполнит `git diff --check`. Папка `.patch-backups/` не удаляется.

## Проверка после применения

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e -- --grep "BuddyDays visual audit|mobile navigation closes after selecting a route"
```

Playwright создаст скриншоты в `test-results/visual-audit/`. Их нужно фактически просмотреть. Этот ZIP содержит тест, который создаёт изображения, но сам по себе не содержит готовых скриншотов и не подтверждает прохождение тестов.

## Важные ограничения

Это **пакет изменённых файлов и patch**, а не полный архив репозитория. Контент, маршруты, модели данных, редакционные записи, SVG-маскоты и бизнес-логика не заменяются. В этой среде удалось читать GitHub, но GitHub API запретил запись в репозиторий (403), а локальный checkout создать не удалось из-за отсутствия DNS-доступа к github.com. Поэтому lint, typecheck, unit tests, build и Playwright здесь не запускались. Не считать их пройденными до запуска в checkout проекта.
