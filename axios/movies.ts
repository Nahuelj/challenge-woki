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

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `${apiUrl}/search/movie?query=${query}`;

  try {
    const response = await axios.get(url, {
      headers,
    });
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

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `${apiUrl}/search/movie?query=${query}`;

  try {
    const response = await axios.get(url, {
      headers,
    });
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

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}`;

  try {
    const response = await axios.get(url, {
      headers,
    });
    return response.data || []; // Ajusta esto según la estructura de la API
  } catch (error) {
    console.error("Error making the GET request:", error);
    return null;
  }
};

export const getSimilarMovies = async (
  movieId: number,
  page: number = 1
): Promise<MoviesWithPagination | null> => {
  const apiUrl = env.api_url || "";
  const token = env.api_key;

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const url = `${apiUrl}/movie/${movieId}/similar?page=${page}`;

  try {
    const response = await axios.get(url, {
      headers,
    });
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

interface SearchParams {
  query: string;
  releaseDateGte: string;
  releaseDateLte: string;
  genres: string[];
}

export const searchMovies = async (
  query: string,
  with_genres?: string,
  year?: number,
  page: number = 1
): Promise<MoviesWithPagination | null> => {
  const apiUrl = "https://api.themoviedb.org/3/search/movie";
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  try {
    const response = await axios.get<MoviesWithPagination>(apiUrl, {
      headers,
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        sort_by: "popularity.desc",
        query, // Buscar por nombre
        with_genres, // Filtrar por género
        year, // Filtrar por año
        page,
      },
    });

    // Filtrar resultados por géneros si se proporcionan
    if (with_genres && with_genres.length > 0) {
      response.data.results = response.data.results.filter((movie) =>
        movie.genre_ids.some((genreId) =>
          with_genres.includes(genreId.toString())
        )
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error making the GET request:", error);
    return null;
  }
};

export const discoverMovies = async (
  with_keywords: string,
  with_genres?: string,
  year?: number,
  page: number = 1
): Promise<MoviesWithPagination | null> => {
  const apiUrl = "https://api.themoviedb.org/3/discover/movie";
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${env.api_key}`,
  };

  try {
    const response = await axios.get<MoviesWithPagination>(apiUrl, {
      headers,
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        sort_by: "popularity.desc",
        with_keywords,
        with_genres,
        year,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making the GET request:", error);
    return null;
  }
};
