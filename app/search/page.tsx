"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  getMoviesWithPagination,
  MoviesWithPagination,
  discoverMovies,
  searchMovies,
} from "@/axios/movies";
import { useRouter } from "next/navigation";
import { GenresToggle } from "@/components/GenresToggle";
import { MovieCard } from "@/components/MovieCard";
import Link from "next/link";
import "@/app/globals.css";
import { RangeInput } from "@/components/RangeInput";

interface SearchProps {
  searchParams: {
    query?: any;
    year?: any;
    genres?: any;
  };
}

export default function Page({ searchParams }: SearchProps) {
  const router = useRouter();
  const yearParam = searchParams.year;
  const queryParam = searchParams.query;
  const genresParam = searchParams.genres;

  const [queryInput, setQueryInput] = useState<string>(
    searchParams.query || ""
  );
  const [rangeValue, setRangeValue] = useState<number>(searchParams.year || 0);
  // Convertir los géneros en la URL de string a array de números
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    genresParam ? genresParam.split(",").map(Number) : []
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

    // Evita actualizaciones si no hay cambios
    if (queryInput) params.set("query", queryInput);
    if (rangeValue !== searchParams.year)
      params.set("year", rangeValue.toString());
    if (selectedGenres.length > 0)
      params.set("genres", selectedGenres.join(","));

    // Si los parámetros cambiaron, entonces actualizar la URL
    if (params.toString() !== searchParams.toString()) {
      router.push(`?${params.toString()}`);
    }
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

  const onGenreToggle = (genre: number) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newGenres);
  };

  useEffect(() => {
    updateURL();
  }, [rangeValue, selectedGenres]);

  const isValidParam = (param: string | null) =>
    param !== null && param.trim() !== "";

  const getValidParams = (
    yearParam: string | null,
    queryParam: string | null,
    genresParam: string | null
  ) => {
    const params: { [key: string]: any } = {};
    if (isValidParam(yearParam)) params.year = yearParam;
    if (isValidParam(queryParam)) params.with_keywords = queryParam;
    if (isValidParam(genresParam)) params.with_genres = genresParam;
    return params;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let data: MoviesWithPagination | null = null;

      if (queryParam) {
        // Si existe queryParam, usa searchMovies
        data = await searchMovies(
          queryParam,
          genresParam || "",
          yearParam ? parseInt(yearParam, 10) : undefined,
          1
        );
      } else {
        // Si no existe queryParam, usa discoverMovies
        data = await discoverMovies(
          "", // Pasar un valor vacío para query ya que no se está buscando por query
          genresParam || "",
          parseInt(yearParam || ""),
          1
        );
      }

      setQueryResults(
        data || {
          page: 0,
          results: [],
          total_pages: 0,
          total_results: 0,
        }
      );
    };

    fetchMovies();
  }, [queryParam, genresParam, yearParam]);

  return (
    <main className="flex flex-col items-center justify-between align-middle mt-6 p">
      <h2 className="text-4xl font-bold dark:text-white capitalize mb-9 text-center">
        advanced search
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-14 mb-9 gap">
        <form className="max-w-md mx-auto  input">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative input">
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
              placeholder="Search Movies, Series..."
              required
              autoComplete="off"
              value={queryInput}
              onInput={onQueryChange}
              onChange={onQueryChange}
            />
          </div>
        </form>

        <RangeInput rangeValue={rangeValue} setRangeValue={setRangeValue} />

        <button
          onClick={() => {
            // Resetear los estados de los filtros
            setQueryInput("");
            setRangeValue(0);
            setSelectedGenres([]);

            // Borrar los parámetros de la URL
            router.push("/search");
          }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 capitalize"
        >
          clear filters
        </button>
      </div>
      <div className="mb-9 max-w-screen-2xl">
        <GenresToggle
          selectedGenres={selectedGenres}
          onGenreToggle={onGenreToggle}
        />
      </div>
      {queryResults?.results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  mb-10">
          {queryResults?.results.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20 remove-mt">
          It looks like there are no results for your search. Try resetting your
          filters to continue exploring. Don’t miss out!
        </p>
      )}
    </main>
  );
}
