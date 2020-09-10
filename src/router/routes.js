
const routes = [
  {
   path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/add-cuenta', component: () => import('pages/AddCuenta.vue') },
      { path: '/cuentas', component: () => import('pages/Cuentas.vue') },
      { path: '/add-proyecto', component: () => import('pages/addProyecto.vue') },
      { path: '/proyectos', component: () => import('pages/Proyectos.vue') },
      { path: '/tareas/add-tarea/:idProyecto', component: () => import('pages/addTarea.vue') },
      { path: '/tareas/:id', component: () => import('pages/Tareas.vue') },
      { path: '/add-empresa', component: () => import('pages/AddEmpresa.vue') },
      { path: '/empresas', component: () => import('pages/Empresas.vue') },
      { path: '/categorias', component: () => import('pages/Categorias.vue') },
      { path: '/cotizaciones', component: () => import('pages/Cotizaciones.vue') },
      { path: '/add-cotizacion', component: () => import('pages/AddCotizacion.vue') },

      { path: '/servicios', component: () => import('pages/Servicios.vue') },
      { path: '/add-servicio', component: () => import('pages/AddServicio.vue') },
      { path: '/add-servicio/:id', component: () => import('pages/AddServicio.vue') },

      { path: '/presentaciones', component: () => import('pages/Presentaciones.vue') },
      { path: '/add-presentacion', component: () => import('pages/AddPresentacion.vue') },
      { path: '/update-presentacion/:id', component: () => import('pages/UpdatePresentacion.vue') },
      { path: '/presentacion-hoja/:id', component: () => import('pages/PresentacionHojaCrud.vue') },

      { path: '/marcas-add', component: () => import('pages/MercaderiasMarcaAdd.vue') },
      { path: '/marcas-add/:id', component: () => import('pages/MercaderiasMarcaAdd.vue') },
      { path: '/mercaderia_categorias', component: () => import('pages/MercaderiasCategoria.vue') },
      { path: '/items', component: () => import('pages/MercaderiasItems.vue') },
      { path: '/notificaciones', component: () => import('pages/Notificaciones.vue') },
      { path: '/add-notificacion', component: () => import('pages/AddNotificacion.vue') },
      { path: '/add-notificacion/:id', component: () => import('pages/AddNotificacion.vue') },
      { path: '/usuarios', component: () => import('pages/Usuarios.vue') },
      { path: '/add-usuario', component: () => import('pages/AddUsuario.vue') },
      { path: '/add-usuario/:id', component: () => import('pages/AddUsuario.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
