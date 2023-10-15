<template>
  <div
    class="p-3 rounded-lg flex flex-col gap-2 w-3/4"
    :class="{
      'self-end bg-emerald-300 dark:bg-emerald-600': personal,
      'self-start bg-zinc-300 dark:bg-zinc-700': !personal,
    }"
    :style="{
      opacity: (index + 1) / count,
    }"
  >
    <div class="flex gap-2 leading-none items-center">
      <Avatar :avatar_url="avatar_url" :full_name="full_name" />
      <div>
        <h4 class="font-bold">{{ full_name }}</h4>
        <h5 class="text-xs opacity-50">{{ timestamp }}</h5>
      </div>
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "@/supabase";
import Avatar from "@/views/chat/Avatar.vue";

const props = defineProps({
  text: String,
  timestamp: String,
  user_id: String,
  personal: Boolean,
  index: Number,
  count: Number,
});

const full_name = ref("");
const avatar_url = ref("");

onMounted(async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", props.user_id)
    .single();
  if (!error) {
    full_name.value = data.full_name;
    avatar_url.value = data.avatar_url;
  }
});
</script>

<style scoped></style>
