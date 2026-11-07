"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { emergencyHelpResources } from "@/config/emergency-help";
import styles from "./emergency-pet-help.module.css";

export function EmergencyPetHelp() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterNear, setIsFooterNear] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsFooterNear(false);

    const footer = document.querySelector<HTMLElement>("footer.site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nearFooter = entry.isIntersecting;
        setIsFooterNear(nearFooter);
        if (nearFooter) setIsOpen(false);
      },
      { rootMargin: "0px 0px 96px 0px", threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown, true);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen]);

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  if (isFooterNear) return null;

  return (
    <div className={styles.root} ref={rootRef}>
      {isOpen ? (
        <section
          id="emergency-pet-help-dialog"
          className={styles.panel}
          role="dialog"
          aria-labelledby="emergency-pet-help-title"
          aria-describedby="emergency-pet-help-description"
        >
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>A practical starting point</p>
              <h2 className={styles.title} id="emergency-pet-help-title">
                Emergency Pet Help
              </h2>
            </div>
            <button
              className={styles.closeButton}
              type="button"
              onClick={closePanel}
              ref={closeRef}
              aria-label="Close emergency pet help"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <p className={styles.intro} id="emergency-pet-help-description">
            Find independent services that can help you locate veterinary care or contact a poison-control specialist.
          </p>

          <div className={styles.resourceList}>
            <section className={styles.resource} aria-labelledby="emergency-vet-heading">
              <h3 id="emergency-vet-heading">Emergency vet near you</h3>
              <p>Search Google Maps for nearby emergency veterinary clinics.</p>
              <a
                className={styles.resourceLink}
                href={emergencyHelpResources.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Search nearby clinics <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className={styles.resource} aria-labelledby="affordable-care-heading">
              <h3 id="affordable-care-heading">Affordable pet care</h3>
              <p>Find financially friendly veterinary care and other local pet-support resources.</p>
              <a
                className={styles.resourceLink}
                href={emergencyHelpResources.petHelpFinderUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Pet Help Finder <span aria-hidden="true">↗</span>
              </a>
              <p className={styles.smallNote}>Some programs are free; others have fees or eligibility requirements.</p>
            </section>

            <section className={styles.resource} aria-labelledby="aaha-heading">
              <h3 id="aaha-heading">AAHA-accredited hospitals</h3>
              <p>Search accredited practices and use the Emergency and Critical Care or Open 24/7 filters.</p>
              <a
                className={styles.resourceLink}
                href={emergencyHelpResources.aahaHospitalLocatorUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open AAHA hospital locator <span aria-hidden="true">↗</span>
              </a>
              <p className={styles.smallNote}>This directory includes AAHA-accredited practices, not every emergency hospital.</p>
            </section>

            <section className={styles.resource} aria-labelledby="poison-control-heading">
              <h3 id="poison-control-heading">Suspected poisoning</h3>
              <p>Contact a poison-control service by phone. Consultation fees apply.</p>
              <div className={styles.phoneLinks}>
                <a href={emergencyHelpResources.aspcaPoisonControl.phoneUrl}>
                  <span>{emergencyHelpResources.aspcaPoisonControl.name}</span>
                  <strong>{emergencyHelpResources.aspcaPoisonControl.displayPhone}</strong>
                </a>
                <a href={emergencyHelpResources.petPoisonHelpline.phoneUrl}>
                  <span>{emergencyHelpResources.petPoisonHelpline.name}</span>
                  <strong>{emergencyHelpResources.petPoisonHelpline.displayPhone}</strong>
                </a>
              </div>
              <p className={styles.smallNote}>
                <a href={emergencyHelpResources.aspcaPoisonControl.websiteUrl} target="_blank" rel="noopener noreferrer">ASPCA details</a>
                {" · "}
                <a href={emergencyHelpResources.petPoisonHelpline.websiteUrl} target="_blank" rel="noopener noreferrer">Pet Poison Helpline details</a>
              </p>
            </section>
          </div>

          <p className={styles.disclaimer}>
            BuddyDays is not a veterinary provider and does not offer diagnosis or medical advice. For an urgent situation, call your veterinarian or a local emergency animal hospital now. Call ahead to confirm availability.
          </p>
          <div className={styles.panelFooter}>
            <a
              href={emergencyHelpResources.fdaEmergencyGuidanceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              FDA emergency guidance <span aria-hidden="true">↗</span>
            </a>
            <Link href="/emergency-pet-help" prefetch={false} onClick={() => setIsOpen(false)}>
              Full resource guide <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      ) : null}

      <button
        className={styles.trigger}
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "emergency-pet-help-dialog" : undefined}
        aria-label="Emergency Pet Help"
        title="Emergency Pet Help"
      >
        <svg className={styles.triggerIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="7.2" cy="7.1" r="2.05" fill="currentColor" />
          <circle cx="16.8" cy="7.1" r="2.05" fill="currentColor" />
          <circle cx="4.8" cy="12.1" r="1.8" fill="currentColor" />
          <circle cx="19.2" cy="12.1" r="1.8" fill="currentColor" />
          <path
            d="M12 11.7c-2.7 0-5.25 3.15-5.25 5.65 0 1.55 1.05 2.55 2.65 2.55.95 0 1.8-.43 2.6-.43s1.65.43 2.6.43c1.6 0 2.65-1 2.65-2.55 0-2.5-2.55-5.65-5.25-5.65Z"
            fill="currentColor"
          />
        </svg>
        <span className={styles.triggerLabel}>Emergency Pet Help</span>
      </button>
    </div>
  );
}
