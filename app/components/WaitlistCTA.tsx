"use client";

import { useReducer, useId, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── state machine ─────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

interface State {
  status: Status;
  email: string;
  errorMsg: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload, errorMsg: "" };
    case "SUBMIT":
      return { ...state, status: "loading", errorMsg: "" };
    case "SUCCESS":
      return { ...state, status: "success" };
    case "ERROR":
      return { ...state, status: "error", errorMsg: action.payload };
    case "RESET":
      return { status: "idle", email: "", errorMsg: "" };
    default:
      return state;
  }
}

const initial: State = { status: "idle", email: "", errorMsg: "" };

/* ── animation variants ────────────────────────────────── */
const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: "easeOut" } },
};

/* ── component ─────────────────────────────────────────── */
export function WaitlistCTA() {
  const [state, dispatch] = useReducer(reducer, initial);
  const emailId = useId();
  const helperId = useId();
  const errorId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = state.email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      dispatch({ type: "ERROR", payload: "Please enter a valid email address." });
      return;
    }

    dispatch({ type: "SUBMIT" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error("Request failed");
      dispatch({ type: "SUCCESS" });
    } catch {
      dispatch({ type: "ERROR", payload: "Something went wrong. Please try again." });
    }
  }

  const isLoading = state.status === "loading";

  return (
    <section
      className="bg-[var(--color-primary)] text-[var(--color-bg)] py-[var(--space-xxl)] px-[var(--space-md)]"
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-[480px] text-center">
        <h2
          id="waitlist-heading"
          className="font-[var(--font-display)] text-[var(--type-h2)] font-semibold leading-[1.15] mb-[var(--space-md)] text-[var(--color-bg)]"
        >
          First flame goes to the list.
        </h2>

        <AnimatePresence mode="wait">
          {state.status === "success" ? (
            <motion.p
              key="success"
              {...fade}
              role="status"
              className="font-[var(--font-body)] text-[var(--type-md)] text-[var(--color-bg)] leading-relaxed"
            >
              Thanks, you are on the list. We will email at launch.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              {...fade}
              className="flex flex-col gap-[var(--space-xs)]"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex flex-col gap-[var(--space-xxs)] text-left">
                <label
                  htmlFor={emailId}
                  className="font-[var(--font-body)] text-[var(--type-sm)] font-medium text-[var(--color-bg)]"
                >
                  Email address
                </label>
                <input
                  id={emailId}
                  type="email"
                  value={state.email}
                  onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                  disabled={isLoading}
                  aria-describedby={`${helperId} ${errorId}`}
                  aria-invalid={state.status === "error"}
                  autoComplete="email"
                  required
                  className={[
                    "font-[var(--font-body)] text-[var(--type-sm)]",
                    "px-[var(--space-xs)] py-[var(--space-xxs)] min-h-[44px]",
                    "border border-[var(--color-bg)] rounded-[var(--radius-s)]",
                    "bg-transparent text-[var(--color-bg)] outline-none",
                    "transition-[border-color,box-shadow] duration-200 ease-out",
                    "focus-visible:shadow-[0_0_0_2px_var(--color-bg)]",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    state.status === "error"
                      ? "border-[#fca5a5] shadow-[0_0_0_2px_rgba(185,28,28,0.25)]"
                      : "",
                  ].join(" ")}
                />
              </div>

              <p
                id={helperId}
                className="font-[var(--font-body)] text-[var(--type-xs)] text-[var(--color-muted)] text-left m-0"
              >
                One launch email. Nothing else.
              </p>

              <AnimatePresence>
                {state.status === "error" && state.errorMsg && (
                  <motion.p
                    {...fade}
                    id={errorId}
                    role="alert"
                    className="font-[var(--font-body)] text-[var(--type-xs)] text-[#fca5a5] text-left m-0"
                  >
                    {state.errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className={[
                  "font-[var(--font-body)] text-[var(--type-sm)] font-medium tracking-[0.02em]",
                  "min-h-[44px] px-[var(--space-md)] py-[var(--space-xxs)]",
                  "border-none rounded-[var(--radius-m)]",
                  "bg-[var(--color-bg)] text-[var(--color-primary)] cursor-pointer",
                  "transition-opacity duration-200 ease-out",
                  "hover:enabled:opacity-90",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-bg)] focus-visible:outline-offset-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {isLoading ? "Sending\u2026" : "Hold My Spot"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
