"use client";
import { useState } from "react";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Por favor, insira um termo de busca!");
      return;
    }

    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      // Construir a URL com os parâmetros
      const url = new URL("https://api.spotify.com/v1/search");
      url.searchParams.append("q", searchTerm);
      url.searchParams.append("type", "track"); // Você pode mudar para 'artist', 'album', etc.

      // Fazer a requisição
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer BQA13vAMVOXafNsHI-MgWcpZ7gnDKxV9ZQm6vfNHtQnzBGeddmQcdxKn_prKpU5doZ0SqACqvIDwYfAtgguTet-YUHK82lDEADVNeuMm7SDWJiTaFIE`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar dados na API do Spotify");
      }

      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      // Garantir que o erro é um objeto do tipo Error
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
      <h1 className="text-2xl font-bold mb-4">Spotify Search</h1>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome da música, artista..."
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
      {responseData && (
        <pre className="bg-gray-100 p-4 rounded w-full overflow-auto">
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    </div>
  );
}
