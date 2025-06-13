import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";


import prisma from "@/app/lib/prismadb";
import { SafeUser } from "@/app/types";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        const safeUser: SafeUser = {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified ? new Date().toISOString() : null
        };

        return safeUser;
    } catch (error: any) {
        return null;
    }
}