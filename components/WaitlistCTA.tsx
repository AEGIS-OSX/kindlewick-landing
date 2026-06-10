"use client";

import { useState } from "react";

type FormState = "default" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState<string>("");
  const [formState, setFormState] = useState<FormState>("default");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setFormState("error");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setFormState("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  const isLoading = formState === "loading";
  const isSuccess = formState === "success";
  const isError = formState === "error";

  return (
    <section
      aria-labelledby="waitlist-heading"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-bg)",
        padding: "var(--space-xxl) var(--space-xs)",
      }}
    >
      <style>{`
        .wl-inner {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
        }

        .wl-heading {
          font-family: var(--font-display);
          font-size: var(--type-h2);
          font-weight: 600;
          line-height: 1.15;
          color: var(--color-bg);
          margin: 0 0 var(--space-sm);
        }

        .wl-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          align-items: stretch;
        }

        .wl-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xxs);
          text-align: left;
        }

        .wl-label {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          color: var(--color-bg);
          letter-spacing: 0.02em;
        }

        .wl-input {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 400;
          color: var(--color-text);
          background-color: var(--color-bg);
          border: 1px solid transparent;
          border-radius: var(--radius-s);
          padding: 12px var(--space-xs);
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
        }

        .wl-input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(200, 106, 58, 0.25);
        }

        .wl-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .wl-helper {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          font-weight: 400;
          color: var(--color-bg);
          opacity: 0.7;
          margin: 0;
          text-align: center;
        }

        .wl-button {
          font-family: var(--font-body);
          font-size: var(--type-sm);
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--color-bg);
          background-color: var(--color-accent);
          border: none;
          border-radius: var(--radius-m);
          min-height: 44px;
          padding: 0 var(--space-md);
          cursor: pointer;
          transition: opacity 0.15s ease-out, transform 0.1s ease-out;
          width: 100%;
        }

        .wl-button:hover:not(:disabled) {
          opacity: 0.88;
        }

        .wl-button:active:not(:disabled) {
          transform: translateY(1px);
        }

        .wl-button:focus-visible {
          outline: 2px solid var(--color-bg);
          outline-offset: 3px;
        }

        .wl-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .wl-success {
          font-family: var(--font-body);
          font-size: var(--type-md);
          font-weight: 400;
          color: var(--color-bg);
          margin: 0;
          padding: var(--space-sm) 0;
        }

        .wl-error {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          font-weight: 400;
          color: var(--color-accent);
          margin: 0;
          text-align: center;
        }

        @media (min-width: 480px) {
          .wl-form {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-end;
          }

          .wl-field {
            flex: 1 1 260px;
          }

          .wl-button {
            flex: 0 0 auto;
            width: auto;
          }

          .wl-helper,
          .wl-error {
            flex: 1 1 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wl-input,
          .wl-button {
            transition: none;
          }
        }
      `}</style>

      <div className="wl-inner">
        <h2 id="waitlist-heading" className="wl-heading">
          First flame goes to the list.
        </h2>

        {isSuccess ? (
          <p className="wl-success" role="status">
            Thanks, you are on the list. We will email at launch.
          </p>
        ) : (
          <form
            className="wl-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Waitlist signup"
          >
            <div className="wl-field">
              <label htmlFor="waitlist-email" className="wl-label">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                name="email"
                className="wl-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isError) {
                    setFormState("default");
                    setErrorMessage("");
                  }
                }}
                autoComplete="email"
                required
                disabled={isLoading}
                aria-describedby="waitlist-helper waitlist-error"
                aria-invalid={isError ? "true" : undefined}
              />
            </div>

            <button
              type="submit"
              className="wl-button"
              disabled={isLoading}
              aria-busy={isLoading ? "true" : undefined}
            >
              {isLoading ? "Joining\u2026" : "Hold My Spot"}
            </button>

            <p id="waitlist-helper" className="wl-helper">
              One launch email. Nothing else.
            </p>

            {isError && errorMessage && (
              <p id="waitlist-error" className="wl-error" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
