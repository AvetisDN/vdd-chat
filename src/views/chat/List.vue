<template>
  <div class="h-full flex flex-col gap-2">
    <ChatHeader
      :full_name="userData?.user_metadata?.full_name"
      :avatar_url="userData?.user_metadata?.avatar_url"
    />
    <div class="flex-grow flex flex-col py-4 chat-container">
      <el-scrollbar ref="scrollbarRef" class="ps">
        <div ref="msgs" class="flex flex-col w-full flex-grow gap-2 pr-3">
          <Message
            v-for="(message, index) in messages.slice().reverse()"
            :text="message.text"
            :timestamp="message.timestamp"
            :user_id="message.user_id"
            :personal="message.user_id === userData.id"
            :index="index"
            :count="messages.length"
          />
        </div>
      </el-scrollbar>
    </div>
    <SendForm />
  </div>
</template>

<script setup>
import ChatHeader from "@/views/chat/ChatHeader.vue";
import SendForm from "@/views/chat/SendForm.vue";
import { onMounted, ref } from "vue";
import { useChatStore } from "@/composables/useChatStore";
import Message from "@/views/chat/Message.vue";
import { useAuthStore } from "@/composables/useAuthStore";

const chat = useChatStore();
const auth = useAuthStore();
const userData = ref(null);
const messages = ref([]);
const scrollbarRef = ref();
const msgs = ref();
const loadMessages = async () => {
  const loadedMessages = await chat.getMessages(0, 20);
  messages.value = [...loadedMessages];
};

onMounted(async () => {
  userData.value = auth.sessionData.user;
  await loadMessages();
  await chat.onNewMessage((newMessage) => {
    messages.value = [newMessage, ...messages.value];
    setTimeout(() => {
      scrollbarRef.value.setScrollTop(msgs.value.clientHeight);
    }, 300);
  });
  scrollbarRef.value.setScrollTop(msgs.value.clientHeight);
});
</script>

<style scoped>
.chat-container {
  height: 100%;
  max-height: calc(100% - 144px) !important;
}
.ps {
  height: 100%;
}
</style>
