/* eslint-disable @typescript-eslint/no-explicit-any */

import { Header } from "./components/header";
import { Navigation } from "./components/navigation"
import { Section } from "./components/section"

const trendingAlbums = [
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
]

const recommendedAlbums = [
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Album nome",
    artist: "Artista",
    rating: 4.05,
    imageUrl: "/placeholder.svg?height=64&width=64",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="space-y-6 py-6">
        <Section title="Em alta" albums={trendingAlbums} />
        <Section title="Recomendações" albums={recommendedAlbums} />
      </main>
    </div>
  )
}
