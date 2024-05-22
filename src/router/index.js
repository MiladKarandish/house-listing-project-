import { createRouter, createWebHistory } from 'vue-router';
import HousePage from '../pages/HousePage.vue';
import AboutPage from '../pages/AboutPage.vue';



// Defining the routes for the application
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

// Creating the router instance and configuring it
const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router;
