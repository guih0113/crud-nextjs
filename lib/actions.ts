"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthdate: z.string().optional(),
});

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    address: (formData.get("address") as string) || undefined,
    birthdate: (formData.get("birthdate") as string) || undefined,
  };

  const result = userSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, phone, address, birthdate } = result.data;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
        birthdate: birthdate ? new Date(birthdate) : null,
      },
    });
  } catch {
    return { message: "Erro ao criar usuário. E-mail já pode estar em uso." };
  }

  revalidatePath("/users");
  redirect("/users");
}

export async function updateUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = Number(formData.get("id"));

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    address: (formData.get("address") as string) || undefined,
    birthdate: (formData.get("birthdate") as string) || undefined,
  };

  const result = userSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, phone, address, birthdate } = result.data;

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
        birthdate: birthdate ? new Date(birthdate) : null,
      },
    });
  } catch {
    return {
      message: "Erro ao atualizar usuário. E-mail já pode estar em uso.",
    };
  }

  revalidatePath("/users");
  redirect("/users");
}

export async function deleteUser(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  await prisma.user.delete({ where: { id } });

  revalidatePath("/users");
}
