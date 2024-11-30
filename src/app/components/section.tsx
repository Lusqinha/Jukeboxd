import { ChevronRight } from 'lucide-react'
import { Button } from "./ui/button"
import { AlbumCard } from "./album-card"

interface SectionProps {
  title: string
  albums: Array<{
    name: string
    artist: string
    rating: number
    imageUrl: string
  }>
}

export function Section({ title, albums }: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-4 px-4">
        {albums.map((album, index) => (
          <AlbumCard key={index} {...album} />
        ))}
      </div>
    </div>
  )
}

