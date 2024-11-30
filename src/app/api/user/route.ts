import prisma from "@/lib/db";

export async function GET(): Promise<Response> {
    
    const users = await prisma.user.findMany();
    

    return Response.json({
        users
    })
}

export async function POST( req: Request): Promise<Response> {
    const { spotifyId, email, name, avatarUrl } = await req.json();

    const user = await prisma.user.create({
        data: {
            spotifyId,
            email,
            name,
            avatarUrl
        }
    });

    return Response.json({
        user
    })
}

export async function DELETE( req: Request): Promise<Response> {
    const { id } = await req.json();

    const user = await prisma.user.delete({
        where: {
            id
        }
    });

    return Response.json({
        user
    })
}