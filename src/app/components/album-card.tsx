import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface AlbumCardProps {
  name?: string;
  artist?: string;
  rating?: number;
  imageUrl?: string;
  external_url?: string;
  layout?: "default" | "review"; // Define os layouts possíveis
}

export function AlbumCard({
  name,
  artist,
  rating,
  imageUrl,
  external_url,
  layout = "default", // Padrão é o layout "default"
}: AlbumCardProps) {
  const isReviewLayout = layout === "review";

  return (
    <div
      className={`flex ${isReviewLayout ? "flex-col items-start gap-4" : "items-center gap-3"
        }`}
    >
      <a
        href={external_url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={isReviewLayout ? "w-full" : ""}
      >
        <Image
          src={imageUrl || "/placeholder.svg"} // Imagem padrão se `imageUrl` for undefined
          alt={`${name || "Unknown"} by ${artist || "Unknown"}`}
          width={isReviewLayout ? 128 : 64} // Aumenta o tamanho da imagem no layout "review"
          height={isReviewLayout ? 128 : 64}
          className="rounded-md object-cover"
        />
      </a>
      <div className={isReviewLayout ? "w-full" : "flex-1"}>
        <h3 className={`font-semibold ${isReviewLayout ? "text-lg" : "text-base"}`}>
          {name || "Sem nome"}
        </h3>
        <p className={`text-sm ${isReviewLayout ? "text-gray-400" : "text-muted-foreground"}`}>
          {artist || "Artista desconhecido"}
        </p>
      </div>
      {!isReviewLayout && (
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
      )}
      {isReviewLayout && (
        <div className="mt-4">
          <p className="text-sm text-gray-400">Nota: {rating ? rating.toFixed(2) : "N/A"}</p>
          <Link
            href={{
              pathname: "/album-review",
              query: { name, artist, rating, imageUrl, external_url },
            }}
          >
            <p className="text-primary underline mt-2">Ir para a revisão completa</p>
          </Link>
        </div>
      )}
    </div>
  );
}
