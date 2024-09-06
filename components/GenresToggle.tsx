"use client";
import { useState, useEffect } from "react";
import { getGenres } from "@/axios/movies";

interface Genre {
  id: number;
  name: string;
}

export const GenresToggle = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data?.genres || []);
    };

    fetchGenres();
  }, []);

  const handleClick = (genreId: string) => {
    setActiveGenre(genreId);
  };

  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group ${
            activeGenre === genre.id
              ? "bg-gradient-to-br from-purple-600 to-blue-500"
              : "bg-gradient-to-br from-gray-400 to-gray-600"
          } group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
          onClick={() => handleClick(genre.id)}
        >
          <span
            className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${
              activeGenre === genre.id
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
