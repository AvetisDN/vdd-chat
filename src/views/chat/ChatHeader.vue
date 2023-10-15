<template>
  <div
    class="flex justify-between items-center bg-indigo-500 dark:bg-zinc-950 py-3 px-5 rounded-full text-zinc-100"
  >
    <div class="flex items-baseline gap-1 leading-none">
      <i class="fa-solid fa-dungeon text-xl"></i>
      <span class="font-bold uppercase text-lg">Dungeon</span>
    </div>
    <div class="flex gap-3">
      <Avatar :full_name="full_name" :avatar_url="avatar_url" />
      <button class="w-10 h-10 rounded-full" @click="logOut">
        <i
          class="fa-solid fa-spinner fa-spin-pulse w-[26px]"
          v-if="loading"
        ></i>
        <i class="fa-solid fa-right-from-bracket" v-else></i>
      </button>
    </div>
    <div
      class="fixed bottom-4 p-4 rounded w-5/6 text-zinc-100 bg-red-500"
      v-if="errorResponse"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { supabase } from "@/supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Avatar from "@/views/chat/Avatar.vue";

const loading = ref(false);
const errorResponse = ref(false);
const message = ref("");

const props = defineProps({
  avatar_url: String,
  full_name: String,
});

const router = useRouter();
const logOut = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    errorResponse.value = false;
    await router.push({ name: "Login" });
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
