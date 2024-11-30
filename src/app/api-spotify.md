"use client";
import { useState } from "react";

interface Track {
  name: string;
  artist: string;
  album: string;
  albumImage: string | null;
  external_url: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Por favor, insira um termo de busca!");
      return;
    }

    setLoading(true);
    setError(null);
    setTracks([]);

    try {
      const url = new URL("https://api.spotify.com/v1/search");
      url.searchParams.append("q", searchTerm);
      url.searchParams.append("type", "track");
      url.searchParams.append("limit", "10");

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer BQD0r4kMPGrzmSfzVzCIPQEQO_DZUOvkfA-uzARYcIOx6UonvdCoSx9e7_dfEFDtnDgHmLnSEcN_l70ESDnewCUfUHBkemszaYfzpWTtwcFxzr31Cuk`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar dados na API do Spotify");
      }

      const data = await res.json();

      const filteredTracks: Track[] = data.tracks.items.map((track: any) => ({
        name: track.name,
        artist: track.artists.map((artist: any) => artist.name).join(", "),
        album: track.album.name,
        albumImage: track.album.images?.[0]?.url || null, // Imagem do álbum
        external_url: track.external_urls.spotify,
      }));

      setTracks(filteredTracks);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ocorreu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Spotify Music Search</h1>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome da música ou artista..."
          className="border p-2 rounded w-80"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {tracks.length > 0 && (
        <div className="w-full max-w-2xl">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-4 flex items-start gap-4"
            >
              {track.albumImage && (
                <img
                  src={track.albumImage}
                  alt={`Capa do álbum ${track.album}`}
                  className="w-24 h-24 object-contain"
                />
              )}
              <div>
                <p>
                  <strong>Música:</strong> {track.name}
                </p>
                <p>
                  <strong>Artista:</strong> {track.artist}
                </p>
                <p>
                  <strong>Álbum:</strong> {track.album}
                </p>
                <p>
                  <a
                    href={track.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Ouvir no Spotify
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
