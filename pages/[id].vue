<script lang="ts" setup>
const route = useRoute();

const moviesStore = useMoviesStore();
const { getDataMovie } = moviesStore;
const { dataMovieById, el, heightVideo } = storeToRefs(moviesStore);

const movieId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

await getDataMovie(movieId);
</script>
<template>
  <div>
    <UiContainer>
      <article class="mt-14 flex gap-4">
        <img
          class="max-w-screen-md rounded-lg"
          :src="`https://image.tmdb.org/t/p/original/${dataMovieById?.backdrop_path}`"
          :alt="dataMovieById?.title"
        />
        <div class="grid grid-rows-3 gap-4">
          <div>
            <p class="text-3xl">{{ dataMovieById?.title }}</p>
            <p class="text-base text-muted-foreground">
              {{ dataMovieById?.release_date }} -
              <span
                v-for="(genre, index) in dataMovieById?.genres"
                :key="index"
                v-html="genre"
              >
              </span>
              - {{ dataMovieById?.runtime }}
            </p>
          </div>
          <div class="flex items-center gap-5">
            <ScoreCircle
              class="h-16 w-16"
              :score="dataMovieById?.vote_average ?? 0"
            />
            <span>People rating</span>
          </div>
          <div class="row-span-12">
            <p class="mb-2 text-lg font-bold">Overview</p>
            <span class="text-justify">{{ dataMovieById?.overview }}</span>
          </div>
        </div>
      </article>
      <article class="mt-10 grid grid-cols-2 gap-4">
        <div>
          <span class="text-lg">Cast</span>
          <MovieCast :cast="dataMovieById?.cast ?? []" />
        </div>
        <div class="aspect-video w-full self-stretch md:min-h-96">
          <iframe
            ref="el"
            :src="dataMovieById?.videos"
            frameborder="0"
            width="100%"
            :height="heightVideo"
            :title="dataMovieById?.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="rounded-lg"
          ></iframe>
        </div>
      </article>
    </UiContainer>
  </div>
</template>
