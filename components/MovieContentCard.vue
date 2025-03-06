<script lang="ts" setup>
const router = useRouter();
const moviesStore = useMoviesStore();
const { getMovies } = moviesStore;
const { dataMovies, isLoading } = storeToRefs(moviesStore);

const gridClasses = computed(() => {
  return `hidden lg:grid w-full ${isLoading ? "grid-rows-1" : "grid-rows-2"} grid-cols-5 gap-6`;
});

onMounted(async () => {
  await getMovies();
});
</script>
<template>
  <div :class="gridClasses">
    <template v-if="isLoading">
      <div v-for="index in 5" :key="index">
        <UiSkeleton class="mb-12 h-[430px] w-[240px] rounded-lg" />
        <UiSkeleton class="mb-4 h-4 w-16" />
        <UiSkeleton class="mb-2 h-4 w-28" />
      </div>
    </template>
    <template v-else>
      <ClientOnly>
        <template v-for="(card, index) in dataMovies" :key="index">
          <UiCard
            class="transform cursor-pointer border-none bg-foreground/10 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:dark:shadow-secondary"
            @click="router.push(`/${card.id}`)"
          >
            <UiCardHeader class="p-3">
              <img
                class="min-h-[358.19px] rounded-lg"
                :src="card.poster_path"
                :alt="card.title"
              />
            </UiCardHeader>
            <UiCardContent class="relative rounded-b-lg p-4">
              <div class="absolute">
                <ScoreCircle :score="card.vote_average" />
              </div>
              <div>
                <p>{{ card.title }}</p>
                <p class="text-muted-foreground">
                  {{ card.release_date }}
                </p>
              </div>
            </UiCardContent>
          </UiCard>
        </template>
      </ClientOnly>
    </template>
  </div>
</template>

<style></style>
