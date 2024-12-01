"use client";

import { useSearchParams } from "next/navigation";
import { AlbumCard } from "../components/album-card";
import { Star } from "lucide-react";
import { useState } from "react";

export default function AlbumReview() {
  const [isEditing, setIsEditing] = useState(false); // Controla a exibição da textarea
  const [reviewText, setReviewText] = useState(""); // Armazena o texto da avaliação

  const handleSaveReview = () => {
    if (reviewText.trim() === "") {
      alert("A avaliação não pode estar vazia!");
      return;
    }

    console.log("Avaliação salva:", reviewText);
    setIsEditing(false); // Fecha o modo de edição
    setReviewText(""); // Limpa o campo após salvar
  };

  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const artist = searchParams.get("artist");
  const rating = searchParams.get("rating");
  const imageUrl = searchParams.get("imageUrl");
  const external_url = searchParams.get("external_url");

  if (!name || !artist || !rating || !imageUrl || !external_url) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-black text-white min-h-screen">
      {/* Voltar */}
      <button className="p-2 bg-gray-800 rounded-md mb-4">
        ←
      </button>

      {/* Informações principais */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <AlbumCard
          name={name}
          artist={artist}
          rating={parseFloat(rating)}
          imageUrl={imageUrl}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Heaven or Las Vegas</h1>
          <h2 className="text-md text-gray-300">Cocteau Twins</h2>
          <div className="flex items-center mt-2">
            <span className="text-lg font-semibold">4.05</span>
            <Star className="h-5 w-5 fill-primary text-primary ml-1" />
          </div>
          <p className="text-sm text-gray-400">Tipo - LP</p>
          <p className="text-sm text-gray-400">Lançamento - 17 Set 1990</p>
          <p className="text-sm text-gray-400">Ranking - #34 geral</p>
          <p className="text-sm text-gray-400">Gêneros - Pop Psicodélico, Onda etérea</p>
        </div>
      </div>

      {/* Resenhas */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Resenhas</h3>
        <div className="flex gap-2 mb-4">
          {/* Ícones de ação */}
          <button
            className="p-2 bg-gray-800 rounded-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✏️
          </button>
          <button className="p-2 bg-gray-800 rounded-md">🔍</button>
          <button className="p-2 bg-gray-800 rounded-md">⭐</button>
          <button className="p-2 bg-gray-800 rounded-md">👤</button>
        </div>
        {isEditing && (
          <div className="bg-gray-800 p-4 rounded-md">
            <textarea
              className="w-full p-2 bg-gray-900 text-white rounded-md resize-none"
              rows={4}
              placeholder="Escreva sua avaliação sobre o álbum..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md mr-2"
                onClick={handleSaveReview}
              >
                Salvar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {/* Resenha 1 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <p className="font-semibold">@usuaria</p>
              <p className="text-sm text-gray-300">
                Assim que ouço aquelas notas de abertura de Cherry-Colored Funk...
              </p>
            </div>
          </div>

          {/* Resenha 2 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <p className="font-semibold">@usuario</p>
              <p className="text-sm text-gray-300">
                Heaven or Las Vegas é o auge da genialidade dos Cocteau Twins...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
