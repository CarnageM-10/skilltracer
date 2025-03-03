"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUser(data) { 
  const { name, email } = data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        name: name,
      },
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    throw new Error("Échec de la vérification de l'utilisateur.");
  }
}

// Fermez la connexion lorsque l'application se termine
process.on("exit", async () => {
  await prisma.$disconnect();
});