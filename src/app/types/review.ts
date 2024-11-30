/*
model Review {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  spotifyId   String   // ID do Spotify (pode ser de música ou álbum)
  rating      Float    @default(0.0)
  text        String? 
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId, spotifyId]) 
}
*/

import { UserGET } from "@/app/types/user"

export interface ReviewGET{
    id: string
    userId: string
    user: UserGET
    spotifyId: string
    rating: number
    text: string
    createdAt: string
    updatedAt: string
}