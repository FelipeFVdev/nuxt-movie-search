<script lang="ts" setup>
const moviesStore = useMoviesStore();
const { handleSearch } = moviesStore;
const { searchString } = storeToRefs(moviesStore);
</script>
<template>
  <div class="flex w-auto items-center px-4">
    <div class="relative flex items-center">
      <div
        class="flex h-10 items-center rounded-md rounded-r-none border border-r-0 border-foreground/5 bg-secondary"
      >
        <UiDropdownMenu>
          <UiDropdownMenuTrigger asChild class="flex items-center">
            <Button variant="ghost" class="h-8 pr-2 text-center">
              <span class="ml-4"> All </span>
              <Icon name="lucide:chevron-down" class="ml-2 size-4" />
            </Button>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="start">
            <UiDropdownMenuItem>Titles</UiDropdownMenuItem>
            <UiDropdownMenuItem>TV Episodes</UiDropdownMenuItem>
            <UiDropdownMenuItem>Celebs</UiDropdownMenuItem>
            <UiDropdownMenuItem>Companies</UiDropdownMenuItem>
            <UiDropdownMenuItem>Keywords</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
      <UiInput
        v-model="searchString"
        placeholder="Search for a movie..."
        class="min-w-[500px] rounded-l-none border-l-0 border-foreground/5 bg-secondary outline-none placeholder:text-muted-foreground hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        @keyup.enter="handleSearch"
        @change="handleSearch"
      />

      <Icon name="lucide:search" class="w-4s absolute right-0 mr-4 h-4" />
    </div>
  </div>
</template>

<style></style>
