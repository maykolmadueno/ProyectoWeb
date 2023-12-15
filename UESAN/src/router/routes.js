const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("components/Inicio/InicioDefault.vue"),
      },
      { path: "login", component: () => import("pages/LoginUE.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/home",
    component: () => import("pages/HomePage.vue"),
  },
  {
    path: "/services",
    component: () => import("pages/ServiciosUE.vue"),
  },
];

export default routes;
