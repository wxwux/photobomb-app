import { RouteConfig } from "vue-router";

import album from "../components/pages/album";
import auth from "../components/pages/auth";
import main from "../components/pages/main";

const routes: RouteConfig[] = [
  {
    component: main,
    path: "/",
    meta: {
      public: true
    }
  },
  {
    component: album,
    path: "/album/:id"
  },
  {
    path: "/auth",
    component: auth
  }
];

export default routes;
