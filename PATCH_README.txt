BuddyDays: Dog World / Cat World navigation patch

Apply this patch to the BuddyDays project root (the folder containing package.json).

Files included:
- src/components/home/buddydays-homepage.tsx
  Changes only the two hero CTA destinations:
  Explore Dog World -> /dogs
  Explore Cat World -> /cats
  Removes their old tool-tab data attributes. The hero design and mascot animation are unchanged.

- src/app/dogs/page.tsx
  Turns /dogs into the dog editorial landing page using the existing BlogBrowser,
  pre-filtered to dog articles.

- src/app/cats/page.tsx
  Turns /cats into the cat editorial landing page using the existing BlogBrowser,
  pre-filtered to cat articles.

- src/features/blog/components/blog-browser.tsx
  Uses Dog stories & guides / Cat stories & guides headings and matching descriptions
  when opened from /dogs or /cats. The existing /blog page remains unchanged.

No dependencies, environment variables, database settings, CSS, homepage artwork,
mascot SVGs, or other routes are changed.

Apply:
1. Stop Next.js with Ctrl+C.
2. Extract this ZIP into the BuddyDays project root and allow the four files to be replaced.
3. Run npm run dev.
4. Test /dogs and /cats, then click the two homepage hero buttons.
