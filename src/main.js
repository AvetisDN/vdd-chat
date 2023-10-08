import "./assets/main.css";

import { createApp, markRaw } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { inject } from "@vercel/analytics";
import router from "@/router";

const pinia = createPinia();
inject();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
