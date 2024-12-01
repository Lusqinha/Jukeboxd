import prisma from "@/lib/db";

export async function GET(): Promise<Response> {
    const reviews = await prisma.review.findMany({
        include: {
            user: true
        }
    });

    return Response.json({
        reviews
    })
}

export async function POST(req: Request): Promise<Response> {

    const { userId, spotifyid, rating, text } = await req.json();

    const review = await prisma.review.create({
        data: {
            userId,
            spotifyId: spotifyid,
            rating,
            text
        }
    });

    return Response.json({
        review
    })
}

export async function DELETE(req: Request): Promise<Response> {
    const { id } = await req.json();

    const review = await prisma.review.delete({
        where: {
            id
        }
    });

    return Response.json({
        review
    })
}
