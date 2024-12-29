<script lang="ts" setup>
const colorMode = useColorMode();

const iconTheme = ref("");

onMounted(() => {
  iconTheme.value =
    colorMode.value === "dark" ? "lucide:sun-medium" : "lucide:moon";
});

const toggleIcon = () => {
  iconTheme.value =
    iconTheme.value === "lucide:sun-medium"
      ? "lucide:moon"
      : "lucide:sun-medium";
};

const moviesStore = useMoviesStore();
const { handleSearch, handleHome } = moviesStore;
const { searchString } = storeToRefs(moviesStore);
</script>
<template>
  <header class="z-20 lg:border-b bg-foreground/5 backdrop-blur-sm">
    <UiContainer class="flex h-16 items-center justify-between lg:h-20">
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="flex items-center gap-3" @click="handleHome">
          <Icon name="lucide:clapperboard" class="h-5 w-5" />
          <span class="font-semibold lg:text-lg">Movie Search</span>
        </NuxtLink>
      </div>

      <div class="lg:hidden flex items-center gap-2">
        <UiButton
          @click="
            $colorMode.preference =
              $colorMode.value == 'dark' ? 'light' : 'dark'
          "
          size="icon-sm"
          variant="ghost"
          tittle="Toggle Theme"
        >
          <span class="sr-only">Toggle Theme</span>
          <Icon :name="iconTheme" @click="toggleIcon" class="h-5 w-5" />
        </UiButton>
        <UiSheet>
          <UiSheetTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <Icon name="lucide:menu" class="h-5 w-5" />
            </UiButton>
            <UiSheetContent class="w-[90%] p-0">
              <template #content>
                <UiSheetTitle class="sr-only" title="Mobile menu" />
                <UiSheetDescription class="sr-only" description="Mobile menu" />
                <UiSheetX class="z-20" />

                <UiScrollArea class="h-full p-5">
                  <div class="flex flex-col gap-2">
                    <UiButton
                      variant="ghost"
                      class="justify-start text-base"
                      to="#"
                      >Home</UiButton
                    >

                    <UiButton
                      variant="ghost"
                      class="justify-start text-base"
                      to="#"
                      >Pricing</UiButton
                    >

                    <UiGradientDivider class="my-5" />

                    <UiGradientDivider class="my-5" />

                    <UiButton to="#">Sign up</UiButton>
                    <UiButton variant="outline" to="#">Log in</UiButton>
                  </div>
                </UiScrollArea>
              </template>
            </UiSheetContent>
          </UiSheetTrigger>
        </UiSheet>
      </div>
      <div class="hidden items-center gap-3 lg:flex">
        <div class="px-4">
          <UiInput
            v-model="searchString"
            placeholder="Search for the movie name..."
            @keyup.enter="handleSearch"
            @change="handleSearch"
          />
        </div>
        <UiButton
          @click="
            $colorMode.preference =
              $colorMode.value == 'dark' ? 'light' : 'dark'
          "
          size="icon-sm"
          variant="ghost"
          tittle="Toggle Theme"
        >
          <span class="sr-only">Toggle Theme</span>
          <Icon :name="iconTheme" @click="toggleIcon" class="h-5 w-5" />
        </UiButton>
        <UiButton to="#" variant="ghost" size="sm">Log in</UiButton>
        <UiButton to="#" size="sm">Sign up</UiButton>
      </div>
    </UiContainer>

    <div class="lg:hidden">
      <UiInput
        class="max-w-[800px] rounded-none border-none"
        placeholder="Search for the movie name..."
      />
    </div>
  </header>
</template>
