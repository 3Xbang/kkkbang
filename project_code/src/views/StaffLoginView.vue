<template>
  <div class="staff-login-container">
    <div class="login-header">
      <div class="header-container">
        <div class="logo-wrapper">
          <img src="/images/temp-logo.svg" alt="3X BANG Logo" class="company-logo">
          <div class="logo-text">
            <span class="logo-tagline">建筑工程管理专家</span>
          </div>
        </div>
        <router-link to="/" class="back-to-home">
          <i class="fas fa-arrow-left"></i> 返回首页
        </router-link>
      </div>
    </div>

    <div class="login-content">
      <div class="login-card">
        <!-- 登录表单 -->
        <div class="form-container">
          <form @submit.prevent="handleLogin" class="login-form">
            <h2 class="form-title">内部员工登录</h2>
            <p class="form-subtitle">登录您的员工账号以使用管理系统</p>
            
            <div class="form-group">
              <label for="phone">员工ID</label>
              <div class="input-wrapper">
                <i class="fas fa-id-card"></i>
                <input 
                  type="text" 
                  id="phone" 
                  v-model="loginForm.phone" 
                  placeholder="请输入员工ID" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="password" 
                  v-model="loginForm.password" 
                  placeholder="请输入密码" 
                  required
                >
              </div>
            </div>
            
            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" v-model="loginForm.remember">
                <label for="remember">记住我</label>
              </div>
              <a href="#" class="forgot-password">忘记密码?</a>
            </div>
            
            <button type="submit" class="submit-btn">登录</button>
            
            <div class="form-footer">
              <p>不是内部员工? <router-link to="/client-login">前往客户登录</router-link></p>
              <p class="register-link">还没有账号? <router-link to="/staff-register" class="highlight">立即注册</router-link></p>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 右侧宣传区域 -->
      <div class="login-banner staff-banner">
        <div class="banner-content">
          <h2>3X BANG 内部管理系统</h2>
          <p>功能完善的员工平台，助力团队高效协作</p>
          <ul class="feature-list">
            <li><i class="fas fa-check-circle"></i> 完整的项目管理工具</li>
            <li><i class="fas fa-check-circle"></i> 客户信息智能管理</li>
            <li><i class="fas fa-check-circle"></i> 高效任务分配系统</li>
            <li><i class="fas fa-check-circle"></i> 实时报表和绩效分析</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="login-footer">
      <div class="copyright">© 2023 3X BANG 建筑工程管理. 保留所有权利.</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StaffLoginView',
  data() {
    return {
      loginForm: {
        phone: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    handleLogin() {
      console.log('内部员工登录表单提交:', this.loginForm);
      
      // 检查测试账号 - 这里是员工测试账号
      if (this.loginForm.phone === '13800000000' && this.loginForm.password === 'admin123') {
        // 保存登录状态和用户信息到localStorage
        localStorage.setItem('isStaffLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('userRole', 'admin'); // 添加userRole用于打卡组件识别
        
        // 模拟用户信息
        const userInfo = {
          name: '管理员',
          phone: this.loginForm.phone,
          role: 'admin',
          avatar: null
        };
        
        localStorage.setItem('staffInfo', JSON.stringify(userInfo));
        
        // 跳转到管理系统页面
        this.$router.push('/admin-dashboard');
        return;
      }
      
      // 添加新的测试账号 147258/369258
      if (this.loginForm.phone === '147258' && this.loginForm.password === '369258') {
        localStorage.setItem('isStaffLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('userRole', 'admin'); // 添加userRole用于打卡组件识别
        
        // 模拟测试账号用户信息
        const userInfo = {
          name: '测试管理员',
          phone: this.loginForm.phone,
          role: 'admin',
          department: '管理部',
          avatar: null
        };
        
        localStorage.setItem('staffInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', 'test-token-' + Date.now()); // 添加token用于路由守卫
        
        // 跳转到管理系统页面
        this.$router.push('/admin-dashboard');
        return;
      }
      
      // 其他普通员工测试账号
      if (this.loginForm.phone === '13900000000' && this.loginForm.password === 'staff123') {
        localStorage.setItem('isStaffLoggedIn', 'true');
        localStorage.setItem('userRole', 'staff'); // 添加userRole用于打卡组件识别
        
        // 模拟普通员工信息
        const userInfo = {
          name: '张工程师',
          phone: this.loginForm.phone,
          role: 'engineer',
          avatar: null
        };
        
        localStorage.setItem('staffInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', 'test-token-' + Date.now()); // 添加token用于路由守卫
        
        // 跳转到员工系统页面
        this.$router.push('/staff-dashboard');
        return;
      }
      
      // 其他用户名密码处理 - 实际项目中应该调用API进行验证
      alert('手机号或密码错误，请重试。');
    }
  }
}
</script>

<style scoped>
/* 整体容器 */
.staff-login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f4f8;  /* 稍微不同的背景色 */
  background-image: linear-gradient(to bottom right, #f0f4f8, #e2e8f0);
}

/* 顶部导航栏 */
.login-header {
  background-color: #ffffff;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-tagline {
  font-size: 14px;
  color: #64748b;
}

.back-to-home {
  color: #1e40af;
  text-decoration: none;
  font-size: 15px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.back-to-home i {
  margin-right: 5px;
}

.back-to-home:hover {
  color: #3b82f6;
}

/* 主要内容区域 */
.login-content {
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  gap: 40px;
}

.login-card {
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
}

.login-card::before {
  content: "内部系统";
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #0f2851;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* 登录表单 */
.form-container {
  padding: 40px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #0f2851;  /* 深蓝色标题 */
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 30px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #475569;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-wrapper input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input[type="checkbox"] {
  margin-right: 8px;
}

.forgot-password {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #0f2851;  /* 深蓝色按钮 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #1a365d;  /* 深蓝色按钮悬停效果 */
}

.form-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.form-footer p {
  margin: 8px 0;
}

.form-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.register-link {
  margin-top: 12px;
}

.highlight {
  color: #0f2851;
  font-weight: 600;
  padding: 4px 8px;
  background-color: rgba(15, 40, 81, 0.05);
  border-radius: 4px;
  transition: all 0.2s;
}

.highlight:hover {
  background-color: rgba(15, 40, 81, 0.1);
}

/* 右侧宣传区域 */
.login-banner {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f2851;  /* 深蓝色背景 */
  background-image: linear-gradient(135deg, #0f2851 0%, #1a365d 100%);
  border-radius: 10px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
}

.staff-banner {
  background-color: #0f2851;  /* 深蓝色背景 */
  background-image: linear-gradient(135deg, #0f2851 0%, #1a365d 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
}

.banner-content h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
}

.banner-content p {
  font-size: 16px;
  margin: 0 0 30px 0;
  opacity: 0.9;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
}

.feature-list li i {
  margin-right: 10px;
  color: #4ade80;
  font-size: 16px;
}

/* 页脚 */
.login-footer {
  background-color: #f1f5f9;
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .login-content {
    flex-direction: column;
  }
  
  .login-banner {
    display: none;
  }
}

@media (max-width: 576px) {
  .form-container {
    padding: 30px 20px;
  }
  
  .form-title {
    font-size: 22px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style> 