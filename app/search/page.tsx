"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { getMoviesWithPagination, MoviesWithPagination } from "@/axios/movies";
import { useRouter } from "next/navigation";

interface SearchProps {
  searchParams: {
    query: string;
  };
}

export default function Search({ searchParams }: SearchProps) {
  const router = useRouter();

  //Input with debounce
  const [queryInput, setQueryInput] = useState<string>(searchParams.query);
  const [queryResults, setQueryResults] = useState<MoviesWithPagination>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const debounceRef = useRef<NodeJS.Timeout>();
  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const data = await getMoviesWithPagination(e.target.value);
      console.log("🚀 ~ debounceRef.current=setTimeout ~ data:", data);
      setQueryResults(data);
    }, 350);
  };

  const renderStars = (voteAverage: number) => {
    const totalStars = 5; // Total de estrellas a mostrar
    const filledStars = Math.round(voteAverage / 2); // Número de estrellas llenas
    const emptyStars = totalStars - filledStars; // Número de estrellas vacías

    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[...Array(filledStars)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={index + filledStars}
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
    );
  };

  useEffect(() => {
    async function sync() {
      const data = await getMoviesWithPagination(queryInput);
      console.log("🚀 ~ debounceRef.current=setTimeout ~ data:", data);
      setQueryResults(data);
    }

    sync();
  }, []);

  const handleSelect = (e: React.FormEvent, movieId: number) => {
    console.log("🚀 ~ handleSelect ~ movieId:", movieId);
    e.preventDefault();
    router.push(`/detail/${movieId}}`);
  };

  return (
    <main className="flex flex-col items-center justify-between mt-6">
      <form className="max-w-md mx-auto min-w-96 mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {queryResults.results.length > 0 &&
          queryResults.results.map((movie) => (
            <div
              onClick={(e) => {
                handleSelect(e, movie.id);
              }}
              key={movie.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="w-full h-60 object-cover rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.src = "./placeholder.jpg"; // Cambia la URL a la imagen por defecto
                  }}
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                    {movie.title}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  {renderStars(movie.vote_average)}
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {Number(movie.vote_average.toFixed(1)) / 2}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>{movie.genre_ids}</div>
                  <a
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
