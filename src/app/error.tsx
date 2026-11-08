"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="page-shell">
      <p className="eyebrow">Something went wrong</p>
      <h1>We hit a snag.</h1>
      <p>Try again, or return to the BuddyDays homepage.</p>
      <button className="button button-primary" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
