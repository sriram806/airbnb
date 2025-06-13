import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const paramsData = await params;
        const { listingId } = paramsData;

        if (!listingId || typeof listingId !== 'string') {
            return new NextResponse("Invalid listing ID", { status: 400 });
        }

        let favorites = [...(currentUser.favorites || [])];

        if (favorites.includes(listingId)) {
            return new NextResponse("Listing already in favorites", { status: 400 });
        }

        favorites.push(listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favorites
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[FAVORITES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const paramsData = await params;
        const { listingId } = paramsData;

        if (!listingId || typeof listingId !== 'string') {
            return new NextResponse("Invalid listing ID", { status: 400 });
        }

        let favorites = [...(currentUser.favorites || [])];

        if (!favorites.includes(listingId)) {
            return new NextResponse("Listing not in favorites", { status: 400 });
        }

        favorites = favorites.filter((id) => id !== listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favorites
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[FAVORITES_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 