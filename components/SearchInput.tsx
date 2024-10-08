"use client";

import { getMovies } from "@/axios/movies";
import { ChangeEvent, useRef, useState } from "react";
import { Movies } from "@/axios/movies";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const [queryResults, setQueryResults] = useState<Movies[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false); // Estado para controlar el foco
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const data = await getMovies(e.target.value);
      setQueryResults(data);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleSelect = (e: React.FormEvent, movieId: number) => {
    e.preventDefault();
    router.push(`/detail/${movieId}`);
  };

  return (
    <form
      className="max-w-md mx-auto min-w-80 z-20 w-96 input"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies, Series..."
          required
          autoComplete="off"
          onChange={onQueryChange}
          onFocus={() => setIsFocused(true)} // Muestra los resultados al enfocar
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Oculta los resultados al desenfocar (con un delay para permitir clicks)
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      {isFocused && queryResults.length > 0 && (
        <div className="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 flex flex-col  absolute max-w-96 z-20 resutlInput overflow-hidden">
          <ul role="list" className="divide-slate-200 input flex flex-col">
            {queryResults.slice(0, 4).map((movie) => (
              <li
                onClick={(e) => {
                  handleSelect(e, movie.id);
                }}
                key={movie.id}
                className="flex py-3 px-4 hover:bg-slate-400 cursor-pointer input justify-start items-start"
              >
                <img
                  className="h-12 w-12 rounded-md "
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.src = "./placeholder.jpg";
                  }}
                />
                <div className="ml-3 overflow-hidden  flex flex-col justify-start">
                  <p className="text-sm font-medium text-slate-900  w-fit max-w-fit dark:text-white">
                    {movie.title}
                  </p>
                  <p className="text-sm text-slate-500 truncate  w-fit max-w-fit">
                    {movie.overview}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
