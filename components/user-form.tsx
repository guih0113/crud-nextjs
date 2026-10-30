"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionState } from "@/lib/actions";

type UserData = {
  id?: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  birthdate: Date | null;
};

type UserFormProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  user?: UserData;
};

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function UserForm({ action, user }: UserFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
    >
      {user?.id && <input type="hidden" name="id" value={user.id} />}

      {state.message && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {state.message}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name ?? ""}
          required
          placeholder="Ex: Maria da Silva"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
        {state.errors?.name && (
          <p className="mt-1.5 text-sm font-medium text-red-600">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email ?? ""}
          required
          placeholder="Ex: maria@exemplo.com"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-sm font-medium text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={user?.phone ?? ""}
          placeholder="Ex: (11) 98765-4321"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Endereço
        </label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={user?.address ?? ""}
          placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="birthdate"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Data de Nascimento
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          defaultValue={formatDate(user?.birthdate ?? null)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Salvar"}
        </button>
        <Link
          href="/users"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
