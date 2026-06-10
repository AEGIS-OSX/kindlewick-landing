"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="waitlist-cta" aria-labelledby="waitlist-heading">
      <div className="waitlist-cta__inner">
        <h2 id="waitlist-heading" className="waitlist-cta__heading">
          First flame goes to the list.
        </h2>

        {status === "success" ? (
          <p className="waitlist-cta__success" role="status">
            Thanks, you are on the list. We will email at launch.
          </p>
        ) : (
          <form
            className="waitlist-cta__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="waitlist-cta__field">
              <label
                htmlFor="waitlist-email"
                className="waitlist-cta__label"
              >
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                className="waitlist-cta__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                aria-describedby="waitlist-helper waitlist-error"
                aria-invalid={status === "error"}
                autoComplete="email"
                required
              />
            </div>

            <p id="waitlist-helper" className="waitlist-cta__helper">
              One launch email. Nothing else.
            </p>

            {status === "error" && errorMsg && (
              <p
                id="waitlist-error"
                className="waitlist-cta__error"
                role="alert"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="waitlist-cta__button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending\u2026" : "Hold My Spot"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .waitlist-cta {
          background-color: var(--color-primary);
          color: var(--color-bg);
          padding: var(--space-xxl) var(--space-md);
        }

        .waitlist-cta__inner {
          max-width: 480px;
          margin: 0 auto;
          text-align: center;
        }

        .waitlist-cta__heading {
          font-family: var(--font-display);
          font-size: var(--type-h2);
          font-weight: 600;
          line-height: 1.15;
          margin: 0 0 var(--space-md);
          color: var(--color-bg);
        }

        .waitlist-cta__form {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .waitlist-cta__field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xxs);
          text-align: left;
        }

        .waitlist-cta__label {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          color: var(--color-bg);
        }

        .waitlist-cta__input {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          padding: var(--space-xxs) var(--space-xs);
          min-height: 44px;
          border: 1px solid var(--color-bg);
          border-radius: var(--radius-s);
          background: transparent;
          color: var(--color-bg);
          outline: none;
          transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;
        }

        .waitlist-cta__input:focus-visible {
          border-color: var(--color-bg);
          box-shadow: 0 0 0 2px var(--color-bg);
        }

        .waitlist-cta__input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waitlist-cta__input[aria-invalid="true"] {
          border-color: #fca5a5;
          box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.25);
        }

        .waitlist-cta__helper {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          color: var(--color-muted);
          margin: 0;
          text-align: left;
        }

        .waitlist-cta__error {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          color: #fca5a5;
          margin: 0;
          text-align: left;
        }

        .waitlist-cta__button {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          letter-spacing: 0.02em;
          min-height: 44px;
          padding: var(--space-xxs) var(--space-md);
          border: none;
          border-radius: var(--radius-m);
          background-color: var(--color-bg);
          color: var(--color-primary);
          cursor: pointer;
          transition: opacity 0.2s ease-out;
        }

        .waitlist-cta__button:hover:not(:disabled) {
          opacity: 0.9;
        }

        .waitlist-cta__button:focus-visible {
          outline: 2px solid var(--color-bg);
          outline-offset: 2px;
        }

        .waitlist-cta__button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waitlist-cta__success {
          font-family: var(--font-body);
          font-size: var(--type-md);
          color: var(--color-bg);
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
