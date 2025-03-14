<template>
  <div class="permissions-container">
    <h1>权限管理</h1>
    
    <!-- 创建权限表单 -->
    <div class="form-container">
      <h2>创建新权限</h2>
      <form @submit.prevent="handleCreatePermission" class="permission-form">
        <div class="form-group">
          <label for="name">名称:</label>
          <input type="text" id="name" v-model="newPermission.name" required />
        </div>
        <div class="form-group">
          <label for="description">描述:</label>
          <textarea id="description" v-model="newPermission.description"></textarea>
        </div>
        <button type="submit" class="submit-btn">创建权限</button>
      </form>
    </div>
    
    <!-- 权限列表 -->
    <div class="list-container">
      <h2>权限列表</h2>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <table v-else class="permissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <button @click="deleteItem(item.id)" class="delete-btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分页控件 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="pagination.page === 1" class="page-btn">上一页</button>
        <span>第 {{ pagination.page }} 页 / 共 {{ pagination.pages || 1 }} 页</span>
        <button @click="nextPage" :disabled="pagination.page >= pagination.pages" class="page-btn">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useResourceManager from '../utils/resourceComponentFactory';

export default {
  name: 'PermissionsViewComposable',
  setup() {
    // 使用资源管理器
    const {
      items,
      loading,
      error,
      pagination,
      createItem,
      deleteItem,
      prevPage,
      nextPage
    } = useResourceManager('permission', {
      confirmDelete: true
    });
    
    // 创建权限表单数据
    const newPermission = ref({
      name: '',
      description: ''
    });
    
    // 创建权限处理函数
    async function handleCreatePermission() {
      try {
        await createItem(newPermission.value);
        newPermission.value = { name: '', description: '' };
        alert('权限创建成功');
      } catch (error) {
        alert(error.message || '创建权限失败，请稍后重试');
      }
    }
    
    return {
      // 从资源管理器获取的状态和方法
      items,
      loading,
      error,
      pagination,
      deleteItem,
      prevPage,
      nextPage,
      
      // 本地状态和方法
      newPermission,
      handleCreatePermission
    };
  }
};
</script>

<style scoped>
.permissions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

h2 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.form-container, .list-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.permission-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input, textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
}

.submit-btn, .page-btn, .delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  align-self: flex-start;
}

.submit-btn:hover {
  background-color: #45a049;
}

.permissions-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.page-btn {
  background-color: #2196F3;
  color: white;
}

.page-btn:hover:not(:disabled) {
  background-color: #0b7dda;
}

.page-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #f44336;
}
</style> 