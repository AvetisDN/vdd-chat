<template>
  <div class="flex h-full items-center justify-center flex-col gap-8">
    <div class="flex flex-col gap-2 items-center">
      <i class="fa-solid fa-dungeon text-9xl"></i>
      <h1 class="font-black text-2xl uppercase tracking-wider">Dungeon</h1>
    </div>
    <button
      class="bg-indigo-500 leading-none py-4 px-6 text-xl flex items-center gap-2 rounded-full uppercase font-bold tracking-wider"
      @click="login('discord')"
    >
      <i class="fa-solid fa-spinner fa-spin-pulse w-[26px]" v-if="loading"></i>
      <i class="fa-brands fa-discord" v-else></i>
      Join
    </button>
    <button
      class="bg-red-500 leading-none py-4 px-6 text-xl flex items-center gap-2 rounded-full uppercase font-bold tracking-wider"
      @click="login('google')"
    >
      <i class="fa-solid fa-spinner fa-spin-pulse w-[26px]" v-if="loading"></i>
      <i class="fa-brands fa-google" v-else></i>
      Join
    </button>
    <div
      class="fixed bottom-4 p-4 rounded w-5/6 text-zinc-100 bg-red-500"
      v-if="errorResponse"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/composables/useAuthStore";
import { ref } from "vue";
import { supabase } from "@/supabase";

const auth = useAuthStore();

const loading = ref(false);
const errorResponse = ref(false);
const message = ref("");

const login = async (provider) => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      throw error;
    }
    errorResponse.value = false;
  } catch (error) {
    if (error instanceof Error) {
      errorResponse.value = true;
      message.value = error.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
