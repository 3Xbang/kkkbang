<template>
  <div class="staff-register-container">
    <div class="register-header">
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

    <div class="register-content">
      <div class="register-card">
        <!-- 注册表单 -->
        <div class="form-container">
          <form @submit.prevent="handleRegister" class="register-form">
            <h2 class="form-title">员工注册</h2>
            <p class="form-subtitle">创建您的员工账号以使用内部系统</p>
            
            <div class="form-group">
              <label for="fullName">姓名</label>
              <div class="input-wrapper">
                <i class="fas fa-user"></i>
                <input 
                  type="text" 
                  id="fullName" 
                  v-model="registerForm.fullName" 
                  placeholder="请输入您的姓名" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="birthday">生日</label>
              <div class="input-wrapper">
                <i class="fas fa-birthday-cake"></i>
                <input 
                  type="date" 
                  id="birthday" 
                  v-model="registerForm.birthday" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone">手机号 (将用于登录)</label>
              <div class="input-wrapper">
                <i class="fas fa-mobile-alt"></i>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="registerForm.phone" 
                  placeholder="请输入您的手机号" 
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
                  v-model="registerForm.password" 
                  placeholder="请设置密码" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">确认密码</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="registerForm.confirmPassword" 
                  placeholder="请再次输入密码" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label>头像上传</label>
              <div class="avatar-upload">
                <div class="avatar-preview" v-if="avatarPreview">
                  <img :src="avatarPreview" alt="头像预览">
                </div>
                <div class="avatar-placeholder" v-else>
                  <i class="fas fa-user"></i>
                </div>
                <div class="upload-button">
                  <label for="avatar" class="upload-label">
                    <i class="fas fa-upload"></i> 选择图片
                  </label>
                  <input 
                    type="file" 
                    id="avatar" 
                    accept="image/*" 
                    @change="handleAvatarChange" 
                    style="display: none"
                  >
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="socialAccount">社交账号类型</label>
              <div class="select-wrapper">
                <i class="fas fa-globe"></i>
                <select 
                  id="socialAccount" 
                  v-model="registerForm.socialAccountType"
                >
                  <option value="">请选择社交账号类型</option>
                  <option value="facebook">Facebook</option>
                  <option value="line">LINE</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>
            
            <div class="form-group" v-if="registerForm.socialAccountType">
              <label :for="registerForm.socialAccountType">{{ getSocialLabel() }}</label>
              <div class="input-wrapper">
                <i :class="getSocialIcon()"></i>
                <input 
                  type="text" 
                  :id="registerForm.socialAccountType" 
                  v-model="registerForm.socialAccountId" 
                  :placeholder="'请输入您的' + getSocialLabel()" 
                >
              </div>
            </div>
            
            <div class="form-group checkbox-group">
              <div class="agreement">
                <input type="checkbox" id="agreement" v-model="registerForm.agreement" required>
                <label for="agreement">我已阅读并同意<a href="#" class="terms-link">员工注册条款</a></label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> 处理中...</span>
              <span v-else>注册</span>
            </button>
            
            <div class="form-footer">
              <p>已有账号? <router-link to="/staff-login">立即登录</router-link></p>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 右侧宣传区域 -->
      <div class="register-banner staff-banner">
        <div class="banner-content">
          <h2>欢迎加入3X BANG</h2>
          <p>注册成为我们的一员，共同打造卓越的建筑工程管理团队</p>
          <ul class="feature-list">
            <li><i class="fas fa-check-circle"></i> 专业的团队协作平台</li>
            <li><i class="fas fa-check-circle"></i> 高效的项目管理系统</li>
            <li><i class="fas fa-check-circle"></i> 完善的员工福利保障</li>
            <li><i class="fas fa-check-circle"></i> 广阔的职业发展空间</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="register-footer">
      <div class="copyright">© 2023 3X BANG 建筑工程管理. 保留所有权利.</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StaffRegisterView',
  data() {
    return {
      registerForm: {
        fullName: '',
        birthday: '',
        phone: '',
        password: '',
        confirmPassword: '',
        avatar: null,
        socialAccountType: '',
        socialAccountId: '',
        agreement: false
      },
      avatarPreview: null,
      isSubmitting: false,
      formErrors: {}
    }
  },
  methods: {
    getSocialLabel() {
      switch(this.registerForm.socialAccountType) {
        case 'facebook':
          return 'Facebook账号';
        case 'line':
          return 'LINE账号';
        case 'whatsapp':
          return 'WhatsApp号码';
        default:
          return '社交账号';
      }
    },
    getSocialIcon() {
      switch(this.registerForm.socialAccountType) {
        case 'facebook':
          return 'fab fa-facebook';
        case 'line':
          return 'fab fa-line';
        case 'whatsapp':
          return 'fab fa-whatsapp';
        default:
          return 'fas fa-globe';
      }
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // 验证文件类型
      if (!file.type.match('image.*')) {
        alert('请上传图片文件');
        return;
      }
      
      // 验证文件大小 (最大5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }
      
      // 设置头像文件
      this.registerForm.avatar = file;
      
      // 创建预览
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    validateForm() {
      const errors = {};
      
      // 验证密码匹配
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        errors.password = '两次输入的密码不匹配';
      }
      
      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.registerForm.phone)) {
        errors.phone = '请输入有效的手机号';
      }
      
      this.formErrors = errors;
      return Object.keys(errors).length === 0;
    },
    handleRegister() {
      // 表单验证
      if (!this.validateForm()) {
        // 显示错误信息
        const firstError = Object.values(this.formErrors)[0];
        alert(firstError);
        return;
      }
      
      // 开始提交
      this.isSubmitting = true;
      
      // 模拟API请求
      setTimeout(() => {
        console.log('注册表单提交:', this.registerForm);
        
        // 创建一个随机的注册成功响应
        const isSuccess = Math.random() > 0.2; // 80%概率成功
        
        if (isSuccess) {
          // 注册成功
          alert('注册成功！请等待管理员审核。审核通过后，您将收到通知。');
          
          // 跳转到登录页
          this.$router.push('/staff-login');
        } else {
          // 注册失败
          alert('注册失败，该手机号已被使用，请尝试其他手机号。');
        }
        
        this.isSubmitting = false;
      }, 1500); // 模拟网络延迟
    }
  }
}
</script>

<style scoped>
/* 整体容器 */
.staff-register-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f4f8;
  background-image: linear-gradient(to bottom right, #f0f4f8, #e2e8f0);
}

/* 顶部导航栏 */
.register-header {
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
.register-content {
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  gap: 40px;
}

.register-card {
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
}

.register-card::before {
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

/* 注册表单 */
.form-container {
  padding: 40px;
  max-height: 80vh;
  overflow-y: auto;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #0f2851;
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

.input-wrapper input,
.select-wrapper select {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-wrapper input:focus,
.select-wrapper select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  outline: none;
}

.select-wrapper {
  position: relative;
}

.select-wrapper i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

/* 头像上传 */
.avatar-upload {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-preview,
.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder i {
  font-size: 40px;
  color: #94a3b8;
}

.upload-button {
  flex-grow: 1;
}

.upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #0f2851;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-label:hover {
  background-color: #e2e8f0;
}

.upload-label i {
  margin-right: 5px;
}

/* 协议勾选 */
.checkbox-group {
  margin-top: 25px;
}

.agreement {
  display: flex;
  align-items: center;
}

.agreement input[type="checkbox"] {
  margin-right: 10px;
}

.terms-link {
  color: #3b82f6;
  text-decoration: none;
  margin-left: 5px;
}

.terms-link:hover {
  text-decoration: underline;
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #0f2851;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1a365d;
}

.submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.form-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.form-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

/* 右侧宣传区域 */
.register-banner {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f2851;
  background-image: linear-gradient(135deg, #0f2851 0%, #1a365d 100%);
  border-radius: 10px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
}

.staff-banner {
  background-color: #0f2851;
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
.register-footer {
  background-color: #f1f5f9;
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .register-content {
    flex-direction: column;
  }
  
  .register-banner {
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
  
  .avatar-upload {
    flex-direction: column;
    align-items: center;
  }
  
  .upload-button {
    width: 100%;
    margin-top: 15px;
    text-align: center;
  }
}
</style> 