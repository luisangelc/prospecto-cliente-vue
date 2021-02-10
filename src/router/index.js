import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Listado Clientes', icon: "http://localhost:8080/assets/favicon.png" }
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: () => import('../views/Cliente.vue'),
    meta: { title: 'Formulario Cliente', icon: "/favicon.png" }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const DEFAULT_TITLE = 'Clientes';
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router
