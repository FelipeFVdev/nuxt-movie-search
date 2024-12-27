<script lang="ts" setup>
const gridClasses = computed(() => {
  return "hidden lg:grid w-full grid-cols-5 grid-rows-2 gap-4";
});

const moviesStore = useMoviesStore();
const { getMovies, searchMovies } = moviesStore;
const { dataMovie, paginationMovies, page } = storeToRefs(moviesStore);

onMounted(async () => {
  await getMovies();
});
</script>

<template>
  <section class="w-full h-full">
    <header class="mt-14 mb-5">
      <p class="text-3xl">Feature today</p>
    </header>

    <article class="flex justify-center">
      <ClientOnly>
        <div :class="gridClasses">
          <template v-if="dataMovie && dataMovie.length">
            <UiCard
              class="border-none"
              v-for="(card, index) in dataMovie"
              :key="index"
            >
              <UiCardContent class="p-0">
                <img
                  class="rounded-lg"
                  :src="card.poster_path"
                  :alt="card.title"
                />
                <ScoreCircle :score="card.vote_average" />
              </UiCardContent>
              <UiCardFooter class="relative p-0 top-[-12px]">
                <div>
                  <p>{{ card.title }}</p>
                  <p class="mt-2 text-muted-foreground">
                    {{ card.release_date }}
                  </p>
                </div>
              </UiCardFooter>
            </UiCard>
          </template>
          <template v-else>
            <div v-for="index in 10" :key="index">
              <UiSkeleton class="rounded-lg w-60 h-80 mb-6" />
              <UiSkeleton class="h-4 w-16 mb-4" />
              <UiSkeleton class="h-4 w-28 mb-2" />
            </div>
          </template>
        </div>

        <MovieContentMobile class="lg:hidden" />
      </ClientOnly>
    </article>

    <article class="flex items-center justify-center mt-10">
      <UiPagination
        v-if="
          paginationMovies?.total_pages !== undefined &&
          paginationMovies.total_pages <= 10
        "
        v-model:page="page"
        @change="searchMovies"
        :total="paginationMovies?.total_pages"
        :sibling-count="1"
      />
    </article>
  </section>
</template>
