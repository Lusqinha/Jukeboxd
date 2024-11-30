/*
model Follower {
  id          String @id @default(uuid())
  followerId  String
  followingId String
  follower    User   @relation("Followers", fields: [followerId], references: [id])
  following   User   @relation("Following", fields: [followingId], references: [id])
  createdAt   DateTime @default(now())

  @@unique([followerId, followingId]) 
}
 */

import { UserGET } from "@/app/types/user"


export interface FollowerGET{
    id: string
    followerId: string
    followingId: string
    follower: UserGET
    following: UserGET
    createdAt: string
}

export interface FollowerPOST{
    followerId: string
    followingId: string
}

export interface FollowerDELETE{
    id: string
}

export interface FollowerPUT{
    id: string
    followerId: string
    followingId: string
}
