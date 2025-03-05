<script lang="ts" setup>
const router = useRouter();
const gridClasses = computed(() => {
  return "hidden lg:grid w-full grid-cols-5 grid-rows-2 gap-4";
});

const moviesStore = useMoviesStore();
const { getMovies } = moviesStore;
const { dataMovies, isLoading } = storeToRefs(moviesStore);

onMounted(async () => {
  await getMovies();
});
</script>
<template>
  <div :class="gridClasses">
    <template v-if="isLoading">
      <div v-for="index in 10" :key="index">
        <UiSkeleton class="mb-6 h-80 w-60 rounded-lg" />
        <UiSkeleton class="mb-4 h-4 w-16" />
        <UiSkeleton class="mb-2 h-4 w-28" />
      </div>
    </template>
    <template v-else>
      <template v-for="(card, index) in dataMovies" :key="index">
        <UiCard
          class="cursor-pointer shadow-lg dark:shadow-secondary/50"
          @click="router.push(`/${card.id}`)"
        >
          <UiCardContent class="p-0">
            <img
              class="min-h-[358.19px] rounded-t-lg"
              :src="card.poster_path"
              :alt="card.title"
            />
            <ScoreCircle :score="card.vote_average" />
          </UiCardContent>
          <UiCardFooter class="relative mt-[-8px] p-4">
            <div>
              <p>{{ card.title }}</p>
              <p class="text-muted-foreground">
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
