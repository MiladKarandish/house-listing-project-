import { createRouter, createWebHistory } from 'vue-router';
import HousePage from '../pages/HousePage.vue';
import AboutPage from '../pages/AboutPage.vue';
import HouseCreatingPage from '../pages/HouseCreatingPage.vue';
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


  console.log('Configured Routes:', routes); // Log the routes

  const router = createRouter({
    history: createWebHistory(), 
    routes
  });
  
  export default router;
  
