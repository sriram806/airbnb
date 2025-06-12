import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        price
    } = body;


    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            locationValue: location.value,
            guestCount,
            roomCount,
            bathroomCount,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}