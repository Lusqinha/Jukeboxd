/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";;

interface Album {
  name: string;
  artist: string;
  albumImage: string;
  external_url: string;
  rating: number;
}

interface NavigationProps {
  onAlbumsFetched: (albums: Album[]) => void;
}

export function Navigation({ onAlbumsFetched }: NavigationProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAlbums = async (query: string) => {
    try {
      setLoading(true);
      setError("");

      const url = new URL("https://api.spotify.com/v1/search");
      url.searchParams.append("q", query || "album");
      url.searchParams.append("type", "album");
      url.searchParams.append("limit", "10");

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer BQACvz1s82pIfIE8d_a1o6T5XlqdaTHVtsEzNCedtAVSBMpYEUX8ajZzX_BFnTjyis0n4MHzvBViKiLfpJtEerWm8Ay5WCLlRsnWuGuXEVzWgsVJf_s`, // Substitua pelo token da API
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar álbuns da API do Spotify.");
      }

      const data = await res.json();
      const albumsData = data.albums.items.map((album: any) => ({
        name: album.name,
        artist: album.artists.map((artist: any) => artist.name).join(", "),
        albumImage: album.images?.[0]?.url || "/placeholder.svg",
        external_url: album.external_urls.spotify,
        rating: Math.random() * (5 - 3) + 3,
      }));

      onAlbumsFetched(albumsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAlbums(searchTerm);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar álbuns"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 p-2"
        />
        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => fetchAlbums("pop")}
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Pop
        </button>
        <button
          onClick={() => fetchAlbums("rock")}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Rock
        </button>
        <button
          onClick={() => fetchAlbums("jazz")}
          className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Jazz
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Carregando...</div>}
    </div>
  );
}



