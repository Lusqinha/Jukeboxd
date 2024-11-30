import Image from "next/image";
import { Star } from 'lucide-react';

interface AlbumCardProps {
  name: string;
  artist: string;
  rating: number;
  imageUrl: string;
  external_url: string;
}

export function AlbumCard({ name, artist, rating, imageUrl, external_url }: AlbumCardProps) {
  return (
    <div className="flex items-center gap-3">
      <a href={external_url} target="_blank" rel="noopener noreferrer">
        <Image
          src={imageUrl}
          alt={`${name} by ${artist}`}
          width={64}
          height={64}
          className="rounded-md object-cover"
        />
      </a>
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{artist}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{rating.toFixed(2)}</span>
        <Star className="h-4 w-4 fill-primary text-primary" />
      </div>
    </div>
  );
}
