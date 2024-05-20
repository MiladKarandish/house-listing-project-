import { createRouter, createWebHistory } from 'vue-router';
import HousePage from '../components/HousePage.vue';
import AboutPage from '../components/AboutPage.vue';




const routes = [
    {
      path: '/',
      name: ' House_page',
      component: HousePage,
    },
    {
      path: '/AboutPage',
      name:'About_page', 
      component: AboutPage,
    },
  ]
const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router;
