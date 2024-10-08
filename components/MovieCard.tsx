import Link from "next/link";
import { Movies } from "@/axios/movies";

interface MovieCardProps {
  movie: Movies;
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    : "/placeholder.jpg"; // Ruta local a la imagen de placeholder

  const renderStars = (voteAverage: number) => {
    const totalStars = 5; // Total de estrellas a mostrar
    const filledStars = Math.round(voteAverage / 2); // Número de estrellas llenas
    const emptyStars = totalStars - filledStars; // Número de estrellas vacías

    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[...Array(filledStars)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4 text-blue-300"
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

  const getBadgeColor = (voteAverage: number) => {
    if (voteAverage < 3)
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    if (voteAverage < 3.5)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  };

  const voteAverage = Number(movie.vote_average.toFixed(1)) / 2;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 relative">
      <img
        className="w-full h-60 object-cover "
        src={imageUrl}
        alt={movie.title}
      />
      <div className="px-5 pb-5 flex flex-col">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate mt-3 mb-1">
          {movie.title}
        </h5>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex">
            {renderStars(movie.vote_average)}
            <span
              className={`ml-2 text-gray-900 dark:text-white ${getBadgeColor(
                voteAverage
              )} px-2.5 py-0.5 rounded-full`}
            >
              {voteAverage}
            </span>
          </div>
          <Link
            href={`/detail/${movie.id}`}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 capitalize ml-auto"
          >
            more details
          </Link>
        </div>
      </div>
    </div>
  );
}
