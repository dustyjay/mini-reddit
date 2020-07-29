const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

export default routes;
