"use client";
import { useState, type FormEvent } from "react";
import { calculateOwnershipCost } from "../logic/calculate-cost";

export function CostCalculatorForm() {
  const [initial, setInitial] = useState("40");
  const [recurring, setRecurring] = useState("8");
  const [interval, setInterval] = useState("30");
  const [period, setPeriod] = useState("365");
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setTotal(calculateOwnershipCost({ initialCost: Number(initial), recurringCost: Number(recurring), recurringIntervalDays: Number(interval), periodDays: Number(period) }));
      setError("");
    } catch (caught) { setTotal(null); setError(caught instanceof Error ? caught.message : "Check the entered values."); }
  }
  return <form className="tool-form" onSubmit={submit}>
    <label>Initial cost ($)<input type="number" min="0" step="0.01" value={initial} onChange={(e) => setInitial(e.target.value)} /></label>
    <label>Recurring cost ($)<input type="number" min="0" step="0.01" value={recurring} onChange={(e) => setRecurring(e.target.value)} /></label>
    <label>Repeat every (days)<input type="number" min="1" step="1" value={interval} onChange={(e) => setInterval(e.target.value)} /></label>
    <label>Period (days)<input type="number" min="0" step="1" value={period} onChange={(e) => setPeriod(e.target.value)} /></label>
    <button className="button button-primary" type="submit">Calculate</button>
    {error ? <p role="alert" className="form-error">{error}</p> : null}
    {total !== null ? <output className="result-total">Estimated total: ${total.toFixed(2)}</output> : null}
    <p className="muted">Estimate based only on values entered. This is not a live store price or veterinary estimate.</p>
  </form>;
}
