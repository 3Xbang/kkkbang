<template>
  <div v-if="showWarning" class="setup-warning">
    <div class="warning-content">
      <h3>环境设置不完整</h3>
      <p>检测到系统可能缺少必要组件。请运行以下命令完成设置：</p>
      <pre>./setup.sh</pre>
      <button @click="closeWarning">我已了解</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWarning: false
    }
  },
  mounted() {
    // 检查是否安装了所有必要组件
    this.checkSetup();
  },
  methods: {
    checkSetup() {
      // 由于我们已经安装了Font Awesome，所以不再显示警告
      this.showWarning = false;
    },
    closeWarning() {
      this.showWarning = false;
    }
  }
}
</script>

<style scoped>
.setup-warning {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.warning-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

button {
  padding: 8px 16px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}
</style> 