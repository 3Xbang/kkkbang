import { ref, reactive, onMounted } from 'vue';
import apiMapper from './autoApiMapper';

/**
 * 资源组件工厂
 * 创建通用的资源管理组件状态和方法
 * @param {string} resourceType - 资源类型
 * @param {Object} options - 配置选项
 * @returns {Object} 组件状态和方法
 */
export function useResourceManager(resourceType, options = {}) {
  // 默认配置
  const defaultOptions = {
    pagination: true,
    defaultLimit: 10,
    searchable: false,
    sortable: false,
    confirmDelete: true
  };
  
  // 合并选项
  const config = { ...defaultOptions, ...options };
  
  // 状态
  const items = ref([]);
  const selectedItem = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const pagination = reactive({
    page: 1,
    limit: config.defaultLimit,
    total: 0,
    pages: 0
  });
  const searchQuery = ref('');
  const sortBy = ref('');
  const sortOrder = ref('asc');
  
  // 获取资源列表
  async function fetchItems() {
    loading.value = true;
    error.value = null;
    
    try {
      // 构建查询参数
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (config.searchable && searchQuery.value) {
        params.keyword = searchQuery.value;
      }
      
      if (config.sortable && sortBy.value) {
        params.sort_by = sortBy.value;
        params.sort_order = sortOrder.value;
      }
      
      // 调用API获取数据
      const response = await apiMapper.getList(resourceType, params);
      
      // 解析响应
      if (response.status === 'success') {
        items.value = response.data || [];
        
        if (response.pagination) {
          pagination.total = response.pagination.total;
          pagination.pages = response.pagination.pages;
        }
      } else {
        throw new Error(response.error?.message || `获取${resourceType}列表失败`);
      }
    } catch (err) {
      console.error(`获取${resourceType}列表失败:`, err);
      error.value = err.message || `获取${resourceType}列表失败，请稍后重试`;
    } finally {
      loading.value = false;
    }
  }
  
  // 获取单个资源详情
  async function fetchItemDetail(id) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiMapper.getDetail(resourceType, id);
      
      if (response.status === 'success') {
        selectedItem.value = response.data;
      } else {
        throw new Error(response.error?.message || `获取${resourceType}详情失败`);
      }
    } catch (err) {
      console.error(`获取${resourceType}详情失败:`, err);
      error.value = err.message || `获取${resourceType}详情失败，请稍后重试`;
    } finally {
      loading.value = false;
    }
  }
  
  // 创建资源
  async function createItem(data) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiMapper.create(resourceType, data);
      
      if (response.status === 'success') {
        // 刷新列表
        await fetchItems();
        return response.data;
      } else {
        throw new Error(response.error?.message || `创建${resourceType}失败`);
      }
    } catch (err) {
      console.error(`创建${resourceType}失败:`, err);
      error.value = err.message || `创建${resourceType}失败，请稍后重试`;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  // 更新资源
  async function updateItem(id, data) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiMapper.update(resourceType, id, data);
      
      if (response.status === 'success') {
        // 如果当前正在查看的就是这个资源，更新它
        if (selectedItem.value && selectedItem.value.id === id) {
          selectedItem.value = response.data;
        }
        
        // 刷新列表
        await fetchItems();
        return response.data;
      } else {
        throw new Error(response.error?.message || `更新${resourceType}失败`);
      }
    } catch (err) {
      console.error(`更新${resourceType}失败:`, err);
      error.value = err.message || `更新${resourceType}失败，请稍后重试`;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  // 删除资源
  async function deleteItem(id) {
    // 确认删除
    if (config.confirmDelete && !confirm(`确定要删除此${resourceType}吗？`)) {
      return;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiMapper.delete(resourceType, id);
      
      if (response.status === 'success') {
        // 如果当前正在查看的就是这个资源，清除它
        if (selectedItem.value && selectedItem.value.id === id) {
          selectedItem.value = null;
        }
        
        // 刷新列表
        await fetchItems();
        return true;
      } else {
        throw new Error(response.error?.message || `删除${resourceType}失败`);
      }
    } catch (err) {
      console.error(`删除${resourceType}失败:`, err);
      error.value = err.message || `删除${resourceType}失败，请稍后重试`;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  // 自定义操作
  async function customOperation(operation, ...args) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiMapper.custom(resourceType, operation, ...args);
      
      if (response.status === 'success') {
        return response.data;
      } else {
        throw new Error(response.error?.message || `操作${operation}失败`);
      }
    } catch (err) {
      console.error(`操作${operation}失败:`, err);
      error.value = err.message || `操作${operation}失败，请稍后重试`;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  // 分页方法
  function prevPage() {
    if (pagination.page > 1) {
      pagination.page--;
      fetchItems();
    }
  }
  
  function nextPage() {
    if (pagination.page < pagination.pages) {
      pagination.page++;
      fetchItems();
    }
  }
  
  function goToPage(page) {
    if (page >= 1 && page <= pagination.pages) {
      pagination.page = page;
      fetchItems();
    }
  }
  
  // 搜索方法
  function search() {
    pagination.page = 1; // 重置到第一页
    fetchItems();
  }
  
  // 排序方法
  function sort(field) {
    if (sortBy.value === field) {
      // 切换排序顺序
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      // 设置新的排序字段
      sortBy.value = field;
      sortOrder.value = 'asc';
    }
    fetchItems();
  }
  
  // 组件挂载时获取数据
  onMounted(() => {
    fetchItems();
  });
  
  // 返回所有状态和方法
  return {
    // 状态
    items,
    selectedItem,
    loading,
    error,
    pagination,
    searchQuery,
    sortBy,
    sortOrder,
    
    // 方法
    fetchItems,
    fetchItemDetail,
    createItem,
    updateItem,
    deleteItem,
    customOperation,
    prevPage,
    nextPage,
    goToPage,
    search,
    sort
  };
}

export default useResourceManager; 