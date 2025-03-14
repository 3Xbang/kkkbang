<template>
  <div class="home-container">
    <!-- 登录链接区域 -->
    <div class="login-links">
      <div class="container">
        <router-link to="/client-login" class="login-link">客户登录</router-link>
        <span class="divider">|</span>
        <router-link to="/staff-login" class="login-link internal-login">内部登录</router-link>
      </div>
    </div>
    
    <!-- 主横幅区域 -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">专业建筑工程<span class="highlight">管理解决方案</span></h1>
        <p class="hero-text">提升您的项目效率和质量，让建筑工程管理变得简单高效</p>
        <div class="hero-buttons">
          <a href="#services" class="primary-btn">了解我们的服务</a>
          <a href="#contact" class="secondary-btn">联系我们</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">年行业经验</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">200+</span>
            <span class="stat-label">成功项目</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">98%</span>
            <span class="stat-label">客户满意度</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 服务介绍 -->
    <section id="services" class="services-section">
      <div class="section-header">
        <span class="section-subtitle">我们的专业服务</span>
        <h2 class="section-title">核心业务领域</h2>
        <div class="section-divider"></div>
      </div>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-home"></i></div>
          <h3 class="service-title">房屋建筑</h3>
          <p class="service-description">专业的房屋建筑服务，从设计到施工，提供全方位的建筑解决方案，确保工程质量和安全。</p>
          <a href="#" class="service-link">了解更多 <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-paint-roller"></i></div>
          <h3 class="service-title">室内装修</h3>
          <p class="service-description">高品质的室内装修服务，包括家居、办公、商业空间等，打造舒适美观的生活和工作环境。</p>
          <a href="#" class="service-link">了解更多 <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-tools"></i></div>
          <h3 class="service-title">维修服务</h3>
          <p class="service-description">快速响应的房屋维修服务，解决各类居家问题，让您的生活更加便捷舒适。</p>
          <a href="#" class="service-link">了解更多 <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-tint"></i></div>
          <h3 class="service-title">室内漏雨处理</h3>
          <p class="service-description">专业的室内漏雨检测与修复，彻底解决屋顶、墙面、窗户等漏水问题，保护您的家居环境。</p>
          <a href="#" class="service-link">了解更多 <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
    
    <!-- 公司优势 -->
    <section id="advantages" class="advantages-section">
      <div class="section-header">
        <span class="section-subtitle">我们的核心竞争力</span>
        <h2 class="section-title">为什么选择我们</h2>
        <div class="section-divider"></div>
      </div>
      <div class="advantages-grid">
        <div class="advantage-item">
          <div class="advantage-icon">
            <i class="fas fa-users"></i>
            <div class="advantage-number">1</div>
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">专业团队</h3>
            <p class="advantage-description">我们拥有多年建筑工程管理经验的专业团队，能够为您提供全方位的解决方案。</p>
          </div>
        </div>
        <div class="advantage-item">
          <div class="advantage-icon">
            <i class="fas fa-laptop-code"></i>
            <div class="advantage-number">2</div>
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">先进技术</h3>
            <p class="advantage-description">采用最新的信息技术和管理方法，提高项目管理效率和质量。</p>
          </div>
        </div>
        <div class="advantage-item">
          <div class="advantage-icon">
            <i class="fas fa-cogs"></i>
            <div class="advantage-number">3</div>
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">定制方案</h3>
            <p class="advantage-description">根据客户需求提供定制化的解决方案，满足不同规模和类型项目的需求。</p>
          </div>
        </div>
        <div class="advantage-item">
          <div class="advantage-icon">
            <i class="fas fa-headset"></i>
            <div class="advantage-number">4</div>
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">优质服务</h3>
            <p class="advantage-description">提供7*24小时技术支持和服务，确保系统稳定运行。</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 项目案例 -->
    <section id="projects" class="projects-section">
      <div class="section-header">
        <span class="section-subtitle">我们的成功案例</span>
        <h2 class="section-title">精选项目展示</h2>
        <div class="section-divider"></div>
      </div>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-image">
            <div class="image-placeholder">
              <i class="fas fa-building"></i>
              <span>城市综合体项目</span>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">城市综合体项目</h3>
            <p class="project-description">包含商业、办公、住宅等多功能的大型城市综合体项目管理案例。</p>
            <div class="project-meta">
              <span class="project-category"><i class="fas fa-tag"></i> 商业建筑</span>
              <span class="project-date"><i class="fas fa-calendar"></i> 2023年</span>
            </div>
            <a href="#" class="project-link">查看详情 <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="project-card">
          <div class="project-image">
            <div class="image-placeholder">
              <i class="fas fa-road"></i>
              <span>高速公路工程</span>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">高速公路工程</h3>
            <p class="project-description">全长120公里的高速公路工程管理，包括桥梁、隧道等复杂结构。</p>
            <div class="project-meta">
              <span class="project-category"><i class="fas fa-tag"></i> 基础设施</span>
              <span class="project-date"><i class="fas fa-calendar"></i> 2022年</span>
            </div>
            <a href="#" class="project-link">查看详情 <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="project-card">
          <div class="project-image">
            <div class="image-placeholder">
              <i class="fas fa-tree"></i>
              <span>生态住宅小区</span>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">生态住宅小区</h3>
            <p class="project-description">融合生态理念的大型住宅小区项目，包含绿色建筑技术应用。</p>
            <div class="project-meta">
              <span class="project-category"><i class="fas fa-tag"></i> 住宅建筑</span>
              <span class="project-date"><i class="fas fa-calendar"></i> 2021年</span>
            </div>
            <a href="#" class="project-link">查看详情 <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 联系我们 -->
    <section id="contact" class="contact-section">
      <div class="section-header">
        <span class="section-subtitle">与我们取得联系</span>
        <h2 class="section-title">联系我们</h2>
        <div class="section-divider"></div>
      </div>
      <div class="contact-container">
        <div class="contact-info">
          <div class="contact-card">
            <h3 class="contact-card-title">联系方式</h3>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>北京市朝阳区建国路88号</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <span>+86 10 8888 8888</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>info@3xbang.com</span>
            </div>
            <div class="contact-social">
              <a href="#" class="social-link"><i class="fab fa-weixin"></i></a>
              <a href="#" class="social-link"><i class="fab fa-weibo"></i></a>
              <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div class="contact-form-container">
          <form class="contact-form">
            <h3 class="form-title">发送消息</h3>
            <div class="form-group">
              <label for="name">您的姓名</label>
              <input type="text" id="name" required>
            </div>
            <div class="form-group">
              <label for="email">电子邮箱</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="phone">联系电话</label>
              <input type="tel" id="phone">
            </div>
            <div class="form-group">
              <label for="message">您的留言</label>
              <textarea id="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-button">发送消息</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-container {
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 登录链接区域 */
.login-links {
  background-color: #1a5276;
  padding: 0.8rem 0;
  text-align: right;
}

.login-links .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.login-link {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s;
}

.login-link:hover {
  color: #3498db;
}

.internal-login {
  color: #3498db;
  font-weight: 600;
}

.internal-login:hover {
  color: white;
}

.divider {
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0.8rem;
}

/* 主横幅 */
.hero-section {
  position: relative;
  display: flex;
  min-height: 85vh;
  background: linear-gradient(135deg, #1a5276, #154360);
  color: white;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/temp-logo.svg') center/cover no-repeat;
  opacity: 0.1;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.highlight {
  color: #3498db;
  display: block;
}

.hero-text {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.primary-btn, .secondary-btn {
  display: inline-block;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.primary-btn {
  background-color: #3498db;
  color: white;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.primary-btn:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.4);
}

.secondary-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid #3498db;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
}

.secondary-btn:hover {
  background-color: rgba(52, 152, 219, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
}

.hero-stats {
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3498db;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

/* 通用部分标题样式 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 4rem;
}

.section-subtitle {
  display: block;
  font-size: 1.1rem;
  color: #3498db;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-title {
  font-size: 2.5rem;
  color: #1a5276;
  margin-bottom: 1.5rem;
  position: relative;
}

.section-divider {
  width: 80px;
  height: 4px;
  background-color: #3498db;
  margin: 0 auto;
}

/* 服务介绍 */
.services-section {
  padding: 2rem 2rem 6rem;
  background-color: #fff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background-color: white;
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 0;
  background-color: #3498db;
  transition: height 0.3s;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.service-card:hover::before {
  height: 100%;
}

.service-icon {
  font-size: 3rem;
  color: #1a5276;
  margin-bottom: 1.5rem;
  transition: transform 0.3s, color 0.3s;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
  color: #3498db;
}

.service-title {
  font-size: 1.5rem;
  color: #1a5276;
  margin-bottom: 1rem;
  font-weight: 700;
}

.service-description {
  color: #5d6875;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.service-link {
  display: inline-flex;
  align-items: center;
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}

.service-link i {
  margin-left: 0.5rem;
  transition: transform 0.3s;
}

.service-link:hover {
  color: #2980b9;
}

.service-link:hover i {
  transform: translateX(5px);
}

/* 公司优势 */
.advantages-section {
  padding: 2rem 2rem 6rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.advantage-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.advantage-icon {
  position: relative;
  margin-right: 1.5rem;
}

.advantage-icon i {
  font-size: 2rem;
  color: #1a5276;
}

.advantage-number {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.advantage-title {
  font-size: 1.5rem;
  color: #1a5276;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.advantage-description {
  color: #5d6875;
  line-height: 1.7;
}

/* 项目案例 */
.projects-section {
  padding: 2rem 2rem 6rem;
  background-color: #fff;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.image-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #1a5276;
}

.project-info {
  padding: 2rem;
}

.project-title {
  font-size: 1.5rem;
  color: #1a5276;
  margin-bottom: 1rem;
  font-weight: 700;
}

.project-description {
  color: #5d6875;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #777;
}

.project-category, .project-date {
  display: flex;
  align-items: center;
}

.project-meta i {
  margin-right: 0.5rem;
  color: #3498db;
}

.project-link {
  display: inline-flex;
  align-items: center;
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}

.project-link i {
  margin-left: 0.5rem;
  transition: transform 0.3s;
}

.project-link:hover {
  color: #2980b9;
}

.project-link:hover i {
  transform: translateX(5px);
}

/* 联系我们 */
.contact-section {
  padding: 2rem 2rem 6rem;
  background-color: #f8f9fa;
}

.contact-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-card {
  background-color: white;
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.contact-card-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 700;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.contact-item i {
  font-size: 1.5rem;
  color: #1a5276;
  width: 40px;
  text-align: center;
  margin-right: 1rem;
}

.contact-social {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  transition: all 0.3s;
  box-shadow: 0 3px 6px rgba(52, 152, 219, 0.3);
}

.social-link:hover {
  background-color: #1a5276;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(26, 82, 118, 0.4);
}

.contact-form-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.contact-form {
  padding: 2.5rem;
}

.form-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-button {
  padding: 1rem 2rem;
  background-color: #1a5276;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  box-shadow: 0 4px 8px rgba(26, 82, 118, 0.3);
}

.submit-button:hover {
  background-color: #154360;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(26, 82, 118, 0.4);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    text-align: center;
  }
  
  .hero-content {
    padding: 3rem 1.5rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-text {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style> 