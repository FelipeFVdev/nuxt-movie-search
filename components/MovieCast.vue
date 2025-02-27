<script lang="ts" setup>
interface CastMember {
  profile_path: string;
  name: string;
  character: string;
}

const props = defineProps<{
  cast: CastMember[];
}>();
</script>

<template>
  <div class="flex px-12 py-4">
    <UiCarousel class="relative w-full" :opts="{ align: 'start' }">
      <UiCarouselContent class="-ml-1">
        <UiCarouselItem
          v-for="(card, index) in props.cast"
          :key="index"
          grab-cursor
          class="pl-1 md:basis-1/2 lg:basis-1/3"
        >
          <div class="p-1">
            <UiCard class="border-none">
              <UiCardContent class="p-0">
                <img
                  class="rounded-lg"
                  :src="`https://image.tmdb.org/t/p/original/${card?.profile_path}`"
                  :alt="card?.name"
                />
              </UiCardContent>

              <UiCardFooter class="mt-2 p-2">
                <div>
                  <span class="text-sm font-semibold">{{ card?.name }}</span>
                  <p class="text-sm text-muted-foreground">
                    {{ card?.character }}
                  </p>
                </div>
              </UiCardFooter>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>
  </div>
</template>
