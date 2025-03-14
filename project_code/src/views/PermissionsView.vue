<template>
  <div class="permissions-container">
    <h1>权限管理</h1>
    
    <!-- 创建权限表单 -->
    <div class="form-container">
      <h2>创建新权限</h2>
      <form @submit.prevent="createPermission" class="permission-form">
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
          <tr v-for="permission in permissions" :key="permission.id">
            <td>{{ permission.id }}</td>
            <td>{{ permission.name }}</td>
            <td>{{ permission.description }}</td>
            <td>
              <button @click="deletePermission(permission.id)" class="delete-btn">删除</button>
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
// 导入API服务
import { permissionApi } from '../services/apiServices';

export default {
  name: 'PermissionsView',
  data() {
    return {
      permissions: [],
      newPermission: {
        name: '',
        description: ''
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      },
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchPermissions();
  },
  methods: {
    async fetchPermissions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await permissionApi.getPermissions({
          page: this.pagination.page,
          limit: this.pagination.limit
        });
        
        // 根据API响应格式解析数据
        if (response.status === 'success') {
          this.permissions = response.data || [];
          if (response.pagination) {
            this.pagination = {
              ...this.pagination,
              ...response.pagination
            };
          }
        } else {
          throw new Error('获取权限失败');
        }
      } catch (error) {
        console.error('获取权限列表失败:', error);
        this.error = error.message || '获取权限列表失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    },
    
    async createPermission() {
      try {
        const response = await permissionApi.createPermission(this.newPermission);
        if (response.status === 'success') {
          this.newPermission = { name: '', description: '' };
          this.fetchPermissions(); // 刷新列表
          alert('权限创建成功');
        } else {
          throw new Error(response.error?.message || '创建权限失败');
        }
      } catch (error) {
        console.error('创建权限失败:', error);
        alert(error.message || '创建权限失败，请稍后重试');
      }
    },
    
    async deletePermission(id) {
      if (confirm('确定要删除此权限吗？')) {
        try {
          // 这里调用API删除权限
          // 注意：在前面的API服务中我们没有实现这个方法，这里假设它已经实现
          const response = await permissionApi.deletePermission(id);
          if (response.status === 'success') {
            this.fetchPermissions(); // 刷新列表
            alert('权限删除成功');
          } else {
            throw new Error(response.error?.message || '删除权限失败');
          }
        } catch (error) {
          console.error('删除权限失败:', error);
          alert(error.message || '删除权限失败，请稍后重试');
        }
      }
    },
    
    prevPage() {
      if (this.pagination.page > 1) {
        this.pagination.page--;
        this.fetchPermissions();
      }
    },
    
    nextPage() {
      if (this.pagination.page < this.pagination.pages) {
        this.pagination.page++;
        this.fetchPermissions();
      }
    }
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