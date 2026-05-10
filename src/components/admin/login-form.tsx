"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";

type LoginState = {
  error?: string;
  success?: string;
};

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(loginAction, initialState);

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-2xl border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] outline-none transition focus:border-[#1d1d1f]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] outline-none transition focus:border-[#1d1d1f]"
        />
      </div>

      {state?.error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
          {state.error}
        </p>
      ) : null}

      <SubmitButton
        label="Sign In"
        pendingLabel="Signing In..."
        className="w-full rounded-full bg-[#1d1d1f] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-black disabled:opacity-60"
      />
    </form>
  );
}
