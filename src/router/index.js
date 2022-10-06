import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Profile from '../views/ProfileView.vue'
import SingleGame from '../views/SingleGameView.vue'
import LogOut from '../components/LogOut.vue'

const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/game/:id', name: 'game', component: SingleGame },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/logout', name: 'logout', component: LogOut },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: '/',
})

router.beforeEach((to, from) => {
  console.log('from: ', from)
  console.log('to: ', to)
})

export default router
