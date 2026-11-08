"use client";

import { useLayoutEffect, useRef } from "react";
import { LatestGuides } from "./latest-guides";
import styles from "./homepage.module.css";

// This markup is a direct port of the user-supplied BuddyDays visual reference.
// Keep the HTML/SVG composition intact; behavior is attached in the effect below.
const HOMEPAGE_MARKUP =
  '<header class="site-header">\n    <div class="header-inner">\n      <a class="brand" href="#top" aria-label="BuddyDays home">\n        <span class="brand-mark" aria-hidden="true">✳</span>\n        <span><span class="brand-name">BuddyDays</span><span class="brand-tagline">A happier everyday with pets</span></span>\n      </a>\n      <nav class="main-nav" aria-label="Main navigation">\n        <a href="#dogs">For dogs</a>\n        <a href="#cats">For cats</a>\n        <a href="#blog">Blog</a>\n        <a href="#tools">Tools</a>\n      </nav>\n      <a class="header-cta" href="#tools">Explore the site <span aria-hidden="true">↗</span></a>\n      <button class="mobile-menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>\n    </div>\n    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">\n      <a href="#dogs">For dogs</a>\n      <a href="#cats">For cats</a>\n      <a href="#blog">Blog</a>\n      <a href="#tools">Tools</a>\n    </nav>\n  </header>\n\n  <main id="top">\n    <!-- DOG WORLD: first half of the vertically split homepage -->\n    <section class="world dog-world" id="dogs" data-mascot="dog" aria-labelledby="dogs-title">\n      <div class="world-inner">\n        <div class="art-wrap" aria-label="Animated dog mascot. Move your pointer anywhere in this section.">\n          <div class="art-halo" aria-hidden="true"></div>\n          <svg class="mascot" viewBox="0 0 420 330" role="img" aria-labelledby="dog-svg-title">\n            <title id="dog-svg-title">A friendly, floppy-eared cartoon dog</title>\n            <g class="dog-tail" fill="none" stroke="#946044" stroke-width="19" stroke-linecap="round"><path d="M285 267 Q354 293 365 231 Q371 202 348 194"/></g>\n            <ellipse cx="210" cy="292" rx="106" ry="15" fill="#715842" opacity=".10"/>\n            <g class="dog-ear left">\n              <path d="M119 103 C44 40 32 123 59 211 Q75 256 132 225 L160 142Z" fill="#986344"/>\n              <path d="M111 125 C75 91 65 141 85 198 Q98 228 127 206 L145 151Z" fill="#bc8561"/>\n            </g>\n            <g class="dog-ear right">\n              <path d="M301 103 C376 40 388 123 361 211 Q345 256 288 225 L260 142Z" fill="#986344"/>\n              <path d="M309 125 C345 91 355 141 335 198 Q322 228 293 206 L275 151Z" fill="#bc8561"/>\n            </g>\n            <g class="dog-head">\n              <path d="M210 48 C127 48 91 103 98 184 C104 267 149 292 210 292 C271 292 316 267 322 184 C329 103 293 48 210 48Z" fill="#d8a77e"/>\n              <path d="M109 190 C119 248 158 266 210 264 C262 266 301 248 311 190 C288 224 253 231 210 230 C167 231 132 224 109 190Z" fill="#e9c8a8"/>\n              <path d="M116 108 Q148 75 180 102" fill="none" stroke="#bf8d68" stroke-width="7" stroke-linecap="round" opacity=".55"/>\n              <path d="M304 108 Q272 75 240 102" fill="none" stroke="#bf8d68" stroke-width="7" stroke-linecap="round" opacity=".55"/>\n              <g class="dog-eye left"><ellipse cx="160" cy="157" rx="17" ry="21" fill="#fff9ef"/><g class="pupil"><ellipse cx="163" cy="158" rx="8" ry="12" fill="#49372d"/><circle cx="166" cy="153" r="3" fill="#fff"/></g></g>\n              <g class="dog-eye right"><ellipse cx="260" cy="157" rx="17" ry="21" fill="#fff9ef"/><g class="pupil"><ellipse cx="257" cy="158" rx="8" ry="12" fill="#49372d"/><circle cx="260" cy="153" r="3" fill="#fff"/></g></g>\n              <ellipse cx="210" cy="219" rx="48" ry="37" fill="#f4dfca"/>\n              <path d="M190 203 Q210 184 230 203 Q231 223 210 225 Q189 223 190 203Z" fill="#49372d"/>\n              <path d="M210 224 Q201 245 182 239 M210 224 Q219 245 238 239" fill="none" stroke="#654535" stroke-width="4" stroke-linecap="round"/>\n              <g class="dog-tongue"><path d="M192 241 Q210 235 228 241 L224 265 Q210 281 196 265Z" fill="#e77d8a"/><path d="M210 245 L210 263" stroke="#c65e70" stroke-width="2.5" stroke-linecap="round"/></g>\n              <path d="M135 208 Q111 206 97 216 M285 208 Q309 206 323 216" fill="none" stroke="#986344" stroke-width="3" stroke-linecap="round" opacity=".4"/>\n            </g>\n          </svg>\n        </div>\n        <div class="world-copy">\n          <div class="eyebrow">For the dog people</div>\n          <h1 id="dogs-title">More good days with your dog.</h1>\n          <p>Thoughtful gear, practical guides and clever little tools for walks, trips and everything in between.</p>\n          <div class="world-actions">\n            <a class="world-link" href="/dogs">Explore Dog World <span aria-hidden="true">→</span></a>\n            <span class="world-note">Made for every kind of good dog.</span>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <div class="bridge" aria-hidden="true"><span>Two worlds. One happy home.</span></div>\n\n    <!-- CAT WORLD: second half of the vertically split homepage -->\n    <section class="world cat-world" id="cats" data-mascot="cat" aria-labelledby="cats-title">\n      <div class="world-inner">\n        <div class="world-copy">\n          <div class="eyebrow">For the cat people</div>\n          <h2 id="cats-title">A little more purr in every day.</h2>\n          <p>Discover smart home setups, honest product comparisons and ideas that make life better for you and your cat.</p>\n          <div class="world-actions">\n            <a class="world-link" href="/cats">Explore Cat World <span aria-hidden="true">→</span></a>\n            <span class="world-note">For curious cats and their humans.</span>\n          </div>\n        </div>\n        <div class="art-wrap" aria-label="Animated cat mascot. Move your pointer anywhere in this section.">\n          <div class="art-halo" aria-hidden="true"></div>\n          <svg class="mascot" viewBox="0 0 420 330" role="img" aria-labelledby="cat-svg-title">\n            <title id="cat-svg-title">A curious cartoon cat with pointed ears</title>\n            <g class="cat-tail" fill="none" stroke="#7c91a0" stroke-width="17" stroke-linecap="round"><path d="M292 268 Q363 296 369 233 Q371 202 350 191"/></g>\n            <ellipse cx="210" cy="292" rx="106" ry="15" fill="#506575" opacity=".10"/>\n            <g class="cat-ear left"><path d="M103 142 L78 37 Q75 19 94 33 L180 101Z" fill="#8297a7" stroke="#647c8d" stroke-width="4"/><path d="M111 111 L96 57 L151 101Z" fill="#dca2a6"/></g>\n            <g class="cat-ear right"><path d="M317 142 L342 37 Q345 19 326 33 L240 101Z" fill="#8297a7" stroke="#647c8d" stroke-width="4"/><path d="M309 111 L324 57 L269 101Z" fill="#dca2a6"/></g>\n            <g class="cat-head">\n              <path d="M210 64 C131 58 94 112 99 193 C104 264 151 292 210 292 C269 292 316 264 321 193 C326 112 289 58 210 64Z" fill="#adbdc8"/>\n              <path d="M112 205 Q143 260 210 263 Q277 260 308 205 Q289 282 210 286 Q131 282 112 205Z" fill="#dce4e8"/>\n              <path d="M130 110 Q156 93 182 111 M290 110 Q264 93 238 111" fill="none" stroke="#8ea2b0" stroke-width="6" stroke-linecap="round" opacity=".65"/>\n              <g class="cat-eye left"><ellipse cx="160" cy="157" rx="18" ry="23" fill="#f5f1df"/><g class="pupil"><ellipse cx="162" cy="158" rx="6" ry="15" fill="#47665a"/><circle cx="165" cy="151" r="3" fill="#fff"/></g></g>\n              <g class="cat-eye right"><ellipse cx="260" cy="157" rx="18" ry="23" fill="#f5f1df"/><g class="pupil"><ellipse cx="258" cy="158" rx="6" ry="15" fill="#47665a"/><circle cx="261" cy="151" r="3" fill="#fff"/></g></g>\n              <ellipse cx="210" cy="222" rx="43" ry="30" fill="#e9e1e1"/>\n              <path d="M198 208 L222 208 L210 223Z" fill="#c77e91"/>\n              <path d="M210 223 Q201 240 184 233 M210 223 Q219 240 236 233" fill="none" stroke="#536b79" stroke-width="3.5" stroke-linecap="round"/>\n              <g class="whiskers" fill="none" stroke="#748896" stroke-width="3" stroke-linecap="round"><path d="M166 220 L91 205 M166 233 L94 238 M254 220 L329 205 M254 233 L326 238"/></g>\n              <path d="M126 190 Q139 184 151 191 M269 191 Q281 184 294 190" fill="none" stroke="#8a9eaa" stroke-width="3" stroke-linecap="round" opacity=".65"/>\n            </g>\n          </svg>\n        </div>\n      </div>\n    </section>\n\n    <section class="tools-section" id="tools" aria-labelledby="tools-title">\n      <div class="tools-inner">\n        <div class="section-kicker">Useful things, not endless lists</div>\n        <h2 id="tools-title">A little help for every pet parent.</h2>\n        <p class="section-intro">We\'re building practical tools that help you compare options, plan ahead and choose what actually fits your pet and your home.</p>\n        <div class="pet-tabs" role="group" aria-label="Choose the pet for tool ideas">\n          <button class="pet-tab" type="button" data-tab="dogs" aria-pressed="true">🐶 For dogs</button>\n          <button class="pet-tab" type="button" data-tab="cats" aria-pressed="false">🐱 For cats</button>\n          <button class="pet-tab" type="button" data-tab="both" aria-pressed="false">🐾 For both</button>\n        </div>\n        <div class="tool-grid" id="tool-grid" aria-live="polite">\n          <article class="tool-card"><div class="tool-icon" aria-hidden="true">📏</div><h3>Size & fit guide</h3><p>Check measurements for harnesses, carriers, crates and everyday gear.</p><span class="status-pill">In development</span></article>\n          <article class="tool-card"><div class="tool-icon" aria-hidden="true">🎒</div><h3>Travel checklist</h3><p>Build a practical packing list for road trips, walks and days out.</p><span class="status-pill">In development</span></article>\n          <article class="tool-card"><div class="tool-icon" aria-hidden="true">⚖️</div><h3>Gear comparison</h3><p>Compare features, care requirements and estimated ownership costs.</p><span class="status-pill">In development</span></article>\n        </div>\n      </div>\n    </section>\n  </main>\n\n  <footer class="site-footer">\n    <div class="footer-inner">\n      <div class="footer-brand">BuddyDays</div>\n      <div class="footer-copy">We\'re here to help people make thoughtful choices for the animals they love. Some future product links may be affiliate links; qualifying purchases may earn us a commission at no extra cost to you.</div>\n      <div class="footer-copy">© <span id="year">2026</span> BuddyDays. A concept homepage.</div>\n    </div>\n  </footer>';

// Split the approved reference markup so the interactive React blog can sit
// between Cat World and Tools without changing the original hero composition.
const MAIN_MARKER = '<main id="top">';
const TOOLS_MARKER = '<section class="tools-section"';
const MAIN_CLOSE_MARKER = "</main>";

const mainStart = HOMEPAGE_MARKUP.indexOf(MAIN_MARKER);
const toolsStart = HOMEPAGE_MARKUP.indexOf(TOOLS_MARKER);
const mainClose = HOMEPAGE_MARKUP.lastIndexOf(MAIN_CLOSE_MARKER);

if (mainStart < 0 || toolsStart < 0 || mainClose < 0) {
  throw new Error("BuddyDays homepage markup could not be split safely.");
}

const WORLDS_HTML = HOMEPAGE_MARKUP.slice(mainStart + MAIN_MARKER.length, toolsStart)
  .replace('<h1 id="dogs-title">', '<h2 id="dogs-title">')
  .replace("</h1>", "</h2>");

const rawToolsHtml = HOMEPAGE_MARKUP.slice(toolsStart, mainClose);
const baseToolsHtml = rawToolsHtml.replace(
  "We're building practical tools that help you compare options, plan ahead and choose what actually fits your pet and your home.",
  "Simple, practical tools to help you plan, measure and make informed everyday decisions for your pet.",
);
const gridStart = baseToolsHtml.indexOf('<div class="tool-grid" id="tool-grid" aria-live="polite">');
const gridEndMarker = "\n        </div>\n      </div>\n    </section>";
const gridEnd = baseToolsHtml.indexOf(gridEndMarker, gridStart);
if (gridStart < 0 || gridEnd < 0) {
  throw new Error("BuddyDays tools grid could not be located safely.");
}

const defaultToolGrid = `<div class="tool-grid" id="tool-grid" aria-live="polite">
          <article class="tool-card"><div class="tool-icon" aria-hidden="true">📏</div><h3>Pet Size Calculator</h3><p>Record your pet's measurements before choosing equipment.</p><a class="tool-card-action" href="/tools/pet-size-calculator">Open tool →</a></article>
          <article class="tool-card"><div class="tool-icon" aria-hidden="true">🎒</div><h3>Travel Checklist</h3><p>Build a practical packing list for a trip with your pet.</p><a class="tool-card-action" href="/tools/travel-checklist">Open tool →</a></article>
          <article class="tool-card"><div class="tool-icon" aria-hidden="true">🧮</div><h3>Pet Cost Calculator</h3><p>Estimate one-time and recurring pet ownership costs.</p><a class="tool-card-action" href="/tools/pet-cost-calculator">Open tool →</a></article>
`;

const TOOLS_HTML = baseToolsHtml.slice(0, gridStart) + defaultToolGrid + baseToolsHtml.slice(gridEnd);

type PetKind = "dogs" | "cats" | "both";

type ToolItem = readonly [icon: string, title: string, description: string, href: string];

const TOOL_CONTENT: Record<PetKind, readonly ToolItem[]> = {
  dogs: [
    [
      "📏",
      "Pet Size Calculator",
      "Record measurements before choosing harnesses, carriers and other equipment.",
      "/tools/pet-size-calculator",
    ],
    ["🎒", "Travel Checklist", "Build a practical packing list for a trip with your dog.", "/tools/travel-checklist"],
    ["🧮", "Pet Cost Calculator", "Estimate one-time and recurring costs for your pet.", "/tools/pet-cost-calculator"],
  ],
  cats: [
    [
      "📏",
      "Pet Size Calculator",
      "Record measurements before choosing carriers and other equipment.",
      "/tools/pet-size-calculator",
    ],
    ["🎒", "Travel Checklist", "Prepare a practical packing list for a trip with your cat.", "/tools/travel-checklist"],
    ["🧮", "Pet Cost Calculator", "Estimate one-time and recurring costs for your pet.", "/tools/pet-cost-calculator"],
  ],
  both: [
    ["📏", "Pet Size Calculator", "Record measurements before choosing pet equipment.", "/tools/pet-size-calculator"],
    ["🎒", "Travel Checklist", "Build a practical packing list for a trip with your pet.", "/tools/travel-checklist"],
    ["🧮", "Pet Cost Calculator", "Estimate one-time and recurring pet ownership costs.", "/tools/pet-cost-calculator"],
  ],
};

export function BuddyDaysHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const controller = new AbortController();
    const { signal } = controller;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animationFrames = new Set<number>();
    const resetTimers = new Set<number>();

    function setLook(area: HTMLElement, x: number, y: number) {
      const kind = area.dataset.mascot;
      area.querySelectorAll<SVGElement>(".pupil").forEach((pupil) => {
        pupil.setAttribute("transform", `translate(${(x * 6.5).toFixed(2)} ${(y * 5.5).toFixed(2)})`);
      });

      const head = area.querySelector<SVGElement>(kind === "dog" ? ".dog-head" : ".cat-head");
      if (head) {
        const rotation = x * (kind === "dog" ? 2.8 : 1.1);
        head.style.transform = `translate(${(x * 1.4).toFixed(2)}px, ${(y * 1.1).toFixed(2)}px) rotate(${rotation.toFixed(2)}deg)`;
      }

      if (kind === "dog") {
        const left = area.querySelector<SVGElement>(".dog-ear.left");
        const right = area.querySelector<SVGElement>(".dog-ear.right");
        if (left) left.style.transform = `rotate(${(-x * 5).toFixed(2)}deg)`;
        if (right) right.style.transform = `rotate(${(x * 5).toFixed(2)}deg)`;
      } else {
        const left = area.querySelector<SVGElement>(".cat-ear.left");
        const right = area.querySelector<SVGElement>(".cat-ear.right");
        if (left) left.style.transform = `rotate(${(x * 2.8).toFixed(2)}deg)`;
        if (right) right.style.transform = `rotate(${(-x * 2.8).toFixed(2)}deg)`;
      }
    }

    function resetLook(area: HTMLElement) {
      setLook(area, 0, 0);
    }

    if (!reduceMotion) {
      root.querySelectorAll<HTMLElement>(".world[data-mascot]").forEach((area) => {
        let frame = 0;
        let latest: { x: number; y: number } | null = null;

        area.addEventListener(
          "pointermove",
          (event: PointerEvent) => {
            if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
            const rect = area.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
            const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
            latest = { x, y };
            if (!frame) {
              frame = window.requestAnimationFrame(() => {
                if (latest) setLook(area, latest.x, latest.y);
                animationFrames.delete(frame);
                frame = 0;
              });
              animationFrames.add(frame);
            }
          },
          { signal },
        );

        area.addEventListener(
          "pointerleave",
          () => {
            latest = null;
            if (frame) {
              window.cancelAnimationFrame(frame);
              animationFrames.delete(frame);
            }
            frame = 0;
            resetLook(area);
          },
          { signal },
        );

        area.addEventListener(
          "pointerdown",
          (event: PointerEvent) => {
            if (event.pointerType !== "touch") return;
            const rect = area.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
            const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
            setLook(area, x, y);
            const timer = window.setTimeout(() => {
              resetLook(area);
              resetTimers.delete(timer);
            }, 850);
            resetTimers.add(timer);
          },
          { signal },
        );
      });
    }

    const grid = root.querySelector<HTMLElement>("#tool-grid");
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".pet-tab"));
    function renderTools(pet: PetKind) {
      if (!grid) return;
      grid.innerHTML = TOOL_CONTENT[pet]
        .map(
          ([icon, title, description, href]) => `
            <article class="tool-card">
              <div class="tool-icon" aria-hidden="true">${icon}</div>
              <h3>${title}</h3>
              <p>${description}</p>
              <a class="tool-card-action" href="${href}">Open tool →</a>
            </article>`,
        )
        .join("");
      tabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.tab === pet)));
    }

    tabs.forEach((tab) => {
      tab.addEventListener(
        "click",
        () => {
          const pet = tab.dataset.tab;
          if (pet === "dogs" || pet === "cats" || pet === "both") renderTools(pet);
        },
        { signal },
      );
    });

    root.querySelectorAll<HTMLAnchorElement>("[data-pet-choice]").forEach((link) => {
      link.addEventListener(
        "click",
        () => {
          const pet = link.dataset.petChoice;
          if (pet === "dogs" || pet === "cats" || pet === "both") renderTools(pet);
        },
        { signal },
      );
    });

    return () => {
      controller.abort();
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      resetTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div ref={rootRef} className="buddydays-reference-homepage">
      <main id="top">
        <section className={styles.hero} aria-labelledby="pet-worlds-title">
          <div className={styles.heroHeading}>
            <span className={styles.kicker}>A HAPPIER EVERYDAY WITH PETS</span>
            <h1 id="pet-worlds-title">Better days with dogs and cats.</h1>
            <p>Thoughtful guides, practical ideas and useful tools for the animals who make a house a home.</p>
          </div>
          <div className={styles.worldGrid} dangerouslySetInnerHTML={{ __html: WORLDS_HTML }} />
        </section>
        <LatestGuides />
        <div dangerouslySetInnerHTML={{ __html: TOOLS_HTML }} />
      </main>
    </div>
  );
}
