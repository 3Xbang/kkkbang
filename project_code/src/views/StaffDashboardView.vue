<template>
  <div class="staff-dashboard">
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
              <span class="user-role">{{ userInfo.department }} - {{ userInfo.role === 'engineer' ? '工程师' : userInfo.role }}</span>
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
              <a href="#" class="nav-link" @click.prevent="activeSection = 'dashboard'">
                <i class="fas fa-tachometer-alt"></i>
                <span>仪表盘</span>
              </a>
            </li>
            <li class="nav-item" :class="{'active': activeSection === 'punch'}">
              <a href="#" class="nav-link" @click.prevent="activeSection = 'punch'">
                <i class="fas fa-clock"></i>
                <span>打卡管理</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-tasks"></i>
                <span>我的任务</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-calendar-alt"></i>
                <span>工作日程</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-tools"></i>
                <span>维修工单</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-clipboard-list"></i>
                <span>项目报告</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-comments"></i>
                <span>沟通系统</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-cog"></i>
                <span>个人设置</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <!-- 打卡管理区域 -->
        <div v-if="activeSection === 'punch'">
          <div class="page-header">
            <h1 class="page-title">打卡管理</h1>
            <div class="date-display">{{ currentDate }}</div>
          </div>
          
          <PunchInOut @punch-status-changed="handlePunchStatusChanged" />
        </div>
        
        <!-- 仪表盘区域 -->
        <div v-else>
          <div class="page-header">
            <h1 class="page-title">员工工作台</h1>
            <div class="date-display">{{ currentDate }}</div>
          </div>

          <div class="welcome-card">
            <div class="welcome-icon">
              <i class="fas fa-hand-paper"></i>
            </div>
            <div class="welcome-message">
              <h2>欢迎回来, {{ userInfo.name }}!</h2>
              <p>今天有 <strong>5</strong> 个待处理任务和 <strong>3</strong> 个工程进度需要更新。</p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-clipboard-check"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">18</div>
                <div class="stat-label">完成的任务</div>
              </div>
              <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i> 12%
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">5</div>
                <div class="stat-label">待处理任务</div>
              </div>
              <div class="stat-change neutral">
                <i class="fas fa-minus"></i> 0%
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">4.8</div>
                <div class="stat-label">客户评分</div>
              </div>
              <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i> 3%
              </div>
            </div>
          </div>

          <div class="dashboard-row">
            <div class="dashboard-card today-tasks">
              <div class="card-header">
                <h2 class="card-title">今日任务</h2>
                <a href="#" class="view-all">查看全部</a>
              </div>
              <div class="card-content">
                <div class="task-list">
                  <div class="task-item" v-for="(task, index) in todayTasks" :key="index">
                    <div class="task-status" :class="{'completed': task.completed}">
                      <i class="fas" :class="task.completed ? 'fa-check-circle' : 'fa-circle'"></i>
                    </div>
                    <div class="task-content">
                      <div class="task-title">{{ task.title }}</div>
                      <div class="task-meta">
                        <span class="task-time"><i class="fas fa-clock"></i> {{ task.time }}</span>
                        <span class="task-location"><i class="fas fa-map-marker-alt"></i> {{ task.location }}</span>
                      </div>
                    </div>
                    <div class="task-priority" :class="'priority-' + task.priority">
                      {{ task.priorityLabel }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-row two-column">
            <div class="dashboard-card my-projects">
              <div class="card-header">
                <h2 class="card-title">我的项目</h2>
                <a href="#" class="view-all">查看全部</a>
              </div>
              <div class="card-content">
                <div class="project-list">
                  <div class="project-item" v-for="(project, index) in myProjects" :key="index">
                    <div class="project-info">
                      <div class="project-title">{{ project.name }}</div>
                      <div class="project-meta">
                        <span class="project-client"><i class="fas fa-building"></i> {{ project.client }}</span>
                        <span class="project-deadline"><i class="fas fa-calendar-alt"></i> {{ project.deadline }}</span>
                      </div>
                    </div>
                    <div class="project-progress">
                      <div class="progress-label">{{ project.progress }}%</div>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{width: project.progress + '%'}" :class="'status-' + project.status"></div>
                      </div>
                      <div class="project-status" :class="'status-' + project.status">{{ project.statusText }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="dashboard-card upcoming-schedule">
              <div class="card-header">
                <h2 class="card-title">近期日程</h2>
              </div>
              <div class="card-content">
                <div class="schedule-list">
                  <div class="schedule-date">今天</div>
                  <div class="schedule-item" v-for="(event, index) in todaySchedule" :key="'today-'+index">
                    <div class="schedule-time">{{ event.time }}</div>
                    <div class="schedule-details">
                      <div class="schedule-title">{{ event.title }}</div>
                      <div class="schedule-location" v-if="event.location">
                        <i class="fas fa-map-marker-alt"></i> {{ event.location }}
                      </div>
                    </div>
                  </div>

                  <div class="schedule-date">明天</div>
                  <div class="schedule-item" v-for="(event, index) in tomorrowSchedule" :key="'tomorrow-'+index">
                    <div class="schedule-time">{{ event.time }}</div>
                    <div class="schedule-details">
                      <div class="schedule-title">{{ event.title }}</div>
                      <div class="schedule-location" v-if="event.location">
                        <i class="fas fa-map-marker-alt"></i> {{ event.location }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-row">
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
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import PunchInOut from '@/components/PunchInOut.vue';

export default {
  name: 'StaffDashboardView',
  components: {
    PunchInOut
  },
  data() {
    return {
      activeSection: 'dashboard',
      punchStatus: null,
      userInfo: {
        name: '张工程师',
        role: 'engineer',
        department: '工程部'
      },
      currentDate: new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      todayTasks: [
        {
          title: '国贸商场改造项目 - 现场验收',
          time: '10:00 - 12:00',
          location: '朝阳区建国路',
          priority: 'high',
          priorityLabel: '高',
          completed: false
        },
        {
          title: '提交望京SOHO项目周报',
          time: '14:00',
          location: '办公室',
          priority: 'medium',
          priorityLabel: '中',
          completed: false
        },
        {
          title: '处理客户投诉 - 水管渗漏问题',
          time: '16:00 - 17:30',
          location: '海淀区中关村',
          priority: 'high',
          priorityLabel: '高',
          completed: false
        },
        {
          title: '记录工程材料使用情况',
          time: '9:00 - 9:30',
          location: '办公室',
          priority: 'low',
          priorityLabel: '低',
          completed: true
        },
        {
          title: '团队晨会',
          time: '8:30 - 9:00',
          location: '会议室A',
          priority: 'medium',
          priorityLabel: '中',
          completed: true
        }
      ],
      myProjects: [
        {
          name: '国贸商场改造项目',
          client: '北京国贸有限公司',
          deadline: '2023/12/15',
          progress: 65,
          status: 'in-progress',
          statusText: '进行中'
        },
        {
          name: '望京SOHO办公室装修',
          client: '创新科技有限公司',
          deadline: '2023/11/30',
          progress: 45,
          status: 'delayed',
          statusText: '延期'
        },
        {
          name: '朝阳公园景观改造',
          client: '北京市朝阳区园林局',
          deadline: '2023/10/10',
          progress: 100,
          status: 'completed',
          statusText: '已完成'
        }
      ],
      todaySchedule: [
        {
          time: '8:30',
          title: '团队晨会',
          location: '会议室A'
        },
        {
          time: '10:00',
          title: '国贸项目验收',
          location: '朝阳区建国路'
        },
        {
          time: '14:00',
          title: '提交周报'
        }
      ],
      tomorrowSchedule: [
        {
          time: '9:30',
          title: '项目评审会',
          location: '会议室B'
        },
        {
          time: '13:00',
          title: '客户会面 - 新项目洽谈',
          location: '公司接待厅'
        }
      ],
      quickActions: [
        {
          label: '创建报告',
          icon: 'fas fa-file-alt'
        },
        {
          label: '提交工时',
          icon: 'fas fa-clock'
        },
        {
          label: '申请材料',
          icon: 'fas fa-tools'
        },
        {
          label: '问题反馈',
          icon: 'fas fa-exclamation-circle'
        },
        {
          label: '请假申请',
          icon: 'fas fa-calendar-plus'
        },
        {
          label: '团队消息',
          icon: 'fas fa-comments'
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
      
      // 跳转到登录页
      this.$router.push('/staff-login');
    },
    
    // 处理打卡状态变化
    handlePunchStatusChanged(status) {
      this.punchStatus = status;
      
      let message = '';
      if (status.type === 'in') {
        message = `上班打卡成功！时间: ${status.time}`;
      } else {
        message = `下班打卡成功！时间: ${status.time}`;
      }
      
      // 这里可以添加通知或提示
      alert(message);
    }
  }
}
</script>

<style scoped>
.staff-dashboard {
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

/* 欢迎卡片 */
.welcome-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.welcome-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(15, 40, 81, 0.1);
  color: #0f2851;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.welcome-message h2 {
  font-size: 20px;
  font-weight: 600;
  color: #0f2851;
  margin: 0 0 5px 0;
}

.welcome-message p {
  font-size: 15px;
  color: #64748b;
  margin: 0;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.stat-change.neutral {
  color: #9ca3af;
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

/* 任务列表 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.3s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.task-status {
  flex-shrink: 0;
  margin-right: 1rem;
  color: #9ca3af;
  font-size: 20px;
}

.task-status.completed {
  color: #10b981;
}

.task-content {
  flex-grow: 1;
}

.task-title {
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 5px;
}

.task-meta {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 13px;
}

.task-time i, .task-location i {
  margin-right: 3px;
}

.task-priority {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 1rem;
}

.priority-high {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.priority-medium {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.priority-low {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

/* 项目列表 */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-item {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.project-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.project-info {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 5px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 13px;
}

.project-client i, .project-deadline i {
  margin-right: 3px;
}

.project-progress {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  text-align: right;
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

.project-status {
  font-size: 13px;
  font-weight: 500;
}

.status-in-progress {
  color: #3b82f6;
}

.progress-fill.status-in-progress {
  background-color: #3b82f6;
}

.status-completed {
  color: #10b981;
}

.progress-fill.status-completed {
  background-color: #10b981;
}

.status-delayed {
  color: #f59e0b;
}

.progress-fill.status-delayed {
  background-color: #f59e0b;
}

/* 日程列表 */
.schedule-list {
  display: flex;
  flex-direction: column;
}

.schedule-date {
  font-size: 14px;
  font-weight: 600;
  color: #0f2851;
  padding: 5px 0;
  margin: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}

.schedule-date:first-child {
  margin-top: 0;
}

.schedule-item {
  display: flex;
  margin-bottom: 15px;
  padding-left: 10px;
}

.schedule-time {
  width: 80px;
  font-size: 14px;
  color: #64748b;
  flex-shrink: 0;
}

.schedule-details {
  flex-grow: 1;
}

.schedule-title {
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 3px;
  font-weight: 500;
}

.schedule-location {
  font-size: 13px;
  color: #64748b;
}

.schedule-location i {
  margin-right: 3px;
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
    grid-template-columns: repeat(3, 1fr);
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
  
  .welcome-card {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .project-meta {
    flex-direction: column;
    gap: 5px;
  }
}

@media (max-width: 576px) {
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .task-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .task-status {
    margin-bottom: 10px;
  }
  
  .task-priority {
    margin-left: 0;
    margin-top: 10px;
    align-self: flex-start;
  }
}
</style> 