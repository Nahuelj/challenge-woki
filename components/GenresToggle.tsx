"use client";
import { useState, useEffect } from "react";
import { getGenres } from "@/axios/movies";

interface Genre {
  id: number;
  name: string;
}

interface GenresToggleProps {
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

const buttonStyles = [
  {
    className: "bg-gradient-to-br from-purple-600 to-blue-500 ",
    hoverClass: "group-hover:from-purple-600 group-hover:to-blue-500 ",
    text: "Purple to blue",
  },
  {
    className: "bg-gradient-to-br from-cyan-500 to-blue-500 ",
    hoverClass: "group-hover:from-cyan-500 group-hover:to-blue-500 ",
    text: "Cyan to blue",
  },
  {
    className: "bg-gradient-to-br from-green-400 to-blue-600 ",
    hoverClass: "group-hover:from-green-400 group-hover:to-blue-600 ",
    text: "Green to blue",
  },
  {
    className: "bg-gradient-to-br from-purple-500 to-pink-500 ",
    hoverClass: "group-hover:from-purple-500 group-hover:to-pink-500 ",
    text: "Purple to pink",
  },
  {
    className: "bg-gradient-to-br from-pink-500 to-orange-400 ",
    hoverClass: "group-hover:from-pink-500 group-hover:to-orange-400 ",
    text: "Pink to orange",
  },
  {
    className: "bg-gradient-to-br from-teal-300 to-lime-300 ",
    hoverClass: "group-hover:from-teal-300 group-hover:to-lime-300 ",
    text: "Teal to Lime",
  },
  {
    className: "bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 ",
    hoverClass:
      "group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 ",
    text: "Red to Yellow",
  },
];

export const GenresToggle = ({
  selectedGenres,
  onGenreToggle,
}: GenresToggleProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreStyles, setGenreStyles] = useState<
    Map<string, { className: string; hoverClass: string; text: string }>
  >(new Map());

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

  useEffect(() => {
    // Initialize styles for each genre
    const stylesMap = new Map<
      string,
      { className: string; hoverClass: string; text: string }
    >();
    genres.forEach((genre) => {
      const style =
        buttonStyles[Math.floor(Math.random() * buttonStyles.length)];
      stylesMap.set(genre.name, style);
    });
    setGenreStyles(stylesMap);
  }, [genres]);

  const handleClick = (genreName: string) => {
    onGenreToggle(genreName);
  };

  return (
    <div className="flex justify-center items-center align-middle flex-wrap z-20 ">
      {genres.map((genre) => {
        const style = genreStyles.get(genre.name) || {
          className: "",
          hoverClass: "",
          text: "",
        };
        return (
          <button
            key={genre.id}
            className={`min-w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group ${
              style.className
            } ${
              selectedGenres.includes(genre.name)
                ? "bg-opacity-100"
                : "bg-opacity-0"
            } ${
              style.hoverClass
            }  dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            onClick={() => handleClick(genre.name)}
          >
            <span
              className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${
                selectedGenres.includes(genre.name)
                  ? "bg-opacity-0"
                  : "bg-white dark:bg-gray-900"
              } rounded-md`}
            >
              {genre.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
