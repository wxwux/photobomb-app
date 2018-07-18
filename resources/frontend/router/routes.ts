import { RouteConfig } from "vue-router";

import auth from "../components/pages/auth.vue";
import main from "../components/pages/main.vue";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: auth,
  },
  {
    component: main,
    path: "/about"
  }
];

export default routes;
