import { createRouter, createWebHistory } from "vue-router";
import auth from "@/middleware/auth";
import redirect from "@/middleware/redirect";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Chat",
      component: () => import("@/views/chat/List.vue"),
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/Login.vue"),
      meta: {
        middleware: redirect,
      },
    },
  ],
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) {
    return context.next;
  }
  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware() });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router;
