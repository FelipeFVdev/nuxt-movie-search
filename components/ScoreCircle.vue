<script lang="ts" setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
});

const colorScore = computed(() => {
  if (props.score <= 4) return "text-red-500";
  if (props.score > 4 && props.score < 7) return "text-yellow-500";
  return "text-green-500";
});
</script>

<template>
  <div class="relative top-[-24px] w-12 h-12 ms-3">
    <svg class="w-full h-full rounded-full bg-white" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        class="text-gray-200 stroke-current"
        stroke-width="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      ></circle>
      <!-- Progress circle -->
      <circle
        :class="`${colorScore} stroke-current`"
        stroke-width="10"
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke-dasharray="251.2"
        :stroke-dashoffset="`calc(251.2px - (251.2px * (${score} * 10)) / 100)`"
      ></circle>

      <!-- Center text -->
      <text
        x="50"
        y="50"
        font-size="28"
        text-anchor="middle"
        alignment-baseline="middle"
        class="font-bold"
      >
        {{ score.toFixed(1) }}
      </text>
    </svg>
  </div>
</template>

<style></style>
