<template>
  <div class="client-login-container">
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
        <div class="login-tabs">
          <button 
            class="tab-btn" 
            :class="{ 'active': activeTab === 'login' }" 
            @click="activeTab = 'login'"
          >
            客户登录
          </button>
          <button 
            class="tab-btn" 
            :class="{ 'active': activeTab === 'register' }" 
            @click="activeTab = 'register'"
          >
            注册账号
          </button>
        </div>

        <!-- 登录表单 -->
        <div class="form-container" v-if="activeTab === 'login'">
          <form @submit.prevent="handleLogin" class="login-form">
            <h2 class="form-title">客户登录</h2>
            <p class="form-subtitle">登录您的账号以管理建筑项目</p>
            
            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-wrapper">
                <i class="fas fa-user"></i>
                <input 
                  type="text" 
                  id="username" 
                  v-model="loginForm.username" 
                  placeholder="请输入用户名" 
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
              <p>还没有账号? <a href="#" @click.prevent="activeTab = 'register'">立即注册</a></p>
            </div>
          </form>
        </div>

        <!-- 注册表单 -->
        <div class="form-container" v-if="activeTab === 'register'">
          <form @submit.prevent="handleRegister" class="register-form">
            <h2 class="form-title">注册账号</h2>
            <p class="form-subtitle">创建您的客户账号以开始管理建筑项目</p>
            
            <div class="form-group">
              <label for="fullname">姓名</label>
              <div class="input-wrapper">
                <i class="fas fa-user"></i>
                <input 
                  type="text" 
                  id="fullname" 
                  v-model="registerForm.fullname" 
                  placeholder="请输入您的姓名" 
                  required
                >
              </div>
            </div>
            
            <!-- 头像上传 -->
            <div class="form-group">
              <label for="avatar">头像上传</label>
              <div class="avatar-upload">
                <div class="avatar-preview" v-if="avatarPreview">
                  <img :src="avatarPreview" alt="头像预览">
                </div>
                <div class="avatar-placeholder" v-else>
                  <i class="fas fa-user-circle"></i>
                </div>
                <div class="avatar-input">
                  <label for="avatar-file" class="avatar-button">
                    <i class="fas fa-upload"></i> 选择图片
                  </label>
                  <input 
                    type="file" 
                    id="avatar-file" 
                    accept="image/*"
                    @change="handleAvatarChange" 
                    hidden
                  >
                  <span class="avatar-hint">支持 JPG, PNG 格式，大小不超过 2MB</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="reg-username">用户名</label>
              <div class="input-wrapper">
                <i class="fas fa-user-tag"></i>
                <input 
                  type="text" 
                  id="reg-username" 
                  v-model="registerForm.username" 
                  placeholder="请设置您的用户名" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">电子邮箱</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope"></i>
                <input 
                  type="email" 
                  id="email" 
                  v-model="registerForm.email" 
                  placeholder="请输入您的电子邮箱" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone">手机号码</label>
              <div class="input-wrapper">
                <i class="fas fa-phone"></i>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="registerForm.phone" 
                  placeholder="请输入您的手机号码" 
                  required
                >
              </div>
            </div>
            
            <!-- 社交账号（下拉式） -->
            <div class="form-group">
              <label for="social-platform">社交账号</label>
              <div class="social-account-container">
                <div class="input-wrapper social-select-wrapper">
                  <i class="fas fa-share-alt"></i>
                  <select 
                    id="social-platform" 
                    v-model="registerForm.socialPlatform"
                  >
                    <option value="" disabled selected>选择平台</option>
                    <option value="facebook">Facebook</option>
                    <option value="line">Line</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div class="input-wrapper social-input-wrapper" v-if="registerForm.socialPlatform">
                  <i :class="getSocialIcon()"></i>
                  <input 
                    type="text" 
                    v-model="registerForm.socialAccount" 
                    :placeholder="'请输入您的' + getSocialName() + '账号'"
                  >
                </div>
              </div>
            </div>
            
            <!-- 地址（带定位功能） -->
            <div class="form-group">
              <label for="address">地址</label>
              <div class="address-container">
                <div class="input-wrapper">
                  <i class="fas fa-map-marker-alt"></i>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="registerForm.address" 
                    placeholder="请输入您的详细地址" 
                    required
                  >
                </div>
                <button type="button" class="location-button" @click="getLocation">
                  <i class="fas fa-crosshairs"></i> 获取当前位置
                </button>
              </div>
              <div class="location-status" v-if="locationStatus">
                <i :class="locationStatus.icon"></i> {{ locationStatus.message }}
              </div>
              <div class="map-preview" v-if="registerForm.lat && registerForm.lng">
                <div class="map-placeholder">
                  <i class="fas fa-map-marked-alt"></i>
                  <span>地图预览</span>
                  <div class="coordinates">
                    纬度: {{ registerForm.lat.toFixed(6) }}, 经度: {{ registerForm.lng.toFixed(6) }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="reg-password">密码</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="reg-password" 
                  v-model="registerForm.password" 
                  placeholder="请设置登录密码" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirm-password">确认密码</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="confirm-password" 
                  v-model="registerForm.confirmPassword" 
                  placeholder="请再次输入密码" 
                  required
                >
              </div>
            </div>
            
            <div class="form-agreement">
              <input type="checkbox" id="agreement" v-model="registerForm.agreement" required>
              <label for="agreement">我已阅读并同意 <a href="#">服务条款</a> 和 <a href="#">隐私政策</a></label>
            </div>
            
            <button type="submit" class="submit-btn">注册账号</button>
            
            <div class="form-footer">
              <p>已有账号? <a href="#" @click.prevent="activeTab = 'login'">立即登录</a></p>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 右侧宣传区域 -->
      <div class="login-banner">
        <div class="banner-content">
          <h2>3X BANG 建筑工程管理系统</h2>
          <p>专业的项目管理平台，助您轻松掌控建筑项目全过程</p>
          <ul class="feature-list">
            <li><i class="fas fa-check-circle"></i> 实时项目进度跟踪</li>
            <li><i class="fas fa-check-circle"></i> 工程文档在线管理</li>
            <li><i class="fas fa-check-circle"></i> 智能预算控制系统</li>
            <li><i class="fas fa-check-circle"></i> 高效团队协作平台</li>
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
  name: 'ClientLoginView',
  data() {
    return {
      activeTab: 'login',
      avatarPreview: null,
      locationStatus: null,
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      registerForm: {
        fullname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreement: false,
        avatar: null,
        socialPlatform: '',
        socialAccount: '',
        address: '',
        lat: null,
        lng: null
      }
    }
  },
  methods: {
    handleLogin() {
      console.log('登录表单提交:', this.loginForm);
      
      // 检查是否是测试账号
      if (this.loginForm.username === '123456' && this.loginForm.password === 'yy123456') {
        // 跳转到中间重定向页面
        window.location.href = '/redirect.html';
        return;
      }
      
      // 其他用户名密码组合的处理
      if (this.loginForm.username && this.loginForm.password) {
        // 在实际应用中，这里应该调用API验证用户名和密码
        
        // 保存登录状态和用户信息到localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // 模拟用户信息
        const userInfo = {
          name: this.loginForm.username,
          email: this.loginForm.username + '@example.com',
          role: 'client',
          avatar: null
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // 跳转到中间重定向页面
        window.location.href = '/redirect.html';
      }
    },
    
    handleRegister() {
      console.log('注册表单提交:', this.registerForm);
      
      // 验证密码是否匹配
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }
      
      // 验证是否同意条款
      if (!this.registerForm.agreement) {
        alert('请同意服务条款和隐私政策');
        return;
      }
      
      // 在实际应用中，这里应该调用API注册用户
      
      // 模拟成功注册
      alert('注册成功！请使用新账号登录');
      
      // 切换到登录标签
      this.activeTab = 'login';
      
      // 预填登录表单
      this.loginForm.username = this.registerForm.username;
      this.loginForm.password = '';
    },
    
    handleAvatarChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      // 检查文件类型
      if (!file.type.match('image.*')) {
        alert('请选择图片文件');
        return;
      }
      
      // 检查文件大小（不超过2MB）
      if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过2MB');
        return;
      }
      
      // 预览图片
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    getSocialIcon() {
      const iconMap = {
        'facebook': 'fab fa-facebook',
        'line': 'fab fa-line',
        'whatsapp': 'fab fa-whatsapp'
      };
      return iconMap[this.registerForm.socialPlatform] || 'fas fa-share-alt';
    },
    
    getSocialName() {
      const nameMap = {
        'facebook': 'Facebook',
        'line': 'Line',
        'whatsapp': 'WhatsApp'
      };
      return nameMap[this.registerForm.socialPlatform] || '';
    },
    
    getLocation() {
      this.locationStatus = {
        icon: 'fas fa-spinner fa-spin',
        message: '正在获取位置...'
      };
      
      if (!navigator.geolocation) {
        this.locationStatus = {
          icon: 'fas fa-exclamation-circle',
          message: '您的浏览器不支持地理位置功能'
        };
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 成功获取位置
          this.registerForm.lat = position.coords.latitude;
          this.registerForm.lng = position.coords.longitude;
          
          this.locationStatus = {
            icon: 'fas fa-check-circle',
            message: '位置获取成功'
          };
          
          // 根据坐标获取地址（实际应用中可以使用地图API）
          this.registerForm.address = `位置已标记 (${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)})`;
        },
        (error) => {
          // 获取位置失败
          let errorMessage = '获取位置失败';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '用户拒绝了位置请求';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '位置信息不可用';
              break;
            case error.TIMEOUT:
              errorMessage = '获取位置请求超时';
              break;
          }
          
          this.locationStatus = {
            icon: 'fas fa-exclamation-circle',
            message: errorMessage
          };
        }
      );
    }
  }
}
</script>

<style scoped>
.client-login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.login-header {
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.company-logo {
  width: 120px;
  height: auto;
  margin-right: 1rem;
}

.logo-tagline {
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
}

.back-to-home {
  display: flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.back-to-home i {
  margin-right: 0.5rem;
}

.back-to-home:hover {
  color: #2980b9;
}

.login-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.login-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  margin-right: 2rem;
}

.login-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #777;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #3498db;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #3498db;
}

.form-container {
  padding: 2.5rem;
}

.form-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.form-subtitle {
  color: #777;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s;
}

.input-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input-wrapper i {
  padding: 0 1rem;
  color: #777;
  background-color: #f8f9fa;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #e0e0e0;
}

.input-wrapper input {
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 0.5rem;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1.5rem;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.form-footer {
  text-align: center;
  color: #777;
  font-size: 0.9rem;
}

.form-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}

.form-agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #777;
}

.form-agreement input {
  margin-right: 0.5rem;
  margin-top: 0.2rem;
}

.form-agreement a {
  color: #3498db;
  text-decoration: none;
}

.form-agreement a:hover {
  text-decoration: underline;
}

.login-banner {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-radius: 10px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.banner-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.feature-list i {
  color: #2ecc71;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.login-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: white;
  color: #777;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
}

/* 头像上传样式 */
.avatar-upload {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar-preview, .avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  background-color: #f8f9fa;
  color: #adb5bd;
}

.avatar-placeholder i {
  font-size: 3rem;
}

.avatar-input {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.avatar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  max-width: 150px;
}

.avatar-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.avatar-button i {
  margin-right: 0.5rem;
}

.avatar-hint {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #777;
}

/* 社交账号选择样式 */
.social-account-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-select-wrapper select {
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23777' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.social-input-wrapper {
  margin-top: 0.5rem;
}

/* 地址和定位样式 */
.address-container {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.address-container .input-wrapper {
  flex: 1;
}

.location-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0 1rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  white-space: nowrap;
}

.location-button:hover {
  background-color: #2980b9;
}

.location-button i {
  margin-right: 0.5rem;
}

.location-status {
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.location-status i {
  margin-right: 0.5rem;
  color: #3498db;
}

.location-status .fa-exclamation-circle {
  color: #e74c3c;
}

.location-status .fa-check-circle {
  color: #2ecc71;
}

.map-preview {
  margin-top: 0.75rem;
  border-radius: 5px;
  overflow: hidden;
}

.map-placeholder {
  background-color: #f8f9fa;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #777;
  border: 1px dashed #ddd;
  border-radius: 5px;
}

.map-placeholder i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.coordinates {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .login-content {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  
  .login-card {
    margin-right: 0;
    margin-bottom: 2rem;
  }
  
  .login-banner {
    max-width: 500px;
  }
}

@media (max-width: 576px) {
  .form-container {
    padding: 1.5rem;
  }
  
  .banner-content h2 {
    font-size: 1.5rem;
  }
  
  .login-banner {
    padding: 2rem;
  }
  
  .back-to-home span {
    display: none;
  }
  
  .avatar-upload {
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-preview, .avatar-placeholder {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .avatar-input {
    width: 100%;
    align-items: center;
  }
  
  .address-container {
    flex-direction: column;
  }
  
  .location-button {
    width: 100%;
  }
}
</style> 