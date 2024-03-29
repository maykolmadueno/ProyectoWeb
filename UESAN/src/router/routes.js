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
  {
    path: "/ServicioFotos",
    component: () => import("components/Servicios/CrearServicioFoto.vue"),
  },

  {
    path: "/ServicioVideos",
    component: () => import("components/Servicios/CrearServicioVideos.vue"),
  },

  {
    path: "/ServicioCC",
    component: () => import("components/Servicios/CrearCircuitoCerrado.vue"),
  },

  {
    path: "/ServicioStream",
    component: () => import("components/Servicios/CrearServicioStreaming.vue"),
  },

  {
    path: "/OrdenesServicios",
    component: () => import("components/Orden/OrdenesServicios.vue"),
  },

  {
    path: "/CreateEventos",
    component: () => import("components/CreateEventos.vue"),
  },

  {
    path: "/VistaEventosUsuario",
    component: () =>
      import("components/Vistas/VistasEventosUsuario/VistaEventosUsuario.vue"),
  },

  {
    path: "/AdminPrincipal",
    component: () => import("pages/PrincipalAdmin.vue"),
  },

  {
    path: "/detalleEventoVista",
    component: () => import("components/Orden/DetalleEvento.vue"),
  },

  {
    path: "/registroUsuario",
    component: () => import("pages/RegistroUsuario.vue"),
  },

  {
    path: "/modificarElemento",
    component: () => import("components/Vistas/modificarElementos.vue"),
  },
];

export default routes;
