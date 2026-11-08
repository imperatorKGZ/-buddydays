"use client";
import { useState, type FormEvent } from "react";
import { validateDimensions } from "../logic/validate-dimensions";
export function SizeCalculatorForm() {
  const [values, setValues] = useState({ lengthInches: "", widthInches: "", heightInches: "", weightPounds: "" });
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = {
      lengthInches: Number(values.lengthInches),
      widthInches: Number(values.widthInches),
      heightInches: Number(values.heightInches),
      ...(values.weightPounds ? { weightPounds: Number(values.weightPounds) } : {}),
    };
    setMessage(
      validateDimensions(input)
        ? "Measurements recorded. Compare them with the exact manufacturer's sizing chart."
        : "Enter positive measurements for all required dimensions.",
    );
  }
  return (
    <form className="tool-form" onSubmit={submit}>
      {(["lengthInches", "widthInches", "heightInches", "weightPounds"] as const).map((key) => (
        <label key={key}>
          {key.replace("Inches", " (in)").replace("Pounds", " (lb)")}
          <input
            type="number"
            min="0.1"
            step="0.1"
            required={key !== "weightPounds"}
            value={values[key]}
            onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
          />
        </label>
      ))}
      <button className="button button-primary" type="submit">
        Check measurements
      </button>
      {message ? (
        <p role="status" className="muted">
          {message}
        </p>
      ) : null}
      <p className="muted">This tool records measurements; it does not claim universal product-size compatibility.</p>
    </form>
  );
}
