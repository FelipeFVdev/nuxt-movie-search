<script lang="ts" setup>
const gridClasses = computed(() => {
  return "hidden lg:grid w-full grid-cols-5 grid-rows-2 gap-4";
});

const moviesStore = useMoviesStore();
const { getMovies } = moviesStore;
const { dataMovie, isLoading } = storeToRefs(moviesStore);

onMounted(async () => {
  await getMovies();
});
</script>
<template>
  <div :class="gridClasses">
    <template v-if="isLoading">
      <div v-for="index in 10" :key="index">
        <UiSkeleton class="rounded-lg w-60 h-80 mb-6" />
        <UiSkeleton class="h-4 w-16 mb-4" />
        <UiSkeleton class="h-4 w-28 mb-2" />
      </div>
    </template>
    <template v-else>
      <template v-for="(card, index) in dataMovie" :key="index">
        <UiCard class="border-none">
          <UiCardContent class="p-0">
            <img class="rounded-lg" :src="card.poster_path" :alt="card.title" />
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
    </template>
  </div>
</template>

<style></style>
