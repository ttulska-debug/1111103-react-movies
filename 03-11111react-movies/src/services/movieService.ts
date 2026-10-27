import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  query: string
): Promise<Movie[]> {
  const token = import.meta.env.VITE_API_KEY;

  if (!token) {
    throw new Error(
      "TMDB token is missing. Check your .env file."
    );
  }

  const response: AxiosResponse<TMDBResponse> =
    await axios.get<TMDBResponse>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${"VITE_API_KEY"}`,
        },
      }
    );

  return response.data.results;
}