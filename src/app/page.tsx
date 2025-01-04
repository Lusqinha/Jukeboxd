/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Header } from "./components/header";
import { Navigation } from "./components/navigation";
import { Section } from "./components/section";

interface Album {
  name: string;
  artist: string;
  albumImage: string;
  external_url: string;
  rating: number;
}

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]); // Use o tipo Album para garantir a tipagem correta
  
  const handleAlbumsFetched = (fetchedAlbums: Album[]) => {
    setAlbums(fetchedAlbums);
  };

  return (
    <div className="min-h-screen bg-background bg-black">
      <Header />
      <Navigation onAlbumsFetched={handleAlbumsFetched} />
      <main className="space-y-6 py-6 bg-black">
        {/* Section renderiza os álbuns dinamicamente */}
        <Section title="Em alta" albums={albums} />
      </main>
    </div>
  );
}
