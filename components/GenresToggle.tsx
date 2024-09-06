"use client";
import { useState, useEffect } from "react";
import { getGenres } from "@/axios/movies";

interface Genre {
  id: number;
  name: string;
}

export const GenresToggle = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenres, setActiveGenres] = useState<number[]>([]); // Cambia el estado a un array de números
  console.log("🚀 ~ GenresToggle ~ activeGenres:", activeGenres);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data?.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleClick = (genreId: number) => {
    setActiveGenres((prevActiveGenres) =>
      prevActiveGenres.includes(genreId)
        ? prevActiveGenres.filter((id) => id !== genreId)
        : [...prevActiveGenres, genreId]
    );
  };

  return (
    <div className="flex justify-center items-center align-middle flex-wrap z-20">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`min-w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group ${
            activeGenres.includes(genre.id) // Verifica si el género está en el array de géneros activos
              ? "bg-gradient-to-br from-purple-600 to-blue-500"
              : "bg-gradient-to-br from-gray-400 to-gray-600"
          } group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
          onClick={() => handleClick(genre.id)}
        >
          <span
            className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${
              activeGenres.includes(genre.id) // Verifica si el género está en el array de géneros activos
                ? "bg-opacity-0"
                : "bg-white dark:bg-gray-900"
            } rounded-md`}
          >
            {genre.name}
          </span>
        </button>
      ))}
    </div>
  );
};
