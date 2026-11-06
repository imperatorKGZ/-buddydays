"use client";
import { useState } from "react";
const items = ["Food and water", "Travel-safe carrier or restraint", "Leash or harness", "Waste bags or litter supplies", "Medication and care items", "Identification and trip documents"];
export function TravelChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  return <div className="surface checklist"><p className="muted">General checklist. Verify destination, airline, lodging, and carrier rules before travel.</p>
    {items.map((item) => <label className="check-row" key={item}><input type="checkbox" checked={checked.includes(item)} onChange={(event) => setChecked((current) => event.target.checked ? [...current, item] : current.filter((entry) => entry !== item))}/><span>{item}</span></label>)}
    <p className="muted">{checked.length} of {items.length} completed</p>
  </div>;
}
