# Launch checklist

## Owner decisions required

- [ ] Set the canonical production `SITE_URL` and `DEPLOYMENT_ENV=production`.
- [ ] Confirm the copyright owner or replace the temporary All rights reserved license.
- [ ] Review privacy, terms, methodology, disclosure, and contact details with counsel/owner.
- [ ] Supply licensed favicon, social-preview artwork, and the homepage reference HTML.
- [ ] Confirm hosting, DNS, SSL, www redirect, error monitoring, backups, and an owner for each.

## Before release

- [ ] Run `npm ci`, `npm run check`, `npm run build`, and `npm run test:e2e`.
- [ ] Verify `robots.txt` permits crawling only in production and submit `sitemap.xml` to Search Console and Bing Webmaster Tools.
- [ ] Confirm 404/500 pages, social previews, keyboard navigation, and the contact route.
- [ ] Publish only reviewed content with real sources, dates, authors, rights-cleared images, and accurate alt text.
