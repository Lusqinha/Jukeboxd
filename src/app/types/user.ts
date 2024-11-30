

/*
model User {
  id        String    @id @default(uuid())
  spotifyId String    @unique
  email     String?   @unique
  name      String?
  avatarUrl String?
  reviews   Review[]
  followers Follower[] @relation("Followers")
  following Follower[] @relation("Following")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

*/

import { FollowerGET } from "@/app/types/follower"
import { ReviewGET } from "@/app/types/review"

export interface UserGET{
    id: string
    spotifyId: string
    email: string
    name: string
    avatarUrl: string
    reviews: ReviewGET[]
    followers: FollowerGET[]
    following: FollowerGET[]
    createdAt: string
    updatedAt: string
}