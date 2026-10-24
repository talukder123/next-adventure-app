"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) return;
        setEmail("");
        setSubscribed(true);
      }}
      className="mt-4 max-w-[320px]"
    >
      <div className="flex items-center gap-2 rounded-md bg-neutral-800 pr-2 focus-within:ring-2 focus-within:ring-white/20">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubscribed(false);
          }}
          placeholder="Enter email"
          aria-label="Email address"
          className="h-12 w-full min-w-0 bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-400"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-neutral-700"
        >
          <ArrowUpRightIcon className="size-5" strokeWidth={1.8} />
        </button>
      </div>

      <p
        aria-live="polite"
        className="mt-2 text-xs text-neutral-400"
      >
        {subscribed ? "Thanks for subscribing!" : ""}
      </p>
    </form>
  );
}
