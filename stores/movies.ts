import { ref } from "vue";
import { defineStore } from "pinia";
import { useDateFormat } from "@vueuse/core";
import { useRuntimeConfig } from "#app";

interface Results {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Movies {
  results: Results[];
  total_pages: number;
  total_results: number;
}

export const useMoviesStore = defineStore("movies", () => {
  const searchString = ref<string>("");
  const dataMovie = ref<Results[] | null>(null);
  const paginationMovies = ref<Movies | null>(null);
  const page = ref<number>(1);

  async function getMovies() {
    const runtimeConfig = useRuntimeConfig();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${page.value}&api_key=${runtimeConfig.public.apiKey}`
      );

      const data: Movies = await response.json();

      paginationMovies.value = data;
      dataMovie.value = data.results
        .filter((_: any, index: any) => index < 10)
        .map((movie: any) => {
          return {
            ...movie,
            id: movie.id,
            title: movie.title,
            release_date: useDateFormat(
              new Date(movie.release_date),
              "MMMM YYYY",
              { locales: "en-US" }
            ).value,
            vote_average: movie.vote_average,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        });
    } catch (error) {
      console.log(error);
      useSonner.error("", { description: "Server Error" });
    }
  }

  async function searchMovies() {
    const runtimeConfig = useRuntimeConfig();
    try {
      // if (!searchString.value) {
      //   useSonner.warning("", { description: "The search cannot be empty" });
      // }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?page=1&query=${searchString.value}&api_key=${runtimeConfig.public.apiKey}`
      );

      const data = await response.json();

      paginationMovies.value = data;
      dataMovie.value = data.results.map((movie: any) => {
        return {
          ...movie,
          id: movie.id,
          title: movie.title,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMMM YYYY",
            { locales: "en-US" }
          ).value,
          vote_average: movie.vote_average,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
      });
    } catch (error) {
      console.log(error);
      useSonner.error("", { description: "Server Error" });
    }
  }

  return {
    getMovies,
    dataMovie,
    paginationMovies,
    searchMovies,
    searchString,
    page,
  };
});
