import { createPageMetadata } from "@/lib/seo/metadata";
import { emergencyHelpResources } from "@/config/emergency-help";

export const metadata = createPageMetadata(
  "Emergency Pet Help for Dogs & Cats",
  "Find emergency veterinary clinics, lower-cost pet-care resources, AAHA-accredited hospitals, and pet poison-control phone services in the United States.",
);

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export default function EmergencyPetHelpPage() {
  return (
    <main className="page-shell">
      <div className="content-layout stack">
        <p className="eyebrow">United States · Independent resources</p>
        <h1>Emergency Pet Help for Dogs &amp; Cats</h1>
        <p className="lead">
          Use these established third-party services to search for nearby emergency veterinary care, find financially
          friendly pet-care resources, or contact an animal poison-control service.
        </p>

        <section className="stack" aria-labelledby="emergency-vet-title">
          <h2 id="emergency-vet-title">Find an emergency veterinarian nearby</h2>
          <div className="surface stack">
            <p>
              Search Google Maps for emergency veterinary clinics near your current location or another address. Google
              Maps handles location permissions and search results; BuddyDays does not receive your precise location
              through this link.
            </p>
            <p>
              <a
                className="button button-primary"
                href={emergencyHelpResources.googleMapsSearchUrl}
                {...externalLinkProps}
              >
                Search emergency vets on Google Maps ↗
              </a>
            </p>
            <p className="muted">
              Search listings can be incomplete or out of date. Call the clinic before traveling to confirm that it is
              open, accepts your pet, and can provide the care you need.
            </p>
          </div>
        </section>

        <section className="stack" aria-labelledby="affordable-care-title">
          <h2 id="affordable-care-title">Find affordable veterinary care</h2>
          <div className="surface stack">
            <p>
              Pet Help Finder, operated by the nonprofit Open Door Veterinary Collective, helps pet owners search for
              financially friendly veterinary care and other local support, such as pet food and supplies.
            </p>
            <p>
              <a
                className="button button-secondary"
                href={emergencyHelpResources.petHelpFinderUrl}
                {...externalLinkProps}
              >
                Search Pet Help Finder ↗
              </a>
            </p>
            <p className="muted">
              Some listed programs may be free, while others offer reduced-cost or payment options. Availability, fees,
              and eligibility vary by location and provider. This directory is not a substitute for emergency care.
            </p>
          </div>
        </section>

        <section className="stack" aria-labelledby="aaha-title">
          <h2 id="aaha-title">Search AAHA-accredited hospitals</h2>
          <div className="surface stack">
            <p>
              The AAHA hospital locator lets you search accredited practices and apply filters such as Emergency and
              Critical Care and Open 24/7.
            </p>
            <p>
              <a
                className="button button-secondary"
                href={emergencyHelpResources.aahaHospitalLocatorUrl}
                {...externalLinkProps}
              >
                Open AAHA hospital locator ↗
              </a>
            </p>
            <p className="muted">
              The directory includes AAHA-accredited practices only. It is not a complete list of all emergency
              veterinary hospitals.
            </p>
          </div>
        </section>

        <section className="stack" aria-labelledby="poison-control-title">
          <h2 id="poison-control-title">Suspected pet poisoning: call for help</h2>
          <div className="surface stack">
            <p>
              If you suspect your pet has been exposed to a poisonous substance, contact your veterinarian or an
              emergency animal hospital promptly. The following U.S. poison-control services are available by phone 24
              hours a day, every day of the year.
            </p>
            <div className="product-grid">
              <div className="surface stack">
                <h3>{emergencyHelpResources.aspcaPoisonControl.name}</h3>
                <p className="muted">Consultation fee may apply.</p>
                <a className="button button-primary" href={emergencyHelpResources.aspcaPoisonControl.phoneUrl}>
                  Call {emergencyHelpResources.aspcaPoisonControl.displayPhone}
                </a>
                <a
                  className="text-link"
                  href={emergencyHelpResources.aspcaPoisonControl.websiteUrl}
                  {...externalLinkProps}
                >
                  Service details ↗
                </a>
              </div>
              <div className="surface stack">
                <h3>{emergencyHelpResources.petPoisonHelpline.name}</h3>
                <p className="muted">A consultation fee applies; check the current fee with the provider.</p>
                <a className="button button-primary" href={emergencyHelpResources.petPoisonHelpline.phoneUrl}>
                  Call {emergencyHelpResources.petPoisonHelpline.displayPhone}
                </a>
                <a
                  className="text-link"
                  href={emergencyHelpResources.petPoisonHelpline.websiteUrl}
                  {...externalLinkProps}
                >
                  Service details ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <aside className="surface stack" aria-labelledby="important-note-title">
          <h2 id="important-note-title">Important</h2>
          <p>
            BuddyDays is an informational website, not a veterinary provider. We do not diagnose conditions, provide
            treatment instructions, or operate any of the services linked above. For an urgent or potentially
            life-threatening situation, call your veterinarian or a local emergency animal hospital now rather than
            waiting for an online response.
          </p>
          <p className="muted">
            Read the U.S. Food and Drug Administration&apos;s guidance:{" "}
            <a className="text-link" href={emergencyHelpResources.fdaEmergencyGuidanceUrl} {...externalLinkProps}>
              Who do you call if you have a pet emergency? ↗
            </a>
          </p>
        </aside>
      </div>
    </main>
  );
}
