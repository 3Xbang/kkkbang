<template>
  <div class="admin-dashboard">
    <header class="dashboard-header">
      <div class="header-container">
        <div class="logo-wrapper">
          <img src="/images/temp-logo.svg" alt="3X BANG Logo" class="company-logo">
          <div class="logo-text">
            <span class="logo-name">3X BANG</span>
            <span class="logo-tagline">建筑工程管理专家</span>
          </div>
        </div>
        <div class="header-actions">
          <div class="user-info">
            <div class="user-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="user-details">
              <span class="user-name">{{ userInfo.name }}</span>
              <span class="user-role">{{ userInfo.role === 'admin' ? '管理员' : userInfo.role }}</span>
            </div>
            <button class="logout-btn" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i> 退出
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="dashboard-content">
      <aside class="dashboard-sidebar">
        <nav class="sidebar-nav">
          <ul class="nav-list">
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-tachometer-alt"></i>
                <span>仪表盘</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-project-diagram"></i>
                <span>项目管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-users"></i>
                <span>客户管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-file-invoice"></i>
                <span>合同管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-tools"></i>
                <span>维修服务</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-chart-bar"></i>
                <span>数据分析</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-cog"></i>
                <span>系统设置</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <div class="page-header">
          <h1 class="page-title">管理员仪表盘</h1>
          <div class="date-display">{{ currentDate }}</div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">24</div>
              <div class="stat-label">进行中的项目</div>
            </div>
            <div class="stat-change positive">
              <i class="fas fa-arrow-up"></i> 8%
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">156</div>
              <div class="stat-label">活跃客户</div>
            </div>
            <div class="stat-change positive">
              <i class="fas fa-arrow-up"></i> 12%
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-tools"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">38</div>
              <div class="stat-label">待处理维修</div>
            </div>
            <div class="stat-change negative">
              <i class="fas fa-arrow-down"></i> 5%
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-file-invoice-dollar"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥1.2M</div>
              <div class="stat-label">本月收入</div>
            </div>
            <div class="stat-change positive">
              <i class="fas fa-arrow-up"></i> 15%
            </div>
          </div>
        </div>

        <div class="dashboard-row">
          <div class="dashboard-card recent-projects">
            <div class="card-header">
              <h2 class="card-title">近期项目</h2>
              <a href="#" class="view-all">查看全部</a>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>项目名称</th>
                    <th>客户</th>
                    <th>状态</th>
                    <th>进度</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(project, index) in recentProjects" :key="index">
                    <td>{{ project.name }}</td>
                    <td>{{ project.client }}</td>
                    <td>
                      <span class="status-badge" :class="project.statusClass">
                        {{ project.status }}
                      </span>
                    </td>
                    <td>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{width: project.progress + '%'}" :class="project.statusClass"></div>
                      </div>
                    </td>
                    <td>
                      <button class="action-btn">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="dashboard-row two-column">
          <div class="dashboard-card recent-activities">
            <div class="card-header">
              <h2 class="card-title">最近活动</h2>
            </div>
            <div class="card-content">
              <div class="activity-list">
                <div class="activity-item" v-for="(activity, index) in recentActivities" :key="index">
                  <div class="activity-icon" :class="activity.iconClass">
                    <i :class="activity.icon"></i>
                  </div>
                  <div class="activity-content">
                    <div class="activity-title">{{ activity.title }}</div>
                    <div class="activity-desc">{{ activity.description }}</div>
                    <div class="activity-time">{{ activity.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-card quick-actions">
            <div class="card-header">
              <h2 class="card-title">快捷操作</h2>
            </div>
            <div class="card-content">
              <div class="action-grid">
                <div class="quick-action-item" v-for="(action, index) in quickActions" :key="index">
                  <div class="action-icon">
                    <i :class="action.icon"></i>
                  </div>
                  <div class="action-label">{{ action.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboardView',
  data() {
    return {
      userInfo: {
        name: '管理员',
        role: 'admin'
      },
      currentDate: new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      recentProjects: [
        { 
          name: '国贸商场改造项目',
          client: '北京国贸有限公司',
          status: '进行中',
          statusClass: 'status-in-progress',
          progress: 65
        },
        { 
          name: '朝阳公园景观设计',
          client: '北京市朝阳区园林局',
          status: '已完成',
          statusClass: 'status-completed',
          progress: 100
        },
        { 
          name: '望京SOHO办公室装修',
          client: '创新科技有限公司',
          status: '延期',
          statusClass: 'status-delayed',
          progress: 45
        },
        { 
          name: '颐和园西区修缮工程',
          client: '北京市文物局',
          status: '待开始',
          statusClass: 'status-pending',
          progress: 0
        },
      ],
      recentActivities: [
        {
          title: '新项目已创建',
          description: '海淀区某住宅小区改造项目已创建并分配给工程部',
          time: '10分钟前',
          icon: 'fas fa-plus-circle',
          iconClass: 'icon-green'
        },
        {
          title: '客户反馈处理',
          description: '对王先生关于阳台漏水问题的投诉已解决',
          time: '1小时前',
          icon: 'fas fa-comment',
          iconClass: 'icon-blue'
        },
        {
          title: '项目进度更新',
          description: '国贸商场改造项目进度已更新至65%',
          time: '3小时前',
          icon: 'fas fa-chart-line',
          iconClass: 'icon-purple'
        },
        {
          title: '新合同签署',
          description: '与北京市朝阳区园林局签署了新的景观设计合同',
          time: '昨天',
          icon: 'fas fa-file-signature',
          iconClass: 'icon-orange'
        }
      ],
      quickActions: [
        {
          label: '新建项目',
          icon: 'fas fa-plus'
        },
        {
          label: '添加客户',
          icon: 'fas fa-user-plus'
        },
        {
          label: '工单分配',
          icon: 'fas fa-tasks'
        },
        {
          label: '生成报表',
          icon: 'fas fa-file-export'
        },
        {
          label: '客户消息',
          icon: 'fas fa-envelope'
        },
        {
          label: '系统设置',
          icon: 'fas fa-cog'
        }
      ]
    }
  },
  mounted() {
    // 尝试从localStorage获取用户信息
    const staffInfo = localStorage.getItem('staffInfo');
    if (staffInfo) {
      this.userInfo = JSON.parse(staffInfo);
    }
    
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isStaffLoggedIn');
    if (!isLoggedIn) {
      this.$router.push('/staff-login');
    }
  },
  methods: {
    handleLogout() {
      // 清除登录状态
      localStorage.removeItem('isStaffLoggedIn');
      localStorage.removeItem('staffInfo');
      localStorage.removeItem('isAdmin');
      
      // 跳转到登录页
      this.$router.push('/staff-login');
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f4f8;
}

/* 头部样式 */
.dashboard-header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
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

.logo-name {
  font-size: 18px;
  font-weight: 600;
  color: #0f2851;
}

.logo-tagline {
  font-size: 12px;
  color: #64748b;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #0f2851;
  font-size: 20px;
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.user-role {
  font-size: 12px;
  color: #64748b;
}

.logout-btn {
  background-color: transparent;
  color: #0f2851;
  border: 1px solid #0f2851;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.logout-btn i {
  margin-right: 5px;
}

.logout-btn:hover {
  background-color: #0f2851;
  color: white;
}

/* 内容区域 */
.dashboard-content {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
}

/* 侧边栏 */
.dashboard-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.sidebar-nav {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-item.active {
  background-color: rgba(15, 40, 81, 0.05);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #0f2851;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #1e293b;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(15, 40, 81, 0.05);
}

.nav-item.active .nav-link {
  color: #0f2851;
  font-weight: 600;
}

.nav-link i {
  width: 20px;
  margin-right: 10px;
  font-size: 18px;
}

/* 主内容 */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #0f2851;
  margin: 0;
}

.date-display {
  color: #64748b;
  font-size: 14px;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: rgba(15, 40, 81, 0.1);
  color: #0f2851;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 1rem;
}

.stat-info {
  flex-grow: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f2851;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-top: 5px;
}

.stat-change {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.stat-change i {
  margin-right: 3px;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

/* 仪表盘卡片 */
.dashboard-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-row.two-column {
  flex-wrap: wrap;
}

.dashboard-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex-grow: 1;
  overflow: hidden;
}

.dashboard-row.two-column .dashboard-card {
  flex-basis: calc(50% - 0.75rem);
  min-width: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f2851;
  margin: 0;
}

.view-all {
  color: #0f2851;
  font-size: 14px;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.card-content {
  padding: 1.5rem;
}

/* 表格样式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}

.data-table th {
  font-weight: 600;
  color: #64748b;
  font-size: 14px;
  background-color: #f8fafc;
}

.data-table td {
  border-top: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 14px;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-in-progress {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.status-completed {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.status-delayed {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-pending {
  background-color: rgba(156, 163, 175, 0.1);
  color: #6b7280;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-fill.status-in-progress {
  background-color: #3b82f6;
}

.progress-fill.status-completed {
  background-color: #10b981;
}

.progress-fill.status-delayed {
  background-color: #f59e0b;
}

.progress-fill.status-pending {
  background-color: #6b7280;
}

.action-btn {
  background-color: transparent;
  border: none;
  color: #0f2851;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: rgba(15, 40, 81, 0.1);
}

/* 活动列表 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.icon-green {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.icon-blue {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.icon-purple {
  background-color: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}

.icon-orange {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.activity-content {
  flex-grow: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 3px;
}

.activity-desc {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 5px;
}

.activity-time {
  font-size: 12px;
  color: #94a3b8;
}

/* 快捷操作网格 */
.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.quick-action-item {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-action-item:hover {
  background-color: rgba(15, 40, 81, 0.05);
  transform: translateY(-2px);
}

.action-icon {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f2851;
  font-size: 18px;
  margin-bottom: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.action-label {
  font-size: 13px;
  color: #1e293b;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-row.two-column .dashboard-card {
    flex-basis: 100%;
  }
}

@media (max-width: 992px) {
  .dashboard-content {
    flex-direction: column;
  }
  
  .dashboard-sidebar {
    width: 100%;
  }
  
  .nav-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .nav-item {
    flex: 1;
    min-width: 120px;
  }
  
  .nav-item.active::before {
    width: 100%;
    height: 4px;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .nav-link {
    flex-direction: column;
    text-align: center;
    padding: 1rem 0.5rem;
  }
  
  .nav-link i {
    margin-right: 0;
    margin-bottom: 5px;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .user-info {
    width: 100%;
    justify-content: space-between;
  }
  
  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .data-table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 576px) {
  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style> 