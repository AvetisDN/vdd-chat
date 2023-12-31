import { useAuthStore } from "@/composables/useAuthStore";

export default function auth({ next, router }) {
  const authStore = useAuthStore();

  authStore.getSession().then(() => {
    if (authStore.sessionData) {
      next();
    } else {
      next({ path: "/login" });
    }
  });
}
