<script lang="ts" setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  class: {
    type: String,
    default: "relative top-[-24px] w-12 h-12 ms-3",
  },
  size: {
    type: Number,
    default: 50,
  },
  strokeWidth: {
    type: Number,
    default: 8,
  },
  precision: {
    type: Number,
    default: 0,
  },
});

const styles = tv({});

const colorScore = computed(() => {
  if (props.score <= 4) return "text-red-500";
  if (props.score > 4 && props.score < 7) return "text-yellow-500";
  return "text-green-500";
});

// Calculate the radius (accounting for stroke width)
const radius = computed(() => 50 - props.strokeWidth / 2);

// Calculate the circumference of the circle
const circumference = computed(() => 2 * Math.PI * radius.value);

// Calculate the dash offset based on the rating value
const dashOffset = computed(() => {
  const percentage = (props.score * 10) / 100;
  return circumference.value - circumference.value * Math.min(percentage, 1);
});

// Format the display value based on precision
const displayValue = computed(() => {
  const scoreMultiplier = props.score * 10;
  return scoreMultiplier.toFixed(props.precision);
});

// Determine text size based on the component size
const textSizeClass = computed(() => {
  if (props.size < 60) return "text-sm";
  if (props.size < 80) return "text-base";
  if (props.size < 120) return "text-xl";
  return "text-2xl";
});
</script>

<template>
  <div :class="styles({ class: props.class })">
    <div
      class="relative inline-flex h-full w-full items-center justify-center rounded-full bg-secondary"
      :style="`width: ${size}px; height: ${size}px;`"
    >
      <!-- Background circle -->
      <svg
        class="absolute inset-0 h-full w-full rounded-full"
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="transparent"
          :stroke-width="strokeWidth"
          :class="`${colorScore} stroke-current opacity-20`"
        />
      </svg>

      <!-- Foreground circle (progress) -->
      <svg
        class="absolute inset-0 -rotate-90 transform"
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="transparent"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
          :class="`${colorScore} stroke-current`"
        />
      </svg>
      <!-- Rating text -->
      <div class="mr-1 flex flex-col items-center justify-center text-center">
        <span :class="textSizeClass" class="font-bold">
          {{ displayValue }}
          <Icon name="lucide:percent" class="absolute ml-[1px] mt-1 h-2 w-2" />
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
