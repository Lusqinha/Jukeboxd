import { AlbumCard } from "./album-card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface Album {
  name: string;
  artist: string;
  albumImage: string;
  external_url: string;
  rating: number;
}

interface SectionProps {
  title: string;
  albums: Album[];
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
          <AlbumCard
            key={index}
            name={album.name}
            artist={album.artist}
            imageUrl={album.albumImage}
            external_url={album.external_url}
            rating={album.rating}
          />
        ))}
      </div>
    </div>
  );
}
