/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
          Authorization: `Bearer BQCH1avCmjo3U-Qaj0P9nlMt7ewgYbYpHaktYGEg6OJsquXctjidW7rCO7IEQqtlN1QwNlYwXoP_kbJqT50YlfcTUZA23_R_QFEZL-zOTjGt8l2dQwU`, // Substitua pelo token da API
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
    <div className="space-y-4 p-4 bg-black">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl text-white font-bold">Explorar</h2>
        <input
          type="text"
          placeholder="Buscar álbuns"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 p-2 text-white"
        />
        <Button
          onClick={handleSearch}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <Search />
        </Button >
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-white">Carregando...</div>}

      <Tabs defaultValue="albums" className="w-full">
        <TabsList className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="reviews" className="flex-1">
            Resenhas
          </TabsTrigger>
          <TabsTrigger value="albums" className="flex-1">
            Albuns
          </TabsTrigger>
          <TabsTrigger value="comunidades" className="flex-1">
            Comunidades
          </TabsTrigger>
          <TabsTrigger value="musicas" className="flex-1">
            Músicas
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}



