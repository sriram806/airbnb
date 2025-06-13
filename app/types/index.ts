import { User, Listing } from "../generated/prisma";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" 
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
};