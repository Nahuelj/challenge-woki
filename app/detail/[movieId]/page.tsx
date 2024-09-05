import { Metadata } from "next";
import { getMovieDetail } from "@/axios/movies";

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

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
        alt=""
      />
      <h1>Movie ID: {movieId}</h1>
      <h2>{movieData?.title}</h2>
      <p>{movieData?.overview}</p>
    </div>
  );
};

export default DetailPage;
