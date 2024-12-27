<script setup lang="ts">
import type MovieHeader from "~/components/MovieHeader.vue";
</script>

<template>
  <div>
    <MovieHeader />

    <section class="flex h-full w-screen">
      <slot />
    </section>
  </div>
</template>
