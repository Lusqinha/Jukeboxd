"use client";

import { useSearchParams } from "next/navigation";
import { AlbumCard } from "../components/album-card";
import { useState } from "react";
import Link from "next/link";

export default function AlbumReview() {
  const [isEditing, setIsEditing] = useState(false); // Controla a exibição da textarea
  const [reviewText, setReviewText] = useState(""); // Armazena o texto digitado na textarea
  const [reviews, setReviews] = useState([
    { username: "@usuaria", text: "Essa música é maravilhosa!" },
    { username: "@usuario", text: "Impressionante como isso me lembra da minha infância, que saudades!" },
  ]); // Lista de revisões existentes

  const handleSaveReview = () => {
    if (reviewText.trim() === "") {
      alert("A avaliação não pode estar vazia!");
      return;
    }

    // Adiciona a nova revisão na lista
    setReviews((prevReviews) => [
      ...prevReviews,
      { username: "@meuUsuario", text: reviewText }, // Exemplo de nome de usuário
    ]);

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
        <Link
          href={{
            pathname: "/"
          }}
        >
          <p>←</p>
        </Link>
      </button>

      {/* Informações principais */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <AlbumCard
          name={name as string}
          artist={artist as string}
          rating={Number(rating)}
          imageUrl={imageUrl as string}
          external_url={external_url as string}
          layout="review" // Define o layout como "review"
        />
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
        {/* Área de edição da avaliação */}
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
        <div className="space-y-4 mt-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              {/* Detalhes da revisão */}
              <div>
                <p className="font-semibold">{review.username}</p>
                <p className="text-sm text-gray-300">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
