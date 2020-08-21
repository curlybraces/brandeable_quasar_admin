
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/add-cuenta', component: () => import('pages/AddCuenta.vue') },
      { path: '/cuentas', component: () => import('pages/Cuentas.vue') },
      { path: '/add-empresa', component: () => import('pages/AddEmpresa.vue') },
      { path: '/empresas', component: () => import('pages/Empresas.vue') },
      { path: '/categorias', component: () => import('pages/Categorias.vue') },
      { path: '/cotizaciones', component: () => import('pages/Cotizaciones.vue') },
      { path: '/marcas', component: () => import('pages/MercaderiasMarca.vue') },
      { path: '/marcas-add', component: () => import('pages/MercaderiasMarcaAdd.vue') },
      { path: '/marcas-add/:id', component: () => import('pages/MercaderiasMarcaAdd.vue') },
      { path: '/mercaderia_categorias', component: () => import('pages/MercaderiasCategoria.vue') },
      { path: '/items', component: () => import('pages/MercaderiasItems.vue') }
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
