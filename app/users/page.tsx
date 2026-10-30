import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteUser } from "@/lib/actions";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Usuários
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie o cadastro de usuários do sistema
          </p>
        </div>
        <Link
          href="/users/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Novo Usuário
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
          <p className="text-base font-medium text-slate-700">
            Nenhum usuário cadastrado
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Comece criando o primeiro registro.
          </p>
          <Link
            href="/users/new"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Cadastrar primeiro usuário →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3.5 font-semibold text-slate-900">
                  Nome
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-900">
                  E-mail
                </th>
                <th className="hidden px-5 py-3.5 font-semibold text-slate-900 md:table-cell">
                  Telefone
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-slate-900">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/80">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{user.email}</td>
                  <td className="hidden px-5 py-4 text-slate-600 md:table-cell">
                    {user.phone || "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="rounded-md px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        Editar
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <button
                          type="submit"
                          className="rounded-md px-3 py-1.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                        >
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
