import prisma from "@/app/lib/prismadb"
import { SafeListing } from "../types";

export default async function getListings(): Promise<SafeListing[]> {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings: SafeListing[] = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}