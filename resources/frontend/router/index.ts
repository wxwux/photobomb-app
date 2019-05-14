// tslint:disable-next-line: ordered-imports
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const protectRequests: AxiosInstance = axios.create({
  baseURL: "/api"
});

const router: VueRouter = new VueRouter({
  // mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const isPublicRoute: boolean = to.matched.some((record) => record.meta.public);
  if (isPublicRoute === false) {
    next();
  }

  protectRequests
    .get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response: AxiosResponse) => {
      next();
    })
    .catch((error: AxiosError) => {
      router.replace("/auth");
      localStorage.removeItem("token");
    });
});

export default router;
