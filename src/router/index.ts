import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SigninView from '../components/login/SignIn.vue';
import SignUpView from '../components/login/SignUp.vue';
import NotFoundView from '../components/NotFound.vue';
import store from '../store/index';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView // your 404 component
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
      meta: { auth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { auth: false }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true }
    },
    {
      path: '/contacts',
      name: 'contacts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/contacts/ContactsView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = store.state.userToken;
  console.log('TOKEN IN ROUTER', token);
  if (to.meta.auth && !token) {
    next('/signin');
    console.log('NO TOKEN IN STORE');
    return;
  }

  if ((to.path === '/signin' || to.path === '/signup') && token) {
    console.log('TOKEN IN STORE');
    next('/');
    return;
  }

  next();
});

export default router;
