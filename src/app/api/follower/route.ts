import { FollowerGET } from "@/app/types/follower";
import prisma from "@/lib/db";


export async function GET(): Promise<Response> {
    
    const followers = await prisma.follower.findMany({
        include: {
            follower: true,
            following: true
        }
    });

    return Response.json({
        followers
    })
}

export async function POST( req: Request): Promise<Response> {
    const { followerId, followingId } = await req.json();

    const follower = await prisma.follower.create({
        data: {
            followerId,
            followingId
        }
    });

    return Response.json({
        follower
    })
}

export async function DELETE( req: Request): Promise<Response> {
    const { id } = await req.json();

    const follower = await prisma.follower.delete({
        where: {
            id
        }
    });

    return Response.json({
        follower
    })
}