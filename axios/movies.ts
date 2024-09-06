import axios from "axios";
import { env } from "@/envExport";

export interface Movies {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovies = async (query: string): Promise<Movies[]> => {
  const apiUrl = env.api_url || "";
  const token = env.api_key;
  console.log("🚀 ~ getMovies ~ token:", token);

  console.log("🚀 ~ getMovies ~ apiUrl:", apiUrl);
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `${apiUrl}/search/movie?query=${query}`;

  console.log("🚀 ~ getMovies ~ url:", url);
  try {
    const response = await axios.get(url, {
      headers,
    });
    console.log(response.data);
    return response.data.results || []; // Ajusta esto según la estructura de la API
  } catch (error) {
    console.error("Error making the GET request:", error);
    return [];
  }
};

export interface MoviesWithPagination {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

export const getMoviesWithPagination = async (
  query: string
): Promise<MoviesWithPagination> => {
  const apiUrl = env.api_url || "";
  const token = env.api_key;
  console.log("🚀 ~ getMovies ~ token:", token);

  console.log("🚀 ~ getMovies ~ apiUrl:", apiUrl);
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `${apiUrl}/search/movie?query=${query}`;

  console.log("🚀 ~ getMovies ~ url:", url);
  try {
    const response = await axios.get(url, {
      headers,
    });
    console.log(response.data);
    return (
      response.data || {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      }
    ); // Ajusta esto según la estructura de la API
  } catch (error) {
    console.error("Error making the GET request:", error);
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
};

interface Genre {
  id: number;
  name: string;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovieDetail = async (
  movieId: number
): Promise<MovieDetail | null> => {
  const token = env.api_key;
  console.log("🚀 ~ getMovieDetail ~ movieId:", movieId);
  console.log("🚀 ~ getMovieDetail ~ token:", token);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}`;

  try {
    const response = await axios.get(url, {
      headers,
    });
    console.log(response.data);
    return response.data || []; // Ajusta esto según la estructura de la API
  } catch (error) {
    console.error("Error making the GET request:", error);
    return null;
  }
};

export const getSimilarMovies = async (
  movieId: number
): Promise<MoviesWithPagination | null> => {
  const apiUrl = env.api_url || "";
  const token = env.api_key;

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const url = `${apiUrl}/movie/${movieId}/similar`;

  console.log("🚀 ~ getSimilarMovies ~ url:", url);
  try {
    const response = await axios.get(url, {
      headers,
    });
    console.log(response.data);
    return response.data || null; // Ajusta esto según la estructura de la API
  } catch (error) {
    console.error("Error making the GET request:", error);
    return null;
  }
};

export const getTrendingMovies =
  async (): Promise<MoviesWithPagination | null> => {
    const apiUrl = "https://api.themoviedb.org/3/trending/movie/week";
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${env.api_key}`,
    };

    try {
      const response = await axios.get<MoviesWithPagination>(apiUrl, {
        headers,
        params: {
          language: "en-US",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error making the GET request:", error);
      return null;
    }
  };

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

export const getGenres = async (): Promise<GenreResponse | null> => {
  const url = "https://api.themoviedb.org/3/genre/movie/list";

  try {
    const response = await axios.get<GenreResponse>(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.api_key}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return null;
  }
};
