import { createRouter, createWebHistory } from 'vue-router';
import HousesPage from '../pages/HousesPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import HouseCreatingPage from '../pages/HouseCreatingPage.vue';
import HouseDetailsPage from '../pages/HouseDetailsPage.vue';


const routes = [
    {
      path: '/',
      name: 'HousesPage',
      component: HousesPage,
    },
    {
      path: '/AboutPage',
      name:'AboutPage', 
      component: AboutPage,
    },
    {
      path:'/HouseCreatingPage',
      name: 'HouseCreatingPage',
      component: HouseCreatingPage,
    }, 
    {
      path: '/HouseDetailsPage/:id',
      name: 'HouseDetailsPage',
      component: HouseDetailsPage,
    },   
    {
      path: '/HouseEditPage/:id',
      name: 'HouseEditPage',
      component: HouseCreatingPage,
      props: true,
    }, 
  ]

  const router = createRouter({
    history: createWebHistory(), 
    routes
  });
  
  export default router;
  
