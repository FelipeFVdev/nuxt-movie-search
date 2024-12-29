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
  const discoverOrSearch = ref<string>("discover");

  const isLoading = ref<boolean>(false);
  const dataMovie = ref<Results[] | null>(null);

  const paginationMovies = ref<Movies | null>(null);
  const page = ref<number>(1);

  async function getMovies() {
    const runtimeConfig = useRuntimeConfig();
    const hasQuery =
      searchString.value.length > 0 ? `&query=${searchString.value}` : "";
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://api.themoviedb.org/3/${discoverOrSearch.value}/movie?page=${page.value}${hasQuery}&api_key=${runtimeConfig.public.apiKey}`
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
            poster_path:
              movie.poster_path != null
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500",
          };
        });

      setTimeout(() => {
        isLoading.value = false;
      }, 100);
    } catch (error) {
      console.log(error);
      useSonner.error("", { description: "Server Error" });
    }
  }

  async function handleSearch() {
    discoverOrSearch.value = "search";
    await getMovies();
  }

  async function handleHome() {
    discoverOrSearch.value = "discover";
    searchString.value = "";
    await getMovies();
  }

  return {
    getMovies,
    dataMovie,
    isLoading,
    paginationMovies,
    page,
    searchString,
    discoverOrSearch,
    handleSearch,
    handleHome,
  };
});
