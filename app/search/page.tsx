"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  getMoviesWithPagination,
  MoviesWithPagination,
  searchMovies,
} from "@/axios/movies";
import { useRouter, useSearchParams } from "next/navigation";
import { GenresToggle } from "@/components/GenresToggle";
import { MovieCard } from "@/components/MovieCard";

export const RangeInput = ({ rangeValue, setRangeValue }) => {
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="dark:text-white">Release date: </span>{" "}
        <input
          type="number"
          min="1900"
          max="2024"
          value={rangeValue}
          onChange={handleNumberChange}
          className="w-20 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <input
        id="range-input"
        type="range"
        min="1900"
        max="2024"
        value={rangeValue}
        onChange={handleRangeChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default function Search({ searchParams }) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const [queryInput, setQueryInput] = useState<string>(
    searchParams.query || ""
  );
  const [rangeValue, setRangeValue] = useState<number>(
    parseInt(searchParams.releaseDate) || 1900
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    searchParams.genres?.split(",") || []
  );
  const [queryResults, setQueryResults] = useState<MoviesWithPagination>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const debounceRef = useRef<NodeJS.Timeout>();

  const updateURL = () => {
    const params = new URLSearchParams();
    if (queryInput) params.set("query", queryInput);
    if (rangeValue) params.set("releaseDate", rangeValue.toString());
    if (selectedGenres.length > 0)
      params.set("genres", selectedGenres.join(","));
    router.push(`?${params.toString()}`);
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      updateURL();
      const data = await getMoviesWithPagination(e.target.value);
      setQueryResults(data);
    }, 350);
  };

  const onGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newGenres);
  };

  useEffect(() => {
    updateURL();
  }, [rangeValue, selectedGenres]);

  useEffect(() => {
    async function sync() {
      const data = await getMoviesWithPagination(queryInput);
      setQueryResults(data);
    }

    sync();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between align-middle mt-6">
      <h2 className="text-4xl font-bold dark:text-white capitalize mb-9">
        advanced search
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-14 mb-9">
        <form className="max-w-md mx-auto min-w-96">
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
              value={queryInput}
              onChange={onQueryChange}
            />
          </div>
        </form>

        <RangeInput rangeValue={rangeValue} setRangeValue={setRangeValue} />
      </div>
      <div className="mb-9 max-w-screen-2xl">
        <GenresToggle
          selectedGenres={selectedGenres}
          onGenreToggle={onGenreToggle}
        />
      </div>
      {queryInput && queryResults?.results ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20">
          {queryResults?.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          Looking for something special? Start typing in the search box or apply
          filters to find the best movies and shows. Don’t miss out!
        </p>
      )}
    </main>
  );
}
