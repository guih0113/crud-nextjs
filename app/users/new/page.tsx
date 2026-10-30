import { createUser } from "@/lib/actions";
import { UserForm } from "@/components/user-form";

export default function NewUserPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Novo Usuário
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Preencha os dados abaixo para cadastrar um novo usuário
        </p>
      </div>
      <UserForm action={createUser} />
    </main>
  );
}
