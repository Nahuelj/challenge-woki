import { Metadata } from "next";
import { getMovieDetail, getSimilarMovies } from "@/axios/movies";
import { MovieCard } from "@/components/MovieCard";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";

interface Params {
  params: {
    movieId: number;
  };
}

// SSR para generar metadata dinámicamente
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { movieId } = params;

  const movieData = await getMovieDetail(movieId);

  return {
    title: `${movieData?.title}`,
    description: `${movieData?.overview}.`,
  };
}

const DetailPage = async ({ params }: Params) => {
  const { movieId } = params;

  const movieData = await getMovieDetail(movieId);
  const similarMovies = await getSimilarMovies(movieId);
  console.log("🚀 ~ DetailPage ~ similarMovies:", similarMovies);

  // Array de clases para los diferentes estilos de los spans
  const tagStyles = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  ];

  // Función para obtener una clase aleatoria
  const getRandomStyle = () => {
    return tagStyles[Math.floor(Math.random() * tagStyles.length)];
  };

  return (
    <div>
      <img
        src={
          movieData?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`
            : "/placeholder.jpg"
        }
        alt=""
        className="w-full h-96 object-cover overflow-hidden"
      />
      <div className=" py-10 rounded-md flex items-center gap-14 justify-center">
        <img
          src={
            movieData?.poster_path
              ? `https://image.tmdb.org/t/p/original/${movieData?.poster_path}`
              : "/placeholder.jpg"
          }
          className="max-h-96 max-w-64 overflow-hidden"
        />
        <div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movieData?.genres.map((genre) => {
                return (
                  <span
                    key={genre.id}
                    className={`${getRandomStyle()} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center align-middle">
              <h1 className="text-5xl font-extrabold dark:text-white">
                {movieData?.title}
              </h1>
            </div>

            <div className="flex items-center my-8">
              <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400 text-2xl">
                ({movieData?.release_date})
              </small>
              <span className="ms-2 font-semibold text-gray-500 dark:text-gray-400 text-2xl">
                /
              </span>
              <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400 text-2xl">
                Duration: <span>{movieData?.runtime}m</span>{" "}
              </small>
              <span className="ms-2 font-semibold text-gray-500 dark:text-gray-400 text-2xl">
                /
              </span>
              <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400 text-2xl">
                Rating: <span>{movieData?.vote_average.toFixed(1)}</span>{" "}
              </small>
            </div>
          </div>

          <p className="mt-8 text-balance max-w-screen-sm dark:text-white">
            {movieData?.overview}
          </p>
        </div>
      </div>

      <div className="">
        <h4 className="text-2xl font-bold dark:text-white text-center my-8 mb-12">
          Similar Movies
        </h4>

        {similarMovies?.results?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20 mb-10">
              {similarMovies?.results.map((movie) => (
                <div>
                  <MovieCard movie={movie} key={movie.id} />
                </div>
              ))}
            </div>
            <Pagination
              actualPage={similarMovies?.page}
              totalPages={similarMovies?.total_pages}
              movieId={movieData?.id}
            />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-10 mb-24">
            No similar movies found. Try another movie!{" "}
            <Link className="font-semibold underline" href={"/search"}>
              Search Movie
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
