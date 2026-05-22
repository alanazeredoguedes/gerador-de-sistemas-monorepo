import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes.map";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to,from,next) => {

  /** Se não estiver autenticado e rota precisar de autenticação - redireciona para login*/
  if(!store.state.userStore.items.authenticated && to.meta.auth ){
      return router.push({name: 'login'})
  }

  next()
})

export default router
