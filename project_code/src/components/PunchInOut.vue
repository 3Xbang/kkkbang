<template>
  <div class="punch-card">
    <div class="punch-status-container">
      <div class="punch-status-header">
        <h2>工作打卡</h2>
        <div class="current-date">{{ currentDate }}</div>
      </div>
      
      <!-- 打卡状态区域 -->
      <div class="punch-status" :class="{'punched-in': isPunchedIn}">
        <div class="status-icon">
          <i class="fas" :class="isPunchedIn ? 'fa-user-clock' : 'fa-user'"></i>
        </div>
        <div class="status-info">
          <div class="status-label">{{ isPunchedIn ? '已上班' : '未上班' }}</div>
          <div v-if="isPunchedIn" class="punch-time">
            上班时间: {{ punchInTime }}
          </div>
          <div v-if="isPunchedOut" class="punch-time out">
            下班时间: {{ punchOutTime }}
          </div>
        </div>
        
        <!-- 工作时间倒计时 -->
        <div v-if="isPunchedIn && !isPunchedOut" class="countdown-container">
          <div class="countdown-label">今日工作时间剩余</div>
          <div class="countdown-timer">{{ formatCountdown(countdown) }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>
      
      <!-- 打卡按钮 -->
      <div class="punch-actions">
        <button 
          class="punch-button punch-in" 
          @click="showPunchInModal = true"
          :disabled="isPunchedIn || isPunchedOut">
          <i class="fas fa-sign-in-alt"></i> 上班打卡
        </button>
        <button 
          class="punch-button punch-out" 
          @click="showPunchOutModal = true"
          :disabled="!isPunchedIn || isPunchedOut || countdown > 0">
          <i class="fas fa-sign-out-alt"></i> 下班打卡
        </button>
      </div>
    </div>
    
    <!-- 打卡记录 -->
    <div v-if="punchRecords.length > 0" class="punch-records">
      <h3>近期打卡记录</h3>
      <div class="records-list">
        <div class="record-item" v-for="(record, index) in punchRecords" :key="index">
          <div class="record-date">{{ record.date }}</div>
          <div class="record-time">
            <div class="time-in">
              <i class="fas fa-sign-in-alt"></i> {{ record.inTime }}
            </div>
            <div class="time-out">
              <i class="fas fa-sign-out-alt"></i> {{ record.outTime || '未打卡' }}
            </div>
          </div>
          <div class="record-materials">
            <div class="material-item">
              <span class="material-label">负责材料:</span>
              <span class="material-value">{{ record.materialAmount || 0 }} 件</span>
            </div>
            <div class="material-item" v-if="record.usedMaterialAmount">
              <span class="material-label">使用材料:</span>
              <span class="material-value">{{ record.usedMaterialAmount }} 件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 上班打卡弹窗 -->
    <div class="modal" v-if="showPunchInModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>上班打卡</h3>
          <button class="close-btn" @click="showPunchInModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- 照片上传 -->
          <div class="form-group">
            <label>上传项目现场照片 <span class="required">*</span></label>
            <div class="photo-upload-area" @click="triggerFileInput('punchInPhoto')" v-if="!punchInPhoto">
              <i class="fas fa-camera"></i>
              <div class="upload-text">点击上传照片</div>
              <div class="upload-note">作为项目进度依据</div>
            </div>
            <div class="photo-preview" v-else>
              <img :src="punchInPhoto" class="preview-image" />
              <button class="remove-photo" @click="removePhoto('punchInPhoto')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <input 
              type="file" 
              ref="punchInPhotoInput"
              class="hidden-file-input"
              accept="image/*"
              @change="handlePhotoUpload('punchInPhoto')"
            />
          </div>
          
          <!-- 材料数量 -->
          <div class="form-group">
            <label>负责材料数量 <span class="required">*</span></label>
            <input 
              type="number" 
              v-model="materialAmount" 
              min="0" 
              placeholder="请填写您今日负责的材料数量"
              class="form-input"
            />
          </div>
          
          <!-- 项目选择 -->
          <div class="form-group">
            <label>选择项目 <span class="required">*</span></label>
            <select v-model="selectedProject" class="form-input">
              <option value="">请选择项目</option>
              <option v-for="project in projectList" :key="project.id" :value="project.id">
                {{ project.name }}
              </option>
            </select>
          </div>
          
          <!-- 备注 -->
          <div class="form-group">
            <label>备注</label>
            <textarea
              v-model="punchInRemark"
              placeholder="可以在这里填写今日工作计划..."
              class="form-input textarea"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            class="submit-btn" 
            @click="handlePunchIn"
            :disabled="!punchInPhoto || !materialAmount || !selectedProject">
            确认打卡
          </button>
        </div>
      </div>
    </div>
    
    <!-- 下班打卡弹窗 -->
    <div class="modal" v-if="showPunchOutModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>下班打卡</h3>
          <button class="close-btn" @click="showPunchOutModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- 照片上传 -->
          <div class="form-group">
            <label>上传项目现场照片 <span class="required">*</span></label>
            <div class="photo-upload-area" @click="triggerFileInput('punchOutPhoto')" v-if="!punchOutPhoto">
              <i class="fas fa-camera"></i>
              <div class="upload-text">点击上传照片</div>
              <div class="upload-note">作为项目进度依据</div>
            </div>
            <div class="photo-preview" v-else>
              <img :src="punchOutPhoto" class="preview-image" />
              <button class="remove-photo" @click="removePhoto('punchOutPhoto')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <input 
              type="file" 
              ref="punchOutPhotoInput"
              class="hidden-file-input"
              accept="image/*"
              @change="handlePhotoUpload('punchOutPhoto')"
            />
          </div>
          
          <!-- 材料使用数量 (仅项目负责人) -->
          <div class="form-group" v-if="isProjectManager">
            <label>项目材料使用数量 <span class="required">*</span></label>
            <input 
              type="number" 
              v-model="usedMaterialAmount" 
              min="0" 
              max="materialAmount"
              placeholder="请填写今日使用的材料数量"
              class="form-input"
            />
            <div class="form-note">
              <i class="fas fa-info-circle"></i> 
              您今日负责材料: {{ materialAmount }} 件
            </div>
          </div>
          
          <!-- 工作成果 -->
          <div class="form-group">
            <label>今日工作成果 <span class="required">*</span></label>
            <textarea
              v-model="workResult"
              placeholder="请简要描述今日工作成果..."
              class="form-input textarea"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            class="submit-btn" 
            @click="handlePunchOut"
            :disabled="!punchOutPhoto || (isProjectManager && !usedMaterialAmount) || !workResult">
            确认打卡
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PunchInOut',
  data() {
    return {
      // 当前日期
      currentDate: new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      
      // 打卡状态
      isPunchedIn: false,
      isPunchedOut: false,
      punchInTime: '',
      punchOutTime: '',
      
      // 倒计时 (秒)
      // 10小时 = 36000秒
      countdown: 36000,
      countdownInterval: null,
      workHours: 10,
      
      // 模态框显示状态
      showPunchInModal: false,
      showPunchOutModal: false,
      
      // 照片数据
      punchInPhoto: null,
      punchOutPhoto: null,
      
      // 打卡数据
      materialAmount: '',
      usedMaterialAmount: '',
      selectedProject: '',
      punchInRemark: '',
      workResult: '',
      
      // 用户角色
      isProjectManager: false,
      
      // 项目列表
      projectList: [
        { id: 'p1', name: '国贸商场改造项目' },
        { id: 'p2', name: '望京SOHO办公室装修' },
        { id: 'p3', name: '朝阳公园景观改造' }
      ],
      
      // 打卡记录
      punchRecords: []
    }
  },
  computed: {
    // 进度条百分比
    progressPercentage() {
      const totalSeconds = this.workHours * 60 * 60;
      const elapsedSeconds = totalSeconds - this.countdown;
      return Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100));
    }
  },
  created() {
    // 从localStorage加载打卡数据
    this.loadPunchStatus();
    this.loadPunchRecords();
    
    // 假设通过API获取用户角色信息
    // 模拟项目负责人角色
    this.isProjectManager = localStorage.getItem('userRole') === 'admin' || Math.random() > 0.5;
  },
  beforeUnmount() {
    // 清除倒计时
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    // 格式化倒计时
    formatCountdown(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    
    // 触发文件上传
    triggerFileInput(type) {
      if (type === 'punchInPhoto') {
        this.$refs.punchInPhotoInput.click();
      } else {
        this.$refs.punchOutPhotoInput.click();
      }
    },
    
    // 处理照片上传
    handlePhotoUpload(type) {
      const fileInput = type === 'punchInPhoto' 
        ? this.$refs.punchInPhotoInput 
        : this.$refs.punchOutPhotoInput;
      
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          if (type === 'punchInPhoto') {
            this.punchInPhoto = e.target.result;
          } else {
            this.punchOutPhoto = e.target.result;
          }
        };
        
        reader.readAsDataURL(file);
      }
    },
    
    // 移除照片
    removePhoto(type) {
      if (type === 'punchInPhoto') {
        this.punchInPhoto = null;
        this.$refs.punchInPhotoInput.value = '';
      } else {
        this.punchOutPhoto = null;
        this.$refs.punchOutPhotoInput.value = '';
      }
    },
    
    // 上班打卡
    handlePunchIn() {
      if (!this.punchInPhoto || !this.materialAmount || !this.selectedProject) {
        alert('请填写必要信息并上传照片');
        return;
      }
      
      // 设置打卡时间
      const now = new Date();
      this.punchInTime = now.toLocaleTimeString('zh-CN');
      this.isPunchedIn = true;
      
      // 开始倒计时
      this.startCountdown();
      
      // 保存到本地存储
      this.savePunchStatus();
      
      // 关闭模态框
      this.showPunchInModal = false;
      
      // 提示
      this.$emit('punch-status-changed', {
        type: 'in',
        time: this.punchInTime
      });
    },
    
    // 下班打卡
    handlePunchOut() {
      if (!this.punchOutPhoto || (this.isProjectManager && !this.usedMaterialAmount) || !this.workResult) {
        alert('请填写必要信息并上传照片');
        return;
      }
      
      // 设置打卡时间
      const now = new Date();
      this.punchOutTime = now.toLocaleTimeString('zh-CN');
      this.isPunchedOut = true;
      
      // 停止倒计时
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
      
      // 添加到打卡记录
      this.addPunchRecord();
      
      // 保存到本地存储
      this.savePunchStatus();
      
      // 关闭模态框
      this.showPunchOutModal = false;
      
      // 提示
      this.$emit('punch-status-changed', {
        type: 'out',
        time: this.punchOutTime
      });
    },
    
    // 开始倒计时
    startCountdown() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      
      this.countdown = this.workHours * 60 * 60; // 转换为秒
      
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          this.savePunchStatus();
        } else {
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        }
      }, 1000);
    },
    
    // 添加打卡记录
    addPunchRecord() {
      const today = new Date().toLocaleDateString('zh-CN');
      
      // 创建记录对象
      const record = {
        date: today,
        inTime: this.punchInTime,
        outTime: this.punchOutTime,
        materialAmount: this.materialAmount,
        usedMaterialAmount: this.usedMaterialAmount,
        projectId: this.selectedProject,
        projectName: this.projectList.find(p => p.id === this.selectedProject)?.name || '',
        punchInRemark: this.punchInRemark,
        workResult: this.workResult
      };
      
      // 添加到记录列表前面
      this.punchRecords.unshift(record);
      
      // 只保留最近10条记录
      if (this.punchRecords.length > 10) {
        this.punchRecords = this.punchRecords.slice(0, 10);
      }
      
      // 保存记录到本地存储
      this.savePunchRecords();
    },
    
    // 保存打卡状态到本地存储
    savePunchStatus() {
      const status = {
        isPunchedIn: this.isPunchedIn,
        isPunchedOut: this.isPunchedOut,
        punchInTime: this.punchInTime,
        punchOutTime: this.punchOutTime,
        countdown: this.countdown,
        materialAmount: this.materialAmount,
        selectedProject: this.selectedProject,
        date: new Date().toLocaleDateString('zh-CN')
      };
      
      localStorage.setItem('punchStatus', JSON.stringify(status));
    },
    
    // 从本地存储加载打卡状态
    loadPunchStatus() {
      const storedStatus = localStorage.getItem('punchStatus');
      if (storedStatus) {
        const status = JSON.parse(storedStatus);
        const today = new Date().toLocaleDateString('zh-CN');
        
        // 只在同一天加载状态
        if (status.date === today) {
          this.isPunchedIn = status.isPunchedIn;
          this.isPunchedOut = status.isPunchedOut;
          this.punchInTime = status.punchInTime;
          this.punchOutTime = status.punchOutTime;
          this.materialAmount = status.materialAmount;
          this.selectedProject = status.selectedProject;
          
          // 如果已经打卡但没有下班，恢复倒计时
          if (this.isPunchedIn && !this.isPunchedOut) {
            this.countdown = status.countdown;
            this.startCountdown();
          }
        } else {
          // 如果不是同一天，清除状态
          localStorage.removeItem('punchStatus');
        }
      }
    },
    
    // 保存打卡记录到本地存储
    savePunchRecords() {
      localStorage.setItem('punchRecords', JSON.stringify(this.punchRecords));
    },
    
    // 从本地存储加载打卡记录
    loadPunchRecords() {
      const storedRecords = localStorage.getItem('punchRecords');
      if (storedRecords) {
        this.punchRecords = JSON.parse(storedRecords);
      }
    }
  }
}
</script>

<style scoped>
.punch-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  overflow: hidden;
}

.punch-status-container {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.punch-status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.punch-status-header h2 {
  font-size: 1.5rem;
  color: #0f2851;
  margin: 0;
}

.current-date {
  color: #6b7280;
  font-size: 0.9rem;
}

.punch-status {
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #d1d5db;
}

.punch-status.punched-in {
  border-left-color: #3498db;
  background-color: rgba(52, 152, 219, 0.05);
}

.status-icon {
  width: 48px;
  height: 48px;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 20px;
  margin-right: 1rem;
}

.punched-in .status-icon {
  background-color: #3498db;
  color: white;
}

.status-info {
  flex: 1;
}

.status-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.punched-in .status-label {
  color: #3498db;
}

.punch-time {
  font-size: 0.9rem;
  color: #6b7280;
}

.punch-time.out {
  color: #10b981;
}

.countdown-container {
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  margin-left: auto;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.countdown-label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.countdown-timer {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f2851;
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3498db;
  border-radius: 3px;
  transition: width 1s linear;
}

.punch-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.punch-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.punch-button i {
  margin-right: 0.5rem;
}

.punch-button.punch-in {
  background-color: #3498db;
  color: white;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.punch-button.punch-out {
  background-color: #e5e7eb;
  color: #374151;
}

.punch-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.punch-button.punch-in:hover:not(:disabled) {
  background-color: #2980b9;
  box-shadow: 0 6px 8px rgba(52, 152, 219, 0.3);
}

.punch-button.punch-out:hover:not(:disabled) {
  background-color: #d1d5db;
}

.punch-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.punch-records {
  padding: 1.5rem;
}

.punch-records h3 {
  font-size: 1.1rem;
  color: #374151;
  margin-top: 0;
  margin-bottom: 1rem;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.record-date {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
}

.record-time {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.time-in, .time-out {
  font-size: 0.9rem;
  color: #6b7280;
}

.time-in i {
  color: #3498db;
}

.time-out i {
  color: #10b981;
}

.record-materials {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: right;
  min-width: 150px;
}

.material-item {
  font-size: 0.85rem;
  color: #6b7280;
}

.material-label {
  margin-right: 0.5rem;
}

.material-value {
  font-weight: 600;
  color: #374151;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #0f2851;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4b5563;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #1f2937;
  background-color: white;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.form-note {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.form-note i {
  margin-right: 0.25rem;
  color: #3498db;
}

.photo-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 6px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  background-color: #f9fafb;
}

.photo-upload-area:hover {
  border-color: #3498db;
  background-color: rgba(52, 152, 219, 0.03);
}

.photo-upload-area i {
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 0.75rem;
}

.upload-text {
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.upload-note {
  font-size: 0.85rem;
  color: #6b7280;
}

.photo-preview {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.preview-image {
  width: 100%;
  display: block;
}

.remove-photo {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(239, 68, 68, 0.9);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hidden-file-input {
  display: none;
}

.submit-btn {
  padding: 0.75rem 2rem;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .punch-status {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .status-icon {
    margin-bottom: 1rem;
  }
  
  .countdown-container {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
  }
  
  .record-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .record-time, .record-materials {
    width: 100%;
  }
  
  .record-materials {
    text-align: left;
  }
}
</style> 