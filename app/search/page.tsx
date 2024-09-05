import { getMoviesWithPagination, MoviesWithPagination } from "@/axios/movies";

interface SearchProps {
  searchParams: {
    query: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const query = searchParams.query;
  const data: MoviesWithPagination = await getMoviesWithPagination(query);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between my-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((movie) => (
          <div
            key={movie.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="w-full h-60 object-cover rounded-t-lg"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
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
                  {movie.vote_average.toFixed(1) / 2}
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
