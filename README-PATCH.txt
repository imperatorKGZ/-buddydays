BuddyDays homepage design patch

This patch restores the visual direction from the screenshot:
- warm cream Dog World and soft blue Cat World
- large serif headlines and short copy
- dog illustration left / text right
- cat text left / illustration right
- quiet center divider: "Two worlds. One happy home."
- no bones, paw stickers, labels around mascots, or busy decorations
- cursor tracking uses the entire animal section, including the text and button
- responsive stacked layout on narrow screens

Install:
1. Stop the Next.js dev server with Ctrl+C.
2. Extract this ZIP into the BuddyDays project root.
3. Allow files in src/ to be overwritten.
4. Run: npm run dev
5. Open: http://localhost:3000

The patch does not change package.json and does not require npm install.
The global site header is hidden on the homepage to match the supplied reference image;
it remains visible on the other pages. The footer remains available below the homepage.
