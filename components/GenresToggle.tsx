"use client";
import { useState, useEffect } from "react";
import { getGenres } from "@/axios/movies";

interface Genre {
  id: number;
  name: string;
}

interface GenresToggleProps {
  selectedGenres: string[]; // Cambié el tipo a string[] para que coincida con el componente principal
  onGenreToggle: (genre: string) => void;
}

export const GenresToggle = ({
  selectedGenres,
  onGenreToggle,
}: GenresToggleProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);

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

  const handleClick = (genreName: string) => {
    onGenreToggle(genreName); // Llama a la función de alternar género en el componente principal
  };

  return (
    <div className="flex justify-center items-center align-middle flex-wrap z-20">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`min-w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group ${
            selectedGenres.includes(genre.name) // Verifica si el género está en el array de géneros seleccionados
              ? "bg-gradient-to-br from-purple-600 to-blue-500"
              : "bg-gradient-to-br from-gray-400 to-gray-600"
          } group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
          onClick={() => handleClick(genre.name)}
        >
          <span
            className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${
              selectedGenres.includes(genre.name) // Verifica si el género está en el array de géneros seleccionados
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
