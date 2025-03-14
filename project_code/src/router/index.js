import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientLoginView from '../views/ClientLoginView.vue'
import ClientServiceView from '../views/ClientServiceView.vue'
import StaffLoginView from '../views/StaffLoginView.vue'
import StaffRegisterView from '../views/StaffRegisterView.vue'
import StaffDashboardView from '../views/StaffDashboardView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import PermissionsView from '../views/PermissionsView.vue'

// 简单的关于页组件
const AboutView = {
  template: `
    <div class="about-view">
      <h2>关于</h2>
      <p>这是由Vue Router加载的关于页面</p>
    </div>
  `
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/client-login',
    name: 'clientLogin',
    component: ClientLoginView
  },
  {
    path: '/client-service',
    name: 'clientService',
    component: ClientServiceView
  },
  {
    path: '/staff-login',
    name: 'staffLogin',
    component: StaffLoginView
  },
  {
    path: '/staff-register',
    name: 'staffRegister',
    component: StaffRegisterView
  },
  {
    path: '/staff-dashboard',
    name: 'staffDashboard',
    component: StaffDashboardView,
    meta: { requiresAuth: true, role: 'staff' }
  },
  {
    path: '/admin-dashboard',
    name: 'adminDashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里应该检查用户是否已登录
    const isLoggedIn = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn) {
      next({ name: 'staffLogin' });
    } else if (to.meta.role && to.meta.role !== userRole) {
      // 如果需要特定角色但用户角色不匹配
      if (userRole === 'admin') {
        next({ name: 'adminDashboard' });
      } else {
        next({ name: 'staffDashboard' });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router 