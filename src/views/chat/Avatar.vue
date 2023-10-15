<template>
  <div>
    <button
      class="w-10 h-10 border-2 rounded-full border-zinc-200 dark:border-zinc-500 flex items-center justify-center overflow-hidden"
      :title="full_name"
      :style="{
        backgroundColor: randomColor({
          luminosity: 'dark',
        }),
      }"
    >
      <span v-if="!avatar_url" class="font-semibold">
        {{ full_name?.trim().charAt(0) }}
      </span>
      <img
        v-else
        :src="avatar_url"
        :alt="full_name"
        class="w-full h-full object-cover"
      />
    </button>
  </div>
</template>

<script setup>
import randomColor from "randomcolor";

const props = defineProps({
  avatar_url: String,
  full_name: String,
});
</script>

<style scoped></style>
