<script lang="ts" setup>
const moviesStore = useMoviesStore();
const { getMovies } = moviesStore;
const { dataMovies, paginationMovies, page } = storeToRefs(moviesStore);
</script>

<template>
  <section class="h-full w-full">
    <UiContainer>
      <header class="mb-5 mt-14">
        <p class="text-3xl">Trending Week</p>
      </header>

      <article class="flex justify-center">
        <ClientOnly>
          <MovieContentCard />

          <MovieContentMobile class="lg:hidden" />
        </ClientOnly>
      </article>

      <article class="mt-10 flex items-center justify-center">
        <UiPagination
          v-if="dataMovies"
          v-model:page="page"
          :total="paginationMovies?.total_pages"
          :sibling-count="1"
          @click="getMovies"
        />
      </article>
    </UiContainer>
  </section>
</template>
