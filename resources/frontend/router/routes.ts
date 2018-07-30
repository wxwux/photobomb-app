import { RouteConfig } from "vue-router";

import auth from "../components/pages/auth.vue";
import main from "../components/pages/main.vue";

const routes: RouteConfig[] = [
  {
    component: main,
    path: "/",
    meta: {
      public: true
    }
  },
  {
    path: "/auth",
    component: auth
  }
];

export default routes;
