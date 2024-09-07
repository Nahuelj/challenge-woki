import { SearchInput } from "@/components/SearchInput";
import "@/app/globals.css";
import { getTrendingMovies } from "@/axios/movies";
import Link from "next/link";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();

  return (
    <main className="flex flex-col items-center justify-start ">
      <div className="parallax  flex flex-col items-center justify-center gap-7 py-24 px-8 cine-backgound bg-cover bg-center w-full h-96 query">
        <div className="parallax-content flex flex-col items-center justify-center align-middle">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white text-center mb-8 z-10">
            Discover Movies with Complete Details
          </h1>
          <p className="text-lg font-light text-white lg:text-xl  text-balance max-w-5xl text-center z-10 ">
            Explore our movie database to find detailed info and reviews on your
            next favorite film. From new releases to classics, we've got it all.
          </p>
        </div>
        {/* <GenresToggle /> */}

        <SearchInput />

        <p className="mb-3 text-white dark:text-gray-400 z-10  font-light">
          Can't find what you're looking for? perform an
          <Link href={"/search"}>
            <strong className="font-semibold text-white dark:text-white ml-1 underline underline-offset-3 decoration decoration-blue-400 dark:decoration-blue-600 z-10">
              {" "}
              advanced search
            </strong>{" "}
          </Link>
        </p>
      </div>
      <h4 className="text-2xl font-bold dark:text-white text-center my-8 capitalize">
        Weekly movie recommendation
      </h4>

      <div className="container">
        <div className="slider">
          {trendingMovies?.results.map((movie) => {
            const imageUrl = movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : "/placeholder.jpg";
            return (
              <Link
                key={movie.id}
                href={`/detail/${movie.id}`}
                className="cursor-pointer bg-white shadow-lg rounded-lg  transform transition duration-300 hover:scale-105 poster"
              >
                <img
                  key={movie.id}
                  className="w-full h-80 object-cover poster dark:bg-gray-900"
                  src={imageUrl}
                  alt={movie.title}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
