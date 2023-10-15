<template>
  <form
    class="flex gap-2 bg-indigo-500 dark:bg-zinc-950 py-3 pl-6 pr-4 rounded-full text-zinc-100"
    @submit.prevent="sendMessage"
  >
    <input
      type="text"
      placeholder="Type something..."
      v-model="input"
      class="flex-grow resize-none bg-transparent border-b border-b-transparent focus:outline-none dark:focus:border-b-zinc-500 focus:border-b-zinc-200"
    />
    <button
      class="w-10 h-10 border-2 rounded-full border-zinc-200 dark:border-zinc-100 flex items-center justify-center overflow-hidden bg-emerald-500 disabled:pointer-events-none disabled:opacity-50"
      :disabled="input.length < 1"
    >
      <i class="fa-solid fa-spinner fa-spin-pulse w-[26px]" v-if="loading"></i>
      <i class="fa-solid fa-rocket" v-else></i>
    </button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useChatStore } from "@/composables/useChatStore";
import { useAuthStore } from "@/composables/useAuthStore";

const input = ref("");
const chat = useChatStore();
const auth = useAuthStore();
const userID = ref("");
const loading = ref(false);

onMounted(() => {
  userID.value = auth.sessionData.user.id;
});

const sendMessage = async () => {
  if (input.value) {
    loading.value = true;
    await chat.createNewMessages(userID.value, input.value);
    input.value = "";
    loading.value = false;
  }
};
</script>

<style scoped></style>
