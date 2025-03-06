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
const { handleHome } = moviesStore;
</script>
<template>
  <header class="z-20 bg-foreground/5 backdrop-blur-sm lg:border-b">
    <UiContainer
      class="flex h-16 max-w-screen-2xl items-center justify-between gap-4 lg:h-20"
    >
      <div class="flex items-center justify-between">
        <NuxtLink to="/" @click="handleHome">
          <img src="/blue_short.svg" alt="Movie Search" width="160" />
        </NuxtLink>
      </div>

      <nav class="space-x-6 text-wrap text-sm lg:flex">
        <NuxtLink href="#" class="hover:text-muted-foreground">
          Movies
        </NuxtLink>
        <NuxtLink href="#" class="hover:text-muted-foreground">
          TV Shows
        </NuxtLink>
        <NuxtLink href="#" class="hover:text-muted-foreground">
          Celebs
        </NuxtLink>
        <NuxtLink href="#" class="hover:text-muted-foreground">
          Watch
        </NuxtLink>
        <NuxtLink href="#" class="hover:text-muted-foreground">
          Awards
        </NuxtLink>
        <NuxtLink href="#" class="hover:text-muted-foreground">
          Community
        </NuxtLink>
      </nav>

      <MovieHeaderSearch />

      <div class="hidden items-center justify-center gap-2 lg:flex">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger asChild class="flex items-center">
            <Button variant="ghost" class="px-2 text-sm">
              EN
              <Icon name="lucide:chevron-down" class="ml-1 h-4 w-4" />
            </Button>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="start">
            <UiDropdownMenuItem>English</UiDropdownMenuItem>
            <UiDropdownMenuItem>Spanish</UiDropdownMenuItem>
            <UiDropdownMenuItem>French</UiDropdownMenuItem>
            <UiDropdownMenuItem>Deutsch</UiDropdownMenuItem>
            <UiDropdownMenuItem>Italian</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
        <UiButton to="#" variant="ghost" size="sm"> Login</UiButton>
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
      </div>

      <MovieHeaderMobile />
    </UiContainer>

    <div class="lg:hidden">
      <UiInput
        class="max-w-[800px] rounded-none border-none"
        placeholder="Search for the movie name..."
      />
    </div>
  </header>
</template>
