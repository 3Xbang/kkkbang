<template>
  <div class="client-service-container">
    <!-- 顶部导航栏 -->
    <header class="service-header">
      <div class="header-container">
        <div class="logo-wrapper">
          <h1 class="company-name">3X BANG</h1>
          <span class="logo-tagline">建筑工程管理专家</span>
        </div>
        <div class="user-info">
          <div class="welcome-message">
            欢迎，{{ userInfo.name }}
            <span class="user-role">{{ getRoleLabel() }}</span>
          </div>
          <div class="user-avatar" v-if="userInfo.avatar">
            <img :src="userInfo.avatar" alt="用户头像">
          </div>
          <div class="user-avatar" v-else>
            <i class="fas fa-user-circle"></i>
          </div>
          <button class="logout-btn" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i> 退出
          </button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="service-content">
      <!-- 顶部横向导航样式 -->
      <nav class="top-nav">
        <ul class="nav-list">
          <li class="nav-item" :class="{ 'active': activeModule === 'dashboard' }">
            <a href="#" @click.prevent="setActiveModule('dashboard')">
              <i class="fas fa-tachometer-alt"></i>
              <span>服务概览</span>
            </a>
          </li>
          <li class="nav-item" :class="{ 'active': activeModule === 'projects' }">
            <a href="#" @click.prevent="setActiveModule('projects')">
              <i class="fas fa-tasks"></i>
              <span>项目进度</span>
            </a>
          </li>
          <li class="nav-item" :class="{ 'active': activeModule === 'additions' }">
            <a href="#" @click.prevent="setActiveModule('additions')">
              <i class="fas fa-file-invoice-dollar"></i>
              <span>临时增项</span>
            </a>
          </li>
          <li class="nav-item" :class="{ 'active': activeModule === 'repairs' }">
            <a href="#" @click.prevent="setActiveModule('repairs')">
              <i class="fas fa-tools"></i>
              <span>报修服务</span>
            </a>
          </li>
          <li class="nav-item" :class="{ 'active': activeModule === 'quotes' }">
            <a href="#" @click.prevent="setActiveModule('quotes')">
              <i class="fas fa-file-signature"></i>
              <span>报价签收</span>
            </a>
          </li>
          <li class="nav-item" :class="{ 'active': activeModule === 'receipts' }">
            <a href="#" @click.prevent="setActiveModule('receipts')">
              <i class="fas fa-money-check-alt"></i>
              <span>收据/付款记录</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 仪表盘总览 -->
        <div class="module-container" v-show="activeModule === 'dashboard'">
          <h1 class="module-title">服务概览</h1>
          <div class="dashboard-grid">
            <div class="dashboard-card">
              <div class="card-icon"><i class="fas fa-tasks"></i></div>
              <div class="card-info">
                <h3>项目进度</h3>
                <p class="card-value">{{ statistics.inProgressProjects }} <span>个进行中</span></p>
              </div>
              <button class="card-action" @click="setActiveModule('projects')">
                查看详情 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div class="dashboard-card">
              <div class="card-icon"><i class="fas fa-file-invoice-dollar"></i></div>
              <div class="card-info">
                <h3>临时增项</h3>
                <p class="card-value">{{ statistics.pendingAdditions }} <span>个待确认</span></p>
              </div>
              <button class="card-action" @click="setActiveModule('additions')">
                查看详情 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div class="dashboard-card">
              <div class="card-icon"><i class="fas fa-tools"></i></div>
              <div class="card-info">
                <h3>报修服务</h3>
                <p class="card-value">{{ statistics.activeRepairs }} <span>个进行中</span></p>
              </div>
              <button class="card-action" @click="setActiveModule('repairs')">
                查看详情 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div class="dashboard-card">
              <div class="card-icon"><i class="fas fa-file-signature"></i></div>
              <div class="card-info">
                <h3>报价签收</h3>
                <p class="card-value">{{ statistics.pendingQuotes }} <span>个待签收</span></p>
              </div>
              <button class="card-action" @click="setActiveModule('quotes')">
                查看详情 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div class="dashboard-card">
              <div class="card-icon"><i class="fas fa-money-check-alt"></i></div>
              <div class="card-info">
                <h3>收款单签收</h3>
                <p class="card-value">{{ statistics.pendingReceipts }} <span>个待签收</span></p>
              </div>
              <button class="card-action" @click="setActiveModule('receipts')">
                查看详情 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 项目进度模块 -->
        <div class="module-container" v-show="activeModule === 'projects'">
          <h1 class="module-title">项目进度</h1>
          <p class="module-description">查看您的项目进展情况和里程碑</p>
          
          <!-- 项目列表 -->
          <div class="project-list">
            <div v-for="project in projects" :key="project.id" class="project-card">
              <div class="project-header">
                <h3 class="project-title">{{ project.name }}</h3>
                <div class="project-status" :class="getProjectStatus(project.status).class">
                  {{ getProjectStatus(project.status).label }}
                </div>
              </div>
              
              <div class="project-meta">
                <div class="meta-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ project.address }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ formatDate(project.startDate) }} ~ {{ formatDate(project.estimatedEndDate) }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-user-tie"></i>
                  <span>项目经理: {{ project.manager.name }} ({{ project.manager.phone }})</span>
                </div>
              </div>
              
              <div class="project-progress">
                <div class="progress-info">
                  <span class="progress-label">项目进度</span>
                  <span class="progress-percentage">{{ project.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: project.progress + '%' }" 
                       :class="{ 'progress-delayed': project.status === 'delayed' }"></div>
                </div>
              </div>
              
              <div class="milestones-container">
                <h4 class="milestones-title">
                  <i class="fas fa-flag"></i> 项目里程碑
                </h4>
                <div class="milestones-timeline">
                  <div v-for="milestone in project.milestones" :key="milestone.id" 
                       class="milestone-item" :class="getMilestoneStatus(milestone.status).class">
                    <div class="milestone-dot"></div>
                    <div class="milestone-content">
                      <div class="milestone-date">{{ formatDate(milestone.date) }}</div>
                      <div class="milestone-name">{{ milestone.name }}</div>
                      <div class="milestone-status-label">{{ getMilestoneStatus(milestone.status).label }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="project-updates">
                <h4 class="updates-title">
                  <i class="fas fa-history"></i> 最近更新
                </h4>
                <div class="updates-list">
                  <div v-for="(update, index) in project.recentUpdates" :key="index" class="update-item">
                    <div class="update-date">{{ formatDate(update.date) }}</div>
                    <div class="update-content">{{ update.content }}</div>
                  </div>
                </div>
              </div>
              
              <div class="project-actions">
                <button class="detail-btn" @click="viewProjectDetails(project)">
                  <i class="fas fa-images"></i> 查看施工照片
                </button>
                <button class="detail-btn">
                  <i class="fas fa-file-alt"></i> 查看合同详情
                </button>
                <button class="detail-btn" @click="callTechnician(project)">
                  <i class="fas fa-comments"></i> 联系项目经理
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-container" v-show="activeModule === 'additions'">
          <h1 class="module-title">临时增项</h1>
          <p class="module-description">查看和确认项目的临时增项申请</p>
          
          <!-- 增项列表 -->
          <div class="additions-list">
            <div v-for="item in additionalItems" :key="item.id" class="addition-card">
              <div class="addition-header">
                <div>
                  <h3 class="addition-title">{{ item.title }}</h3>
                  <p class="addition-project">
                    <i class="fas fa-building"></i> {{ item.projectName }}
                  </p>
                </div>
                <div class="addition-status" :class="getAdditionStatus(item.status).class">
                  {{ getAdditionStatus(item.status).label }}
                </div>
              </div>
              
              <div class="addition-content">
                <p class="addition-description">{{ item.description }}</p>
                
                <div class="addition-budget">
                  <div class="budget-item">
                    <span class="budget-label">原预算</span>
                    <span class="budget-value">¥{{ item.originalBudget.toLocaleString() }}</span>
                  </div>
                  <div class="budget-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                  <div class="budget-item">
                    <span class="budget-label">新预算</span>
                    <span class="budget-value">¥{{ item.newBudget.toLocaleString() }}</span>
                  </div>
                  <div class="budget-difference" :class="item.difference > 0 ? 'budget-increase' : 'budget-decrease'">
                    <i :class="item.difference > 0 ? 'fas fa-plus' : 'fas fa-minus'"></i>
                    ¥{{ Math.abs(item.difference).toLocaleString() }}
                  </div>
                </div>
                
                <div class="addition-date">
                  <i class="far fa-calendar-alt"></i> 申请日期: {{ formatDate(item.date) }}
                </div>
                
                <div class="addition-images" v-if="item.images && item.images.length > 0">
                  <h4 class="images-title">
                    <i class="far fa-images"></i> 相关图片
                  </h4>
                  <div class="image-thumbnails">
                    <div v-for="(image, index) in item.images" :key="index" class="image-thumbnail">
                      <div class="image-placeholder">
                        <i class="far fa-image"></i>
                        <span>{{ image }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="addition-actions" v-if="item.status === 'pending'">
                <button class="approve-btn" @click="confirmAdditionalItem(item)">
                  <i class="fas fa-check"></i> 确认增项
                </button>
                <button class="reject-btn" @click="declineAdditionalItem(item)">
                  <i class="fas fa-times"></i> 拒绝增项
                </button>
              </div>
              
              <div class="addition-confirmed" v-else>
                <div class="confirmed-date">
                  <i class="fas fa-check-circle"></i> 
                  已{{ item.status === 'approved' ? '确认' : '拒绝' }}于 {{ formatDate(item.date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-container" v-show="activeModule === 'repairs'">
          <h1 class="module-title">报修服务</h1>
          <p class="module-description">提交新的报修申请或查看现有报修状态</p>
          
          <div class="repairs-header">
            <button class="new-repair-btn" @click="createNewRepair">
              <i class="fas fa-plus"></i> 新建报修申请
            </button>
          </div>
          
          <!-- 报修列表 -->
          <div class="repairs-list">
            <div v-for="repair in repairs" :key="repair.id" class="repair-card">
              <div class="repair-header">
                <div>
                  <h3 class="repair-title">{{ repair.title }}</h3>
                  <p class="repair-project">
                    <i class="fas fa-building"></i> {{ repair.projectName }}
                  </p>
                </div>
                <div class="repair-status" :class="getRepairStatus(repair.status).class">
                  {{ getRepairStatus(repair.status).label }}
                </div>
              </div>
              
              <div class="repair-content">
                <div class="repair-description">
                  <p>{{ repair.description }}</p>
                </div>
                
                <div class="repair-dates">
                  <div class="date-item">
                    <i class="fas fa-calendar-check"></i>
                    <span class="date-label">报修日期:</span>
                    <span class="date-value">{{ formatDate(repair.reportDate) }}</span>
                  </div>
                  
                  <div class="date-item" v-if="repair.appointmentDate">
                    <i class="fas fa-calendar-day"></i>
                    <span class="date-label">预约日期:</span>
                    <span class="date-value">{{ formatDate(repair.appointmentDate) }}</span>
                  </div>
                </div>
                
                <div class="repair-priority" v-if="repair.priority">
                  <i class="fas fa-exclamation-circle"></i>
                  <span class="priority-label">优先级:</span>
                  <span class="priority-value" :class="'priority-' + repair.priority">
                    {{ {'high': '高', 'medium': '中', 'low': '低'}[repair.priority] }}
                  </span>
                </div>
                
                <div class="repair-images" v-if="repair.images && repair.images.length > 0">
                  <h4 class="images-title">
                    <i class="far fa-images"></i> 相关图片
                  </h4>
                  <div class="image-thumbnails">
                    <div v-for="(image, index) in repair.images" :key="index" class="image-thumbnail">
                      <div class="image-placeholder">
                        <i class="far fa-image"></i>
                        <span>{{ image }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="repair-technician" v-if="repair.technician && ['appointed', 'processing'].includes(repair.status)">
                  <h4 class="technician-title">
                    <i class="fas fa-hard-hat"></i> 技术人员信息
                  </h4>
                  <div class="technician-info">
                    <div class="technician-name">
                      <i class="fas fa-user"></i>
                      <span>{{ repair.technician.name }}</span>
                    </div>
                    <div class="technician-phone">
                      <i class="fas fa-phone"></i>
                      <span>{{ repair.technician.phone }}</span>
                    </div>
                    <div class="technician-arrival" v-if="repair.technician.estimated_arrival">
                      <i class="fas fa-clock"></i>
                      <span>预计到达: {{ repair.technician.estimated_arrival }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="repair-actions">
                <button class="action-btn contact-btn" v-if="repair.technician">
                  <i class="fas fa-phone-alt"></i> 联系技术人员
                </button>
                <button class="action-btn cancel-btn" v-if="repair.status === 'pending' || repair.status === 'appointed'">
                  <i class="fas fa-times"></i> 取消报修
                </button>
                <button class="action-btn complete-btn" v-if="repair.status === 'processing'">
                  <i class="fas fa-check"></i> 确认完成
                </button>
                <button class="action-btn feedback-btn" v-if="repair.status === 'completed'">
                  <i class="fas fa-star"></i> 服务评价
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-container" v-show="activeModule === 'quotes'">
          <h1 class="module-title">报价签收</h1>
          <p class="module-description">查看和签收项目报价单</p>
          
          <!-- 报价列表 -->
          <div class="quotes-list">
            <div v-for="quote in quotes" :key="quote.id" class="quote-card">
              <div class="quote-header">
                <div>
                  <h3 class="quote-title">{{ quote.title }}</h3>
                  <p class="quote-project">
                    <i class="fas fa-building"></i> {{ quote.projectName }}
                  </p>
                </div>
                <div class="quote-status" :class="getQuoteStatus(quote.status).class">
                  {{ getQuoteStatus(quote.status).label }}
                </div>
              </div>
              
              <div class="quote-content">
                <div class="quote-description">
                  {{ quote.description }}
                </div>
                
                <div class="quote-date-info">
                  <div class="date-item">
                    <i class="fas fa-calendar-plus"></i>
                    <span class="date-label">创建日期:</span>
                    <span class="date-value">{{ formatDate(quote.createdDate) }}</span>
                  </div>
                  <div class="date-item">
                    <i class="fas fa-calendar-times"></i>
                    <span class="date-label">有效期至:</span>
                    <span class="date-value" :class="{'date-expired': new Date(quote.validUntil) < new Date()}">
                      {{ formatDate(quote.validUntil) }}
                    </span>
                  </div>
                </div>
                
                <div class="quote-details">
                  <h4 class="details-title">
                    <i class="fas fa-list-ul"></i> 详细报价明细
                  </h4>
                  <div class="quote-table">
                    <table>
                      <thead>
                        <tr>
                          <th>项目</th>
                          <th>规格</th>
                          <th>数量</th>
                          <th>单价 (¥)</th>
                          <th>金额 (¥)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in quote.details" :key="index">
                          <td>{{ detail.item }}</td>
                          <td>{{ detail.specification }}</td>
                          <td>{{ detail.quantity }}</td>
                          <td>{{ detail.unitPrice.toLocaleString() }}</td>
                          <td>{{ detail.amount.toLocaleString() }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="4" class="total-label">总计</td>
                          <td class="total-value">{{ quote.amount.toLocaleString() }}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              
              <div class="quote-actions" v-if="quote.status === 'pending'">
                <button class="sign-btn" @click="handleQuoteSign(quote, true)">
                  <i class="fas fa-signature"></i> 签收报价
                </button>
                <button class="reject-btn" @click="handleQuoteSign(quote, false)">
                  <i class="fas fa-times"></i> 拒绝报价
                </button>
                <button class="discuss-btn">
                  <i class="fas fa-comments"></i> 联系商议
                </button>
              </div>
              
              <div class="quote-signed" v-else>
                <div class="signed-info">
                  <i :class="quote.status === 'signed' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                  <span>已{{ quote.status === 'signed' ? '签收' : (quote.status === 'rejected' ? '拒绝' : '过期') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-container" v-show="activeModule === 'receipts'">
          <h1 class="module-title">收据/付款记录</h1>
          <p class="module-description">查看您的付款历史和下载收据</p>
          
          <!-- 付款记录筛选 -->
          <div class="receipts-filter">
            <div class="filter-group">
              <label>按项目筛选:</label>
              <select v-model="receiptFilters.project">
                <option value="">全部项目</option>
                <option v-for="project in projects" :key="project.id" :value="project.id">
                  {{ project.name }}
                </option>
              </select>
            </div>
            
            <div class="filter-group">
              <label>日期范围:</label>
              <div class="date-range">
                <div class="date-input">
                  <i class="fas fa-calendar-alt"></i>
                  <input type="date" v-model="receiptFilters.dateFrom" />
                </div>
                <span>至</span>
                <div class="date-input">
                  <i class="fas fa-calendar-alt"></i>
                  <input type="date" v-model="receiptFilters.dateTo" />
                </div>
              </div>
            </div>
            
            <div class="filter-group">
              <label>支付状态:</label>
              <select v-model="receiptFilters.status">
                <option value="">全部状态</option>
                <option value="paid">已支付</option>
                <option value="pending">待支付</option>
                <option value="overdue">已逾期</option>
              </select>
            </div>
            
            <button class="filter-apply-btn" @click="applyReceiptFilters">
              <i class="fas fa-filter"></i> 应用筛选
            </button>
            
            <button class="filter-reset-btn" @click="resetReceiptFilters">
              <i class="fas fa-undo"></i> 重置
            </button>
          </div>
          
          <!-- 付款概览卡片 -->
          <div class="payment-overview">
            <div class="overview-card">
              <div class="overview-icon success">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="overview-info">
                <h3>已支付金额</h3>
                <p class="overview-amount">¥{{ formatNumber(paymentStats.paid) }}</p>
              </div>
            </div>
            
            <div class="overview-card">
              <div class="overview-icon warning">
                <i class="fas fa-clock"></i>
              </div>
              <div class="overview-info">
                <h3>待支付金额</h3>
                <p class="overview-amount">¥{{ formatNumber(paymentStats.pending) }}</p>
              </div>
            </div>
            
            <div class="overview-card">
              <div class="overview-icon danger">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="overview-info">
                <h3>逾期未付</h3>
                <p class="overview-amount">¥{{ formatNumber(paymentStats.overdue) }}</p>
              </div>
            </div>
          </div>
          
          <!-- 付款记录列表 -->
          <div class="receipts-list">
            <div v-for="receipt in filteredReceipts" :key="receipt.id" class="receipt-card">
              <div class="receipt-header">
                <div class="receipt-info">
                  <h3 class="receipt-title">
                    <i class="fas fa-file-invoice-dollar"></i> {{ receipt.invoiceNumber }}
                  </h3>
                  <p class="receipt-project">
                    <i class="fas fa-building"></i> {{ receipt.projectName }}
                  </p>
                </div>
                <div class="receipt-status" :class="getPaymentStatus(receipt.status).class">
                  {{ getPaymentStatus(receipt.status).label }}
                </div>
              </div>
              
              <div class="receipt-content">
                <div class="receipt-details">
                  <div class="detail-item">
                    <span class="detail-label">开票日期:</span>
                    <span class="detail-value">{{ formatDate(receipt.invoiceDate) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">到期日:</span>
                    <span class="detail-value" :class="{'date-expired': receipt.status === 'overdue'}">
                      {{ formatDate(receipt.dueDate) }}
                    </span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">支付日期:</span>
                    <span class="detail-value">{{ receipt.paymentDate ? formatDate(receipt.paymentDate) : '尚未支付' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">支付方式:</span>
                    <span class="detail-value">{{ receipt.paymentMethod || '-' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">金额:</span>
                    <span class="detail-value amount">¥{{ formatNumber(receipt.amount) }}</span>
                  </div>
                </div>
                
                <div class="receipt-description">
                  <h4>付款详情</h4>
                  <p>{{ receipt.description }}</p>
                </div>
              </div>
              
              <div class="receipt-actions">
                <button class="download-btn" @click="downloadReceipt(receipt)">
                  <i class="fas fa-download"></i> 下载收据
                </button>
                
                <button v-if="receipt.status !== 'paid'" class="pay-btn" @click="handlePayment(receipt)">
                  <i class="fas fa-credit-card"></i> 立即支付
                </button>
                
                <button class="details-btn" @click="viewReceiptDetails(receipt)">
                  <i class="fas fa-search-plus"></i> 查看详情
                </button>
              </div>
            </div>
          </div>
          
          <!-- 无付款记录提示 -->
          <div class="no-records" v-if="filteredReceipts.length === 0">
            <i class="fas fa-file-invoice"></i>
            <p>没有找到付款记录</p>
            <p class="sub-text">尝试调整筛选条件或查看其他项目</p>
          </div>
        </div>
      </main>
    </div>

    <!-- 页脚 -->
    <footer class="service-footer">
      <div class="footer-container">
        <div class="copyright">
          © 2023 3X BANG 建筑工程管理. 保留所有权利.
        </div>
        <div class="footer-links">
          <a href="#">帮助中心</a>
          <a href="#">联系客服</a>
          <a href="#">隐私政策</a>
          <a href="#">服务条款</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ClientServiceView',
  data() {
    return {
      // 基础数据
      activeModule: 'dashboard',
      userInfo: {
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: null, // 用户头像
        phone: '138****5678',
        address: '上海市浦东新区陆家嘴金融中心'
      },
      // 项目进度数据
      projects: [
        {
          id: 'PRJ2023001',
          name: '金色家园装修项目',
          address: '北京市朝阳区建国路88号金色家园3单元502',
          startDate: '2023-03-15',
          estimatedEndDate: '2023-06-30',
          status: 'in-progress', // in-progress, completed, delayed, on-hold
          progress: 65,
          manager: {
            name: '张工',
            phone: '13812345678'
          },
          milestones: [
            { id: 1, name: '前期设计', status: 'completed', date: '2023-03-20' },
            { id: 2, name: '拆改施工', status: 'completed', date: '2023-04-10' },
            { id: 3, name: '水电施工', status: 'completed', date: '2023-04-25' },
            { id: 4, name: '泥瓦施工', status: 'in-progress', date: '2023-05-15' },
            { id: 5, name: '木工施工', status: 'not-started', date: '2023-05-30' },
            { id: 6, name: '油漆施工', status: 'not-started', date: '2023-06-15' },
            { id: 7, name: '安装收尾', status: 'not-started', date: '2023-06-25' }
          ],
          recentUpdates: [
            { date: '2023-05-12', content: '泥瓦施工已完成60%，预计下周完成' },
            { date: '2023-05-08', content: '客厅地砖铺设完成' },
            { date: '2023-05-05', content: '墙面瓷砖施工开始' }
          ]
        },
        {
          id: 'PRJ2023002',
          name: '阳光公寓厨卫改造',
          address: '北京市海淀区西二旗大街58号阳光公寓2号楼1201',
          startDate: '2023-04-10',
          estimatedEndDate: '2023-05-20',
          status: 'delayed', // in-progress, completed, delayed, on-hold
          progress: 40,
          manager: {
            name: '李工',
            phone: '13987654321'
          },
          milestones: [
            { id: 1, name: '前期设计', status: 'completed', date: '2023-04-15' },
            { id: 2, name: '拆除工作', status: 'completed', date: '2023-04-20' },
            { id: 3, name: '水电改造', status: 'in-progress', date: '2023-05-01' },
            { id: 4, name: '墙地砖铺设', status: 'not-started', date: '2023-05-10' },
            { id: 5, name: '洁具安装', status: 'not-started', date: '2023-05-15' }
          ],
          recentUpdates: [
            { date: '2023-05-10', content: '由于材料延迟到货，水电改造进度延后5天' },
            { date: '2023-05-03', content: '厨房水电改造完成' },
            { date: '2023-04-28', content: '卫生间水电改造开始' }
          ]
        }
      ],
      
      // 临时增项数据
      additionalItems: [
        {
          id: 'ADD2023001',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '更换高端品牌卫浴洁具',
          description: '客户要求将原定的国产卫浴洁具更换为德国品牌，包括马桶、洗手盆和花洒。',
          originalBudget: 5000,
          newBudget: 15000,
          difference: 10000,
          date: '2023-05-03',
          status: 'pending', // pending, approved, rejected
          images: ['bathroom_fixture1.jpg', 'bathroom_fixture2.jpg']
        },
        {
          id: 'ADD2023002',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '客厅新增石膏线造型',
          description: '客户要求在客厅天花板增加石膏线造型，提升空间质感。',
          originalBudget: 0,
          newBudget: 3500,
          difference: 3500,
          date: '2023-05-05',
          status: 'pending', // pending, approved, rejected
          images: ['ceiling_design.jpg']
        },
        {
          id: 'ADD2023003',
          projectId: 'PRJ2023002',
          projectName: '阳光公寓厨卫改造',
          title: '厨房增加岛台',
          description: '客户要求在厨房中间增加一个岛台，用于早餐和备餐使用。',
          originalBudget: 0,
          newBudget: 6000,
          difference: 6000,
          date: '2023-05-08',
          status: 'pending', // pending, approved, rejected
          images: ['kitchen_island.jpg']
        }
      ],
      
      // 报修服务数据
      repairs: [
        {
          id: 'REP2023001',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '卧室墙面出现裂缝',
          description: '主卧室北侧墙面出现约30厘米长的裂缝，疑似是墙体干燥收缩导致。',
          reportDate: '2023-05-10',
          appointmentDate: '2023-05-12',
          status: 'processing', // pending, appointed, processing, completed, cancelled
          priority: 'medium', // high, medium, low
          images: ['wall_crack1.jpg', 'wall_crack2.jpg'],
          technician: {
            name: '王师傅',
            phone: '13712345678',
            estimated_arrival: '09:00-11:00'
          }
        }
      ],
      
      // 报价签收数据
      quotes: [
        {
          id: 'QUO2023001',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '追加卧室衣柜定制',
          description: '主卧室定制实木衣柜，包含内部隔板、抽屉和led照明。',
          amount: 12000,
          createdDate: '2023-05-08',
          validUntil: '2023-05-18',
          status: 'pending', // pending, signed, expired, rejected
          details: [
            { item: '实木板材', specification: '优质樱桃木', quantity: '12平方米', unitPrice: 600, amount: 7200 },
            { item: '五金配件', specification: '德国进口静音导轨', quantity: '3套', unitPrice: 800, amount: 2400 },
            { item: '人工费用', specification: '制作安装一体', quantity: '1项', unitPrice: 2400, amount: 2400 }
          ]
        },
        {
          id: 'QUO2023002',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '客厅电视背景墙造型',
          description: '客厅电视墙采用石材和木质结合的设计，提升空间质感。',
          amount: 8500,
          createdDate: '2023-05-09',
          validUntil: '2023-05-19',
          status: 'pending', // pending, signed, expired, rejected
          details: [
            { item: '大理石材', specification: '进口云灰石', quantity: '4平方米', unitPrice: 1200, amount: 4800 },
            { item: '木质隔板', specification: '实木贴皮', quantity: '3平方米', unitPrice: 500, amount: 1500 },
            { item: '造型石膏板', specification: '环保型', quantity: '2平方米', unitPrice: 200, amount: 400 },
            { item: '人工费用', specification: '安装造型一体', quantity: '1项', unitPrice: 1800, amount: 1800 }
          ]
        }
      ],
      
      // 收款单签收数据
      receipts: [
        {
          id: 'REC2023001',
          projectId: 'PRJ2023001',
          projectName: '金色家园装修项目',
          title: '装修第二期款项',
          amount: 35000,
          dueDate: '2023-05-15',
          createdDate: '2023-05-09',
          status: 'pending', // pending, signed, paid, overdue
          paymentMethod: [
            { method: '银行转账', account: '6222 **** **** 1234', bank: '中国建设银行' }
          ],
          projectPhase: '水电工程完工后',
          remarks: '请在付款后上传转账凭证，以便我们确认收款并开具发票。'
        }
      ],
      receiptFilters: {
        project: '',
        dateFrom: '',
        dateTo: '',
        status: ''
      },
      paymentStats: {
        paid: 0,
        pending: 0,
        overdue: 0
      },
      filteredReceipts: []
    }
  },
  computed: {
    // 统计指标
    statistics() {
      return {
        inProgressProjects: this.projects.filter(p => p.status === 'in-progress').length,
        pendingAdditions: this.additionalItems.filter(item => item.status === 'pending').length,
        activeRepairs: this.repairs.filter(r => ['pending', 'appointed', 'processing'].includes(r.status)).length,
        pendingQuotes: this.quotes.filter(q => q.status === 'pending').length,
        pendingReceipts: this.receipts.filter(r => r.status === 'pending').length
      };
    },
    
    // 获取项目状态标签
    getProjectStatus() {
      return (status) => {
        const statusMap = {
          'in-progress': { label: '进行中', class: 'status-in-progress' },
          'completed': { label: '已完成', class: 'status-completed' },
          'delayed': { label: '延期中', class: 'status-delayed' },
          'on-hold': { label: '已暂停', class: 'status-on-hold' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    
    // 获取里程碑状态标签
    getMilestoneStatus() {
      return (status) => {
        const statusMap = {
          'completed': { label: '已完成', class: 'milestone-completed' },
          'in-progress': { label: '进行中', class: 'milestone-in-progress' },
          'not-started': { label: '未开始', class: 'milestone-not-started' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    
    // 获取增项状态标签
    getAdditionStatus() {
      return (status) => {
        const statusMap = {
          'pending': { label: '待确认', class: 'status-pending' },
          'approved': { label: '已确认', class: 'status-approved' },
          'rejected': { label: '已拒绝', class: 'status-rejected' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    
    // 获取报修状态标签
    getRepairStatus() {
      return (status) => {
        const statusMap = {
          'pending': { label: '待处理', class: 'status-pending' },
          'appointed': { label: '已预约', class: 'status-appointed' },
          'processing': { label: '处理中', class: 'status-processing' },
          'completed': { label: '已完成', class: 'status-completed' },
          'cancelled': { label: '已取消', class: 'status-cancelled' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    
    // 获取报价状态标签
    getQuoteStatus() {
      return (status) => {
        const statusMap = {
          'pending': { label: '待签收', class: 'status-pending' },
          'signed': { label: '已签收', class: 'status-signed' },
          'expired': { label: '已过期', class: 'status-expired' },
          'rejected': { label: '已拒绝', class: 'status-rejected' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    
    // 获取收款单状态标签
    getReceiptStatus() {
      return (status) => {
        const statusMap = {
          'pending': { label: '待签收', class: 'status-pending' },
          'signed': { label: '已签收', class: 'status-signed' },
          'paid': { label: '已支付', class: 'status-paid' },
          'overdue': { label: '已逾期', class: 'status-overdue' }
        };
        return statusMap[status] || { label: '未知', class: '' };
      };
    },
    filteredReceipts() {
      if (!this.receiptFilters.project && !this.receiptFilters.dateFrom && 
          !this.receiptFilters.dateTo && !this.receiptFilters.status) {
        return this.receipts;
      }

      return this.receipts.filter(receipt => {
        let match = true;
        
        if (this.receiptFilters.project && receipt.projectId !== this.receiptFilters.project) {
          match = false;
        }
        
        if (this.receiptFilters.status && receipt.status !== this.receiptFilters.status) {
          match = false;
        }
        
        if (this.receiptFilters.dateFrom) {
          const fromDate = new Date(this.receiptFilters.dateFrom);
          const invoiceDate = new Date(receipt.invoiceDate);
          if (invoiceDate < fromDate) {
            match = false;
          }
        }
        
        if (this.receiptFilters.dateTo) {
          const toDate = new Date(this.receiptFilters.dateTo);
          const invoiceDate = new Date(receipt.invoiceDate);
          if (invoiceDate > toDate) {
            match = false;
          }
        }
        
        return match;
      });
    }
  },
  created() {
    // 初始化数据
    this.calculateStatistics();
    
    // 设置活动模块（可以从路由参数获取）
    const module = this.$route?.query?.module;
    if (module && ['dashboard', 'projects', 'additionalItems', 'repairs', 'quotes', 'receipts'].includes(module)) {
      this.activeModule = module;
    }
    
    // 确保用户信息存在
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'true');
      
      // 创建默认测试用户
      const defaultUserInfo = {
        name: '测试用户',
        email: 'test@example.com',
        role: 'client',
        avatar: null
      };
      
      // 保存到localStorage
      localStorage.setItem('userInfo', JSON.stringify(defaultUserInfo));
    }
    
    // 尝试获取用户信息
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr) {
        this.userInfo = JSON.parse(userInfoStr);
      }
    } catch (e) {
      console.error('解析用户信息失败', e);
    }
  },
  methods: {
    // 通用方法
    setActiveModule(moduleName) {
      this.activeModule = moduleName;
    },
    formatDate(dateString) {
      if (!dateString) return '未设置';
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric', 
        month: '2-digit',
        day: '2-digit'
      });
    },
    formatNumber(value) {
      if (typeof value !== 'number') return '0.00';
      return value.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    
    // 仪表盘方法
    calculateStatistics() {
      // 简化版本 - 由于统计信息已经通过computed实现，此处仅做占位
      console.log('计算统计信息');
      // 不需要额外操作，防止白屏问题
    },
    
    // 项目方法
    viewProjectDetails(project) {
      console.log(`查看项目详情: ${project.id}`);
      // 实际项目中应该导航到项目详情页面
    },
    
    // 临时追加方法
    confirmAdditionalItem(item) {
      console.log(`确认临时追加: ${item.id}`);
      // 实际项目中应该发送请求到服务器确认追加
      item.status = 'confirmed';
    },
    declineAdditionalItem(item) {
      console.log(`拒绝临时追加: ${item.id}`);
      // 实际项目中应该发送请求到服务器拒绝追加
      item.status = 'declined';
    },
    
    // 维修服务方法
    createNewRepair() {
      console.log('创建新维修申请');
      // 实际项目中应该导航到维修申请表单页面
    },
    cancelRepair(repair) {
      console.log(`取消维修申请: ${repair.id}`);
      // 实际项目中应该发送请求到服务器取消维修
    },
    reviewRepair(repair) {
      console.log(`评价维修服务: ${repair.id}`);
      // 实际项目中应该打开评价表单
    },
    callTechnician(repair) {
      console.log(`联系技术人员: ${repair.technicianPhone}`);
      // 实际项目中可以直接调用电话
    },
    
    // 报价签收方法
    getQuoteStatus(status) {
      const statusMap = {
        'pending': { label: '待签收', class: 'status-pending' },
        'signed': { label: '已签收', class: 'status-signed' },
        'rejected': { label: '已拒绝', class: 'status-rejected' },
        'expired': { label: '已过期', class: 'status-expired' }
      };
      return statusMap[status] || { label: '未知状态', class: '' };
    },
    handleQuoteSign(quote, isAccepted) {
      console.log(`${isAccepted ? '签收' : '拒绝'}报价: ${quote.id}`);
      // 实际项目中应该发送请求到服务器更新报价状态
      quote.status = isAccepted ? 'signed' : 'rejected';
    },
    
    // 付款记录方法
    getPaymentStatus(status) {
      const statusMap = {
        'paid': { label: '已支付', class: 'status-paid' },
        'pending': { label: '待支付', class: 'status-pending' },
        'overdue': { label: '已逾期', class: 'status-overdue' }
      };
      return statusMap[status] || { label: '未知状态', class: '' };
    },
    applyReceiptFilters() {
      console.log('应用筛选条件');
      // 筛选逻辑已通过计算属性实现
    },
    resetReceiptFilters() {
      this.receiptFilters = {
        project: '',
        dateFrom: '',
        dateTo: '',
        status: ''
      };
    },
    downloadReceipt(receipt) {
      console.log(`下载收据: ${receipt.id}`);
      // 实际项目中应该生成并下载PDF
    },
    handlePayment(receipt) {
      console.log(`支付收据: ${receipt.id}`);
      // 实际项目中应该导航到支付页面
    },
    viewReceiptDetails(receipt) {
      console.log(`查看收据详情: ${receipt.id}`);
      // 实际项目中应该打开详情模态框
    },
    uploadPaymentProof(receipt) {
      console.log(`上传付款凭证 ${receipt.id}`);
      // 实际项目中应该打开文件选择器并上传文件
    },
    getRoleLabel() {
      const roleLabels = {
        'client': '客户',
        'staff': '工作人员',
        'admin': '管理员'
      };
      return roleLabels[this.userInfo.role] || '用户';
    },
    handleLogout() {
      // 移除登录状态和用户信息
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userInfo');
      
      // 跳转到登录页面
      window.location.href = '/client-login';
    }
  }
}
</script>

<style scoped>
/* 配色变量 */
:root {
  --primary: #2563eb;          /* 主色调：蓝色 */
  --primary-light: #dbeafe;    /* 主色浅色 */
  --primary-dark: #1e40af;     /* 主色深色 */
  
  --success: #10b981;          /* 成功色：绿色 */
  --success-light: #d1fae5;    /* 成功浅色 */
  
  --warning: #f59e0b;          /* 警告色：橙色 */
  --warning-light: #fef3c7;    /* 警告浅色 */
  
  --danger: #ef4444;           /* 危险色：红色 */
  --danger-light: #fee2e2;     /* 危险浅色 */
  
  --neutral: #6b7280;          /* 中性色：灰色 */
  --neutral-light: #f3f4f6;    /* 中性浅色 */
  --neutral-dark: #374151;     /* 中性深色 */
  
  --bg-light: #f9fafb;         /* 背景浅色 */
  --bg-white: #ffffff;         /* 背景白色 */
  
  --text-dark: #1f2937;        /* 文本深色 */
  --text-medium: #4b5563;      /* 文本中色 */
  --text-light: #9ca3af;       /* 文本浅色 */
  
  --border-color: #e5e7eb;     /* 边框颜色 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  --radius-sm: 4px;            /* 小圆角 */
  --radius-md: 8px;            /* 中圆角 */
  --radius-lg: 12px;           /* 大圆角 */
  
  --space-xs: 4px;             /* 超小间距 */
  --space-sm: 8px;             /* 小间距 */
  --space-md: 16px;            /* 中间距 */
  --space-lg: 24px;            /* 大间距 */
  --space-xl: 32px;            /* 超大间距 */
}

.client-service-container {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Header优化 */
.service-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #1e293b;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0;
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.5px;
}

.logo-tagline {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.welcome-message {
  display: flex;
  flex-direction: column;
  color: #e2e8f0;
  font-size: 14px;
  text-align: right;
}

.user-role {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid #475569;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar i {
  font-size: 18px;
  color: #e2e8f0;
}

.logout-btn {
  background-color: #475569;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #334155;
}

/* 内容区域优化 */
.service-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;
}

/* 顶部横向导航样式 */
.top-nav {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.nav-item {
  flex: 1;
  min-width: 140px;
  border-right: 1px solid #e2e8f0;
}

.nav-item:last-child {
  border-right: none;
}

.nav-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;
  text-align: center;
  height: 100%;
}

.nav-item a i {
  margin-bottom: 8px;
  font-size: 20px;
  color: #64748b;
  transition: all 0.2s;
}

.nav-item:hover a {
  background-color: #f1f5f9;
  color: #2563eb;
}

.nav-item:hover a i {
  color: #2563eb;
}

.nav-item.active a {
  color: #2563eb;
  background-color: #eff6ff;
  font-weight: 600;
}

.nav-item.active a::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background-color: #2563eb;
}

/* 主内容区优化 */
.main-content {
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  min-height: calc(100vh - 76px - 48px);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.module-container {
  padding-bottom: 24px;
}

.module-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.module-description {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

/* 改进仪表盘卡片布局 */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.dashboard-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

/* 彩色顶部条 */
.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: #eff6ff;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.card-icon i {
  font-size: 24px;
  color: #2563eb;
}

.dashboard-card:hover .card-icon {
  background-color: #2563eb;
}

.dashboard-card:hover .card-icon i {
  color: white;
}

.card-info {
  margin-bottom: 16px;
}

.card-info h3 {
  margin: 0 0 6px 0;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.card-value span {
  font-size: 14px;
  color: #64748b;
  font-weight: normal;
  margin-left: 4px;
}

.card-action {
  margin-top: auto;
  padding: 0;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
  transition: all 0.2s;
}

.card-action i {
  margin-left: 6px;
  font-size: 12px;
  transition: transform 0.2s;
}

.card-action:hover {
  color: #1d4ed8;
}

.card-action:hover i {
  transform: translateX(4px);
}

/* 项目卡片样式优化 */
.project-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.project-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8fafc;
}

.project-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
}

.project-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.status-in-progress {
  background-color: #eff6ff;
  color: #2563eb;
}

.status-completed {
  background-color: #d1fae5;
  color: #10b981;
}

.status-delayed {
  background-color: #fef3c7;
  color: #f59e0b;
}

.status-on-hold {
  background-color: #f1f5f9;
  color: #64748b;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-item i {
  margin-right: 8px;
  color: #64748b;
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.meta-label {
  color: #64748b;
  font-size: 13px;
  margin-right: 4px;
}

.meta-value {
  color: #1e293b;
  font-weight: 500;
  font-size: 13px;
}

.project-progress {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.progress-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.progress-percentage {
  font-size: 14px;
  color: #64748b;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #2563eb;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background-color: #10b981;
}

.progress-fill.delayed {
  background-color: #f59e0b;
}

.progress-fill.on-hold {
  background-color: #64748b;
}

.milestones-container, .project-updates {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}

.milestones-title, .updates-title {
  font-size: 16px;
  margin: 0 0 var(--space-md) 0;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  font-weight: 600;
}

.milestones-title i, .updates-title i {
  margin-right: var(--space-sm);
  color: var(--primary);
}

/* 临时增项卡片样式 */
.addition-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s;
}

.addition-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.addition-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8fafc;
}

.addition-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.addition-title i {
  margin-right: 8px;
  color: #f59e0b;
}

.addition-project {
  font-size: 14px;
  color: #64748b;
}

.addition-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.addition-content {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}

.addition-description {
  margin-bottom: var(--space-lg);
  color: var(--text-medium);
  line-height: 1.5;
}

.addition-budget {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background-color: var(--bg-light);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}

.budget-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.budget-label {
  font-size: 13px;
  color: var(--text-medium);
  font-weight: 500;
}

.budget-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
}

.budget-arrow {
  color: var(--text-light);
  font-size: 18px;
}

.budget-difference {
  margin-left: auto;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 16px;
  background-color: var(--neutral-light);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

.budget-increase {
  color: var(--danger);
}

.budget-decrease {
  color: var(--success);
}

.addition-date {
  display: flex;
  align-items: center;
  color: var(--text-medium);
  font-size: 14px;
  margin-top: var(--space-md);
}

.addition-date i {
  margin-right: var(--space-sm);
  color: var(--neutral);
}

.addition-actions {
  padding: var(--space-md) var(--space-lg);
  display: flex;
  gap: var(--space-md);
}

.approve-btn, .reject-btn {
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-lg);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-weight: 500;
}

.approve-btn {
  background-color: var(--success-light);
  color: var(--success);
}

.approve-btn:hover {
  background-color: var(--success);
  color: white;
}

.reject-btn {
  background-color: var(--danger-light);
  color: var(--danger);
}

.reject-btn:hover {
  background-color: var(--danger);
  color: white;
}

.approve-btn i, .reject-btn i {
  margin-right: var(--space-sm);
}

/* 报修卡片优化 */
.repair-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s;
}

.repair-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.repair-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8fafc;
}

.repair-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.repair-title i {
  margin-right: 8px;
  color: #2563eb;
}

.repair-id {
  font-size: 14px;
  color: #64748b;
  display: flex;
  align-items: center;
}

.repair-id i {
  margin-right: 6px;
  font-size: 12px;
}

.repair-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.repair-content {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.repair-description {
  margin-bottom: 16px;
  color: #334155;
  line-height: 1.6;
}

.repair-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 13px;
  color: #64748b;
}

.detail-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.repair-images {
  margin-top: 16px;
}

.images-title {
  font-size: 15px;
  margin: 0 0 12px 0;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.images-title i {
  margin-right: 8px;
  color: #64748b;
}

.image-thumbnails {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.image-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  color: #64748b;
}

.image-placeholder i {
  font-size: 24px;
  margin-bottom: 6px;
}

.image-placeholder span {
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.repair-technician {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.technician-title {
  font-size: 15px;
  margin: 0 0 12px 0;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.technician-title i {
  margin-right: 8px;
  color: #2563eb;
}

.technician-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.technician-name, .technician-phone, .technician-arrival {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #334155;
}

.technician-name i, .technician-phone i, .technician-arrival i {
  margin-right: 8px;
  color: #64748b;
  width: 16px;
  text-align: center;
}

.repair-actions {
  padding: 16px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 按钮样式优化 */
.action-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.contact-btn {
  background-color: #eff6ff;
  color: #2563eb;
}

.contact-btn:hover {
  background-color: #2563eb;
  color: white;
}

.cancel-btn {
  background-color: #fee2e2;
  color: #ef4444;
}

.cancel-btn:hover {
  background-color: #ef4444;
  color: white;
}

.complete-btn {
  background-color: #d1fae5;
  color: #10b981;
}

.complete-btn:hover {
  background-color: #10b981;
  color: white;
}

.feedback-btn {
  background-color: #f1f5f9;
  color: #334155;
}

.feedback-btn:hover {
  background-color: #64748b;
  color: white;
}

/* 统一状态标签样式 */
.status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.status i {
  margin-right: 4px;
  font-size: 10px;
}

.status-pending {
  background-color: #fef3c7;
  color: #f59e0b;
}

.status-in-progress, .status-appointed, .status-processing {
  background-color: #eff6ff;
  color: #2563eb;
}

.status-completed, .status-paid, .status-approved, .status-signed {
  background-color: #d1fae5;
  color: #10b981;
}

.status-cancelled, .status-rejected, .status-overdue {
  background-color: #fee2e2;
  color: #ef4444;
}

.status-expired, .status-on-hold {
  background-color: #f1f5f9;
  color: #64748b;
}

/* 报价详情部分样式 */
.quote-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s;
}

.quote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.quote-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8fafc;
}

.quote-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
}

.quote-project {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  display: flex;
  align-items: center;
}

.quote-project i {
  margin-right: 6px;
  color: #64748b;
}

.quote-content {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.quote-description {
  margin-bottom: 20px;
  color: #334155;
  line-height: 1.6;
}

.quote-date-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.date-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #334155;
}

.date-item i {
  margin-right: 8px;
  color: #64748b;
  width: 16px;
  text-align: center;
}

.date-label {
  color: #64748b;
  margin-right: 4px;
}

.date-value {
  color: #1e293b;
  font-weight: 500;
}

.date-expired {
  color: #ef4444;
}

.quote-details {
  margin-top: 24px;
}

.details-title {
  font-size: 16px;
  margin: 0 0 16px 0;
  color: #1e293b;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.details-title i {
  margin-right: 8px;
  color: #2563eb;
}

.quote-table {
  overflow-x: auto;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.quote-table table {
  width: 100%;
  border-collapse: collapse;
}

.quote-table th {
  background-color: #f8fafc;
  color: #334155;
  font-weight: 600;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
}

.quote-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 14px;
}

.quote-table tbody tr:hover {
  background-color: #f8fafc;
}

.quote-table tr:last-child td {
  border-bottom: none;
}

.quote-table tfoot td {
  background-color: #f8fafc;
  font-weight: 600;
  border-top: 2px solid #e2e8f0;
}

.total-label {
  text-align: right;
  color: #334155;
}

.total-value {
  font-weight: 700;
  color: #ef4444;
}

.quote-actions {
  padding: 16px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.sign-btn {
  background-color: #d1fae5;
  color: #10b981;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.sign-btn:hover {
  background-color: #10b981;
  color: white;
}

.discuss-btn {
  background-color: #eff6ff;
  color: #2563eb;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.discuss-btn:hover {
  background-color: #2563eb;
  color: white;
}

.quote-signed {
  padding: 16px 20px;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.signed-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #334155;
}

.signed-info i {
  font-size: 18px;
}

.signed-info i.fa-check-circle {
  color: #10b981;
}

.signed-info i.fa-times-circle {
  color: #ef4444;
}

/* 收据/付款记录样式优化 */
.receipts-filter {
  background-color: var(--bg-light);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: flex-end;
  border: 1px solid var(--border-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.filter-group label {
  font-size: 14px;
  color: var(--text-medium);
  font-weight: 500;
}

.filter-group select, .filter-group input, .date-input input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 14px;
  min-width: 120px;
  color: var(--text-dark);
  background-color: var(--bg-white);
}

.date-range {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.date-input {
  position: relative;
}

.date-input i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.date-input input {
  padding-left: 30px;
}

.filter-apply-btn, .filter-reset-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all 0.2s;
  font-weight: 500;
}

.filter-apply-btn {
  background-color: var(--primary);
  color: white;
}

.filter-apply-btn:hover {
  background-color: var(--primary-dark);
}

.filter-reset-btn {
  background-color: var(--neutral-light);
  color: var(--text-medium);
}

.filter-reset-btn:hover {
  background-color: var(--neutral);
  color: white;
}

.payment-overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.overview-card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  border: 1px solid var(--border-color);
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.overview-icon.success {
  background-color: var(--success-light);
  color: var(--success);
}

.overview-icon.warning {
  background-color: var(--warning-light);
  color: var(--warning);
}

.overview-icon.danger {
  background-color: var(--danger-light);
  color: var(--danger);
}

.overview-info h3 {
  margin: 0 0 var(--space-xs) 0;
  font-size: 16px;
  color: var(--text-medium);
  font-weight: 500;
}

.overview-amount {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.receipt-card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.receipt-card:hover {
  box-shadow: var(--shadow-md);
}

.receipt-header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--neutral-light);
}

.receipt-title {
  margin: 0 0 var(--space-xs) 0;
  font-size: 18px;
  color: var(--text-dark);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.receipt-title i {
  color: var(--primary);
}

.receipt-project {
  margin: 0;
  font-size: 14px;
  color: var(--text-medium);
  display: flex;
  align-items: center;
}

.receipt-project i {
  margin-right: var(--space-xs);
  color: var(--neutral);
}

.receipt-content {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}

.receipt-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.detail-label {
  font-size: 13px;
  color: var(--text-light);
}

.detail-value {
  font-size: 15px;
  color: var(--text-dark);
  font-weight: 500;
}

.detail-value.amount {
  font-weight: 700;
  color: var(--danger);
  font-size: 18px;
}

.receipt-description {
  background-color: var(--bg-light);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.receipt-description h4 {
  margin: 0 0 var(--space-sm) 0;
  font-size: 15px;
  color: var(--text-dark);
  font-weight: 600;
}

.receipt-description p {
  margin: 0;
  color: var(--text-medium);
  line-height: 1.5;
}

.receipt-actions {
  padding: var(--space-md) var(--space-lg);
  display: flex;
  gap: var(--space-md);
}

.download-btn, .details-btn {
  background-color: var(--neutral-light);
  color: var(--text-medium);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-lg);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-weight: 500;
}

.download-btn:hover, .details-btn:hover {
  background-color: var(--neutral);
  color: white;
}

.pay-btn {
  background-color: var(--success-light);
  color: var(--success);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-lg);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-weight: 500;
}

.pay-btn:hover {
  background-color: var(--success);
  color: white;
}

.download-btn i, .details-btn i, .pay-btn i {
  margin-right: var(--space-sm);
}

/* 状态样式统一 */
.status-pending {
  background-color: var(--warning-light);
  color: var(--warning);
}

.status-appointed, .status-processing {
  background-color: var(--primary-light);
  color: var(--primary);
}

.status-completed, .status-paid, .status-approved, .status-signed {
  background-color: var(--success-light);
  color: var(--success);
}

.status-cancelled, .status-rejected, .status-overdue {
  background-color: var(--danger-light);
  color: var(--danger);
}

.status-expired {
  background-color: var(--neutral-light);
  color: var(--neutral);
}

/* 响应式设计优化 */
@media (max-width: 992px) {
  .nav-item {
    min-width: 100px;
  }
  
  .nav-item a {
    padding: 12px 8px;
  }
  
  .nav-item a i {
    font-size: 18px;
    margin-bottom: 6px;
  }
  
  .dashboard-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  .project-meta, .repair-details, .technician-info, .quote-date-info {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .user-info {
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-list {
    flex-direction: column;
  }
  
  .nav-item {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .nav-item:last-child {
    border-bottom: none;
  }
  
  .nav-item a {
    flex-direction: row;
    justify-content: flex-start;
    padding: 14px 16px;
    text-align: left;
  }
  
  .nav-item a i {
    margin-bottom: 0;
    margin-right: 14px;
    width: 24px;
    height: 24px;
    font-size: 14px;
    border-radius: 6px;
  }
  
  .nav-item.active a::before {
    height: auto;
    width: 4px;
    left: 0;
    top: 0;
    bottom: 0;
    right: auto;
  }
  
  .nav-item a:hover {
    transform: none;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card, .addition-card, .repair-card, .quote-card {
    margin-bottom: 16px;
  }
  
  .project-header, .addition-header, .repair-header, .quote-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .project-status, .addition-status, .repair-status, .quote-status {
    align-self: flex-start;
  }
}

@media (max-width: 576px) {
  .module-title {
    font-size: 18px;
  }
  
  .module-container {
    padding: 16px;
  }
  
  .project-meta, .repair-details, .technician-info {
    grid-template-columns: 1fr;
  }
  
  .repair-actions, .quote-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn, .sign-btn, .discuss-btn {
    width: 100%;
    justify-content: center;
  }
  
  .image-thumbnails {
    justify-content: center;
  }
}

.nav-item.active a i {
  color: #2563eb;
}

/* 添加图标统一样式 */
.nav-item a i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #f1f5f9;
  margin-bottom: 10px;
  transition: all 0.2s;
}

.nav-item:hover a i {
  background-color: #dbeafe;
}

.nav-item.active a i {
  background-color: #2563eb;
  color: white;
}

/* 添加标签文字样式 */
.nav-item a span {
  font-size: 14px;
  font-weight: 500;
}

.nav-item.active a span {
  font-weight: 600;
}

/* 添加动画效果 */
.nav-item a {
  transition: all 0.3s ease;
}

.nav-item a:hover {
  transform: translateY(-2px);
}
</style> 