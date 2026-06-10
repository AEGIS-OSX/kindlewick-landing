"use client";
import { useState, useId, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

type Action =
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; message: string }
  | { type: "RESET" };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SUBMIT":
      return { status: "loading" };
    case "SUCCESS":
      return { status: "success" };
    case "ERROR":
      return { status: "error", message: action.message };
    case "RESET":
      return { status: "idle" };
    default:
      return state;
  }
}

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address.";
  return null;
}

export function WaitlistCTA() {
  const emailId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, { status: "idle" });

  const inlineError = touched ? validateEmail(email) : null;
  const isLoading = formState.status === "loading";
  const isSuccess = formState.status === "success";
  const isServerError = formState.status === "error";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const validationError = validateEmail(email);
    if (validationError) return;

    dispatch({ type: "SUBMIT" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        dispatch({
          type: "ERROR",
          message: data.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      dispatch({ type: "SUCCESS" });
    } catch {
      dispatch({
        type: "ERROR",
        message: "Could not connect. Please check your connection and try again.",
      });
    }
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-heading"
      className="bg-[var(--color-primary)] py-[var(--space-xxl)] px-[var(--space-xs)] sm:px-[var(--space-md)]"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--color-accent)] font-[family-name:var(--font-body)] text-[length:var(--type-xs)] tracking-[0.1em] uppercase mb-[var(--space-sm)]"
        >
          Join the Waitlist
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="waitlist-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-[family-name:var(--font-display)] text-[var(--color-bg)] text-[length:var(--type-h2)] leading-[1.1] font-semibold mb-[var(--space-lg)]"
        >
          First flame goes to the list.
        </motion.h2>

        {/* Form / Success swap */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              aria-live="polite"
              className="flex flex-col gap-[var(--space-sm)]"
            >
              <p className="font-[family-name:var(--font-body)] text-[var(--color-bg)] text-[length:var(--type-md)] leading-[1.6]">
                Thanks, you are on the list. We will email at launch.
              </p>
              <a
                href="https://www.instagram.com/kindlewickcandles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[var(--space-xxs)] font-[family-name:var(--font-body)] font-medium text-[length:var(--type-sm)] text-[var(--color-bg)] underline underline-offset-4 decoration-[var(--color-accent)] hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg)]"
              >
                Follow us on Instagram
              </a>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Waitlist sign-up form"
              className="flex flex-col gap-[var(--space-xs)]"
            >
              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-[var(--space-xxs)]">
                <div className="flex flex-col flex-1 gap-[var(--space-xxs)]">
                  <label
                    htmlFor={emailId}
                    className="font-[family-name:var(--font-body)] text-[var(--color-bg)] text-[length:var(--type-xs)] opacity-80"
                  >
                    Email address
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!touched) setTouched(true);
                    }}
                    onBlur={() => setTouched(true)}
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={inlineError !== null ? "true" : "false"}
                    aria-describedby={
                      inlineError
                        ? errorId
                        : isServerError
                        ? errorId
                        : undefined
                    }
                    placeholder="you@example.com"
                    className=[
                      "h-11 min-h-[44px] w-full px-[var(--space-xs)] rounded-[var(--radius-m)]",
                      "bg-[rgba(247,243,232,0.08)] border border-[rgba(247,243,232,0.2)]",
                      "font-[family-name:var(--font-body)] text-[var(--color-bg)] text-[length:var(--type-sm)] placeholder:text-[var(--color-bg)] placeholder:opacity-40",
                      "transition-colors duration-200",
                      "focus:outline-none focus:border-[var(--color-bg)] focus:bg-[rgba(247,243,232,0.12)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      inlineError ? "border-[var(--color-accent)]" : "",
                    ].join(" ")
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  className=[
                    "self-end h-11 min-h-[44px] px-[var(--space-md)] rounded-[var(--radius-m)]",
                    "bg-[var(--color-bg)] text-[var(--color-primary)]",
                    "font-[family-name:var(--font-body)] font-medium text-[length:var(--type-sm)] tracking-[0.02em]",
                    "transition-opacity duration-200 hover:opacity-90",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "whitespace-nowrap",
                  ].join(" ")
                >
                  {isLoading ? (
                    <span className="flex items-center gap-[var(--space-xxs)]" aria-label="Submitting">
                      <svg
                        className="animate-spin h-4 w-4 text-[var(--color-primary)]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Saving…</span>
                    </span>
                  ) : (
                    "Hold My Spot"
                  )}
                </button>
              </div>

              {/* Inline validation / server error */}
              <AnimatePresence>
                {(inlineError || isServerError) && (
                  <motion.p
                    key="error"
                    id={errorId}
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="font-[family-name:var(--font-body)] text-[var(--color-accent)] text-[length:var(--type-xs)] leading-[1.5]"
                  >
                    {inlineError ??
                      (formState.status === "error" ? formState.message : "")}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Helper microcopy */}
              {!inlineError && !isServerError && (
                <p className="font-[family-name:var(--font-body)] text-[var(--color-bg)] text-[length:var(--type-xs)] opacity-50">
                  One launch email. Nothing else.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
