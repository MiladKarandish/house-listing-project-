import { createRouter, createWebHistory } from 'vue-router';
import HousePage from '../components/House_page.vue';
import AboutPage from '../components/About_page.vue';




const routes = [
    {
      path: '/',
      name: ' House_page',
      component: HousePage,
    },
    {
      path: '/About_page',
      name:'About_page', 
      component: AboutPage,
    },
  ]
const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router;
