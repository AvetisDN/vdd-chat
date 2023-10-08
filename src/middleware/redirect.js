import { useAuthStore } from "@/composables/useAuthStore";

export default function redirect({ next, router }) {
  const authStore = useAuthStore();

  authStore.getSession().then(() => {
    if (authStore.sessionData) {
      next({ path: "/" });
    } else {
      next();
    }
  });
}
