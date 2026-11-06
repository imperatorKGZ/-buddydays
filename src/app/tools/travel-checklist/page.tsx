import { TravelChecklist } from "@/features/travel-planner/components/travel-checklist";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata("Pet Travel Checklist", "A practical travel packing checklist for pets.");
export default function TravelChecklistPage() { return <main className="page-shell"><p className="eyebrow">BuddyDays planner</p><h1>Prepare for a trip with your pet.</h1><p>Use this general checklist, then verify destination, airline, lodging, and carrier requirements.</p><TravelChecklist/></main>; }
