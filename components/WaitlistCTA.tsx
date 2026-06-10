"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      /* Replace with real endpoint when available */
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        .waitlist-cta {
          background-color: var(--color-primary);
          color: var(--color-bg);
          padding: var(--space-xxl) var(--space-xl);
        }

        .waitlist-cta__inner {
          max-width: 36rem;
          margin-inline: auto;
          text-align: center;
        }

        .waitlist-cta__headline {
          font-family: var(--font-display);
          font-size: var(--type-h2);
          font-weight: 600;
          line-height: 1.15;
          color: var(--color-bg);
          margin: 0 0 var(--space-md) 0;
        }

        .waitlist-cta__form {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          align-items: center;
        }

        .waitlist-cta__field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xxs);
          width: 100%;
          max-width: 24rem;
        }

        .waitlist-cta__label {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          color: var(--color-bg);
          text-align: left;
        }

        .waitlist-cta__input {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 400;
          line-height: 1.5;
          color: var(--color-text);
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-s);
          padding: 0.625rem 0.875rem;
          min-height: 44px;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
        }

        .waitlist-cta__input:focus-visible {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px var(--color-accent);
        }

        .waitlist-cta__input--error {
          border-color: #b91c1c;
          box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.25);
        }

        .waitlist-cta__helper {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          font-weight: 400;
          color: var(--color-bg);
          opacity: 0.6;
          margin: 0;
          text-align: left;
        }

        .waitlist-cta__error {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          font-weight: 400;
          color: #fca5a5;
          margin: 0;
          text-align: left;
        }

        .waitlist-cta__button {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--color-primary);
          background-color: var(--color-bg);
          border: none;
          border-radius: var(--radius-m);
          padding: 0.625rem 2rem;
          min-height: 44px;
          cursor: pointer;
          transition: opacity 0.15s ease-out, transform 0.1s ease-out;
          width: 100%;
          max-width: 24rem;
        }

        .waitlist-cta__button:hover {
          opacity: 0.9;
        }

        .waitlist-cta__button:active {
          transform: scale(0.98);
        }

        .waitlist-cta__button:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }

        .waitlist-cta__button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .waitlist-cta__success {
          font-family: var(--font-body);
          font-size: var(--type-md);
          font-weight: 400;
          line-height: 1.65;
          color: var(--color-bg);
          margin: 0;
        }

        @media (max-width: 479px) {
          .waitlist-cta {
            padding: var(--space-xl) var(--space-sm);
          }

          .waitlist-cta__headline {
            font-size: var(--type-lg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .waitlist-cta__button {
            transition: none;
          }

          .waitlist-cta__input {
            transition: none;
          }
        }
      `}</style>

      <section className="waitlist-cta" aria-labelledby="waitlist-cta-heading">
        <div className="waitlist-cta__inner">
          <h2 className="waitlist-cta__headline" id="waitlist-cta-heading">
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
                <label className="waitlist-cta__label" htmlFor="waitlist-email">
                  Email address
                </label>
                <input
                  className={`waitlist-cta__input${
                    status === "error" ? " waitlist-cta__input--error" : ""
                  }`}
                  id="waitlist-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-describedby={
                    status === "error"
                      ? "waitlist-error"
                      : "waitlist-helper"
                  }
                  aria-invalid={status === "error"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMsg("");
                    }
                  }}
                  disabled={status === "loading"}
                />
                {status === "error" && errorMsg ? (
                  <p
                    className="waitlist-cta__error"
                    id="waitlist-error"
                    role="alert"
                  >
                    {errorMsg}
                  </p>
                ) : (
                  <p className="waitlist-cta__helper" id="waitlist-helper">
                    One launch email. Nothing else.
                  </p>
                )}
              </div>

              <button
                className="waitlist-cta__button"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending\u2026" : "Hold My Spot"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
