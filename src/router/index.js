import { createRouter, createWebHistory } from 'vue-router';
import HousePage from '../pages/HousePage.vue';
import AboutPage from '../pages/AboutPage.vue';
import HouseDetailsPage from '../pages/HouseDetailsPage.vue';


const routes = [
    {
      path: '/',
      name: 'HousePage',
      component: HousePage,
    },
    {
      path: '/AboutPage',
      name:'AboutPage', 
      component: AboutPage,
    },
    {
      path:'/HouseDetailsPage',
      name: 'HouseDetailsPage',
      component: HouseDetailsPage,
    }, 
  ]


console.log('Configured Routes:', routes); // Log the routes

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router;
