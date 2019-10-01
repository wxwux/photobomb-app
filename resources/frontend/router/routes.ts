import { RouteConfig } from "vue-router";


const routes: RouteConfig[] = [
  {
    component: () => import("../components/pages/main.vue"),
    path: "/",
    meta: {
      public: true
    }
  },
  {
    component: () =>  import("../components/pages/album"),
    path: "/album/:id"
  },
  {
    path: "/auth",
    component: () => import("../components/pages/auth"),
  }
];

export default routes;
