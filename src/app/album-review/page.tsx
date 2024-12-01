"use client";

import { useSearchParams } from "next/navigation";
import { AlbumCard } from "../components/album-card";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Review {
  username: string;
  text: string;
}

export default function AlbumReview() {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]); // Tipando o estado

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const artist = searchParams.get("artist");
  const rating = searchParams.get("rating");
  const imageUrl = searchParams.get("imageUrl");
  const external_url = searchParams.get("external_url");

  // Carregar avaliações do localStorage ao montar o componente
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Atualizar o localStorage sempre que as avaliações mudarem
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSaveReview = () => {
    if (reviewText.trim() === "") {
      alert("A avaliação não pode estar vazia!");
      return;
    }

    const newReview: Review = { username: "@meuUsuario", text: reviewText }; // Usando o tipo Review
    setReviews((prevReviews) => [...prevReviews, newReview]);

    setIsEditing(false);
    setReviewText("");
  };

  if (!name || !artist || !rating || !imageUrl || !external_url) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-black text-white min-h-screen">
      <button className="p-2 bg-gray-800 rounded-md mb-4">
        <Link href="/">
          <p>←</p>
        </Link>
      </button>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <AlbumCard
          name={name as string}
          artist={artist as string} // comentario para subir local storage
          rating={Number(rating)}
          imageUrl={imageUrl as string}
          external_url={external_url as string}
          layout="review"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Resenhas</h3>
        <div className="flex gap-2 mb-4">
          <button
            className="p-2 bg-gray-800 rounded-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✏️
          </button>
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

        <div className="space-y-4 mt-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
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
