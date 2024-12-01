import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface AlbumCardProps {
  name?: string;
  artist?: string;
  rating?: number;
  imageUrl?: string;
  external_url?: string;
}

export function AlbumCard({ name, artist, rating, imageUrl, external_url }: AlbumCardProps) {
  return (
    <div className="flex items-center gap-3">
      <a href={external_url || "#"} target="_blank" rel="noopener noreferrer">
        <Image
          src={imageUrl || "/placeholder.svg"} // Imagem padrão se `imageUrl` for undefined
          alt={`${name || "Unknown"} by ${artist || "Unknown"}`}
          width={64}
          height={64}
          className="rounded-md object-cover"
        />
      </a>
      <div className="flex-1">
        <h3 className="font-semibold">{name || "Sem nome"}</h3>
        <p className="text-sm text-muted-foreground">{artist || "Artista desconhecido"}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{rating ? rating.toFixed(2) : "N/A"}</span>
        <Link
          href={{
            pathname: "/album-review",
            query: { name, artist, rating, imageUrl, external_url },
          }}
        >
          <p>Ir para revisão</p>
        </Link>
        <Star className="h-4 w-4 fill-primary text-primary" />
      </div>
    </div>
  );
}
