import axios from "axios";
import { env } from "@/envExport";

export interface Movie {
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

export const getMovies = async (query: string): Promise<Movie[]> => {
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
    return response.data.results;
  } catch (error) {
    console.error("Error making the GET request:", error);
    return [];
  }
};
