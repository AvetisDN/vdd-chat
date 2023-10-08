<script setup></script>

<template>
  <div
    class="bg-zinc-200 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-medium h-screen flex items-center justify-center"
  >
    <div
      class="bg-zinc-100 dark:bg-zinc-900 p-3 w-full max-w-md h-full sm:h-5/6 rounded-none sm:rounded-md"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
