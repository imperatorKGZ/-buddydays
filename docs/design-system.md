# BuddyDays Design System

## Source of truth
The homepage must match the supplied original HTML design reference in its layout, typography, colors, SVG mascot illustrations, responsive breakpoints, tools section, and footer. The approved Dog World and Cat World composition remains the source of truth. The Blog panel is a new section inserted after Cat World and before Tools; it should use the existing warm editorial palette and remain a single wide, compact interface. Do not redesign the mascots or add decorative stickers.

## Visual language
- Warm cream dog section (`#f1e4d5`) with deep brown text (`#46372e`).
- Soft blue-gray cat section (`#e5edf0`) with slate text (`#344651`).
- Warm paper bridge and tools background (`#f7f3ed`).
- Georgia serif hero headings; system sans-serif body and navigation.
- Spacious two-column desktop layout; compact but still side-by-side on mobile as defined in the reference CSS.
- Original SVG dog and cat faces are the approved mascots. No bones, paw stickers, yarn balls, extra badges, or added decorative copy.

## Motion
- Dog: blinking, tail wag, tongue animation, subtle head/ear response to pointer.
- Cat: blinking, tail movement, ear flicks, subtle head/ear response to pointer.
- Pointer gaze uses the reference's `.art-wrap` tracking area and movement constants.
- Respect `prefers-reduced-motion`; touch devices get a brief gaze response on tap.

## Content density
Keep the reference's concise copy. Do not add extra taglines, captions, labels, chips, or ornamentation to the hero sections unless requested.
