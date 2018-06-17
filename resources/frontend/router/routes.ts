import auth from "../components/pages/auth.vue";
import main from "../components/pages/main.vue";

const routes: any[] = [
  {
    component: auth,
    path: "/"
  },
  {
    component: main,
    path: "/about"
  }
];

export default routes;
