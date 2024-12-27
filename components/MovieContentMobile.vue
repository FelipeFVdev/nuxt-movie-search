<script lang="ts" setup>
import type { CarouselApi } from "~/composables/useCarousel";
import Autoplay from "embla-carousel-autoplay";

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
  <div class="w-auto">
    <UiCarousel
      class="relative lg:max-w-[500px] max-w-xs"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <UiCarouselContent>
        <UiCarouselItem
          class="lg:flex-[0_0_500px]"
          v-for="(_, index) in 10"
          :key="index"
          grab-cursor
        >
          <div class="p-1">
            <UiCard>
              <UiCardContent
                class="flex aspect-[2/3] items-center justify-center p-6"
              >
                <span class="text-4xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious class="hidden lg:flex" />
      <UiCarouselNext class="hidden lg:flex" />
    </UiCarousel>

    <UiCarousel
      class="relative w-full lg:max-w-[500px] max-w-xs"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <UiCarouselContent class="ml-0 flex gap-1">
        <UiCarouselItem
          v-for="(_, index) in 10"
          :key="index"
          class="basis-1/4 cursor-pointer pl-0"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <UiCard>
              <UiCardContent
                class="flex aspect-square items-center justify-center p-6"
              >
                <span class="text-4xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
    </UiCarousel>
  </div>
</template>

<style></style>
