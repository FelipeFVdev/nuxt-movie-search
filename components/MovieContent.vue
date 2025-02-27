<script lang="ts" setup>
const moviesStore = useMoviesStore();
const { getMovies } = moviesStore;
const { dataMovies, paginationMovies, page } = storeToRefs(moviesStore);
</script>

<template>
  <section class="w-full h-full">
    <UiContainer>
      <header class="mt-14 mb-5">
        <p class="text-3xl">Feature today</p>
      </header>

      <article class="flex justify-center">
        <ClientOnly>
          <MovieContentCard />

          <MovieContentMobile class="lg:hidden" />
        </ClientOnly>
      </article>

      <article class="flex items-center justify-center mt-10">
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
