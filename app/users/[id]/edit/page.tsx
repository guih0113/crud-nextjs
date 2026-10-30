import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateUser } from "@/lib/actions";
import { UserForm } from "@/components/user-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Editar Usuário</h1>
      <UserForm action={updateUser} user={user} />
    </div>
  );
}
