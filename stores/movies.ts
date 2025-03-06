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

interface Cast {
  profile_path: string;
  name: string;
  id: number;
  character: string;
  cast?: Cast[];
}

interface Credits {
  cast: Cast[];
}

interface Genres {
  name: string;
}

interface Videos {
  results: VideoResults[];
}

interface VideoResults {
  key: string;
  name: string;
}

interface MovieData {
  title: string;
  backdrop_path: string;
  cast: Cast[];
  release_date: string;
  runtime: number;
  credits: Credits;
  budget: number;
  genres: Genres[];
  vote_average: number;
  overview: string;
  videos: Videos;
}

export const useMoviesStore = defineStore("movies", () => {
  const searchString = ref<string>("");
  const trendingOrSearch = ref<string>("trending/movie/week");

  const isLoading = ref<boolean>(true);
  const dataMovies = ref<Results[] | null>(null);
  const dataMovieById = ref<MovieData | null>(null);

  const paginationMovies = ref<Movies | null>(null);
  const page = ref<number>(1);

  const el = ref(null);
  const { width } = useElementSize(el);
  const heightVideo = computed(() => (315 * width.value) / 560);

  async function getMovies() {
    const config = useRuntimeConfig();
    const hasQuery =
      searchString.value.length > 0 ? `&query=${searchString.value}` : "";

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${trendingOrSearch.value}?page=${page.value}${hasQuery}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${config.public.apiKey}`,
          },
        },
      );

      const data: Movies = await response.json();

      paginationMovies.value = data;
      dataMovies.value = data.results
        .filter((_: any, index: any) => index < 10)
        .map((movie: any) => {
          return {
            ...movie,
            id: movie.id,
            title: movie.title,
            release_date: useDateFormat(
              new Date(movie.release_date),
              "MMM DD YYYY",
              { locales: "en-US" },
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
      }, 2500);
    } catch (error) {
      console.log(error);
      useSonner.error("", { description: "Server Error" });
    }
  }

  async function getDataMovie(id: string) {
    const config = useRuntimeConfig();
    try {
      const { data: movie, status } = await useFetch(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${config.public.apiKey}`,
          },
          transform(input: MovieData) {
            return {
              title: input.title,
              backdrop_path: input.backdrop_path,
              cast: input.credits.cast.filter((_: any, index) => index < 8),
              release_date: useDateFormat(
                new Date(input.release_date),
                "MMM DD YYYY",
                { locales: "en-US" },
              ).value,
              runtime: `${Math.floor(input.runtime / 60).toString()}h ${input.runtime % 60}min`,
              credits: input.credits,
              budget: input.budget.toLocaleString("en-US", {
                currency: "USD",
                style: "currency",
                currencyDisplay: "symbol",
              }),
              genres: input.genres.map((genre) => genre.name).join(", "),
              vote_average: input.vote_average,
              overview: input.overview,
              videos: getMovieScr(input.videos.results),
            };
          },
        },
      );

      dataMovieById.value = movie.value;

      setTimeout(() => {
        isLoading.value = false;
      }, 2500);
    } catch (error) {
      console.log(error);
      useSonner.error("", { description: "Server Error" });
    }
  }

  function getMovieScr(videos: any) {
    const movieInfo = videos.find((video: any) =>
      video.name.toLowerCase().includes("official trailer"),
    );

    if (movieInfo) {
      return `https://www.youtube.com/embed/${movieInfo.key}`;
    } else {
      return null;
    }
  }

  async function handleSearch() {
    trendingOrSearch.value = "search/movie";
    await getMovies();
  }

  async function handleHome() {
    trendingOrSearch.value = "trending/movie/week";
    searchString.value = "";
    await getMovies();
  }

  return {
    getMovies,
    dataMovies,
    isLoading,
    paginationMovies,
    page,
    searchString,
    trendingOrSearch,
    handleSearch,
    handleHome,
    getDataMovie,
    dataMovieById,
    el,
    heightVideo,
  };
});
