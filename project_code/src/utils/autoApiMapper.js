import apiServices from '../services/apiServices';

/**
 * 自动API映射工具
 * 根据提供的资源类型和操作类型自动调用相应的API
 */
export const apiMapper = {
  /**
   * 获取资源列表
   * @param {string} resourceType - 资源类型 (permission, document, project等)
   * @param {Object} params - 查询参数
   * @returns {Promise} API响应Promise
   */
  getList(resourceType, params = {}) {
    // 根据资源类型选择API服务和方法
    const apiMap = {
      permission: apiServices.permission.getPermissions,
      document: apiServices.document.getDocuments,
      project: apiServices.project.getProjects,
      budget: apiServices.finance.getBudgets,
      cost: apiServices.finance.getCosts,
      payment: apiServices.finance.getPayments,
      invoice: apiServices.finance.getInvoices,
      supplier: apiServices.supplier.getSuppliers,
      equipment: apiServices.equipment.getEquipment,
      attendance: apiServices.attendance.getAttendances,
      material: apiServices.material.getMaterials
    };
    
    const apiMethod = apiMap[resourceType];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    return apiMethod(params);
  },
  
  /**
   * 获取单个资源详情
   * @param {string} resourceType - 资源类型
   * @param {string|number} id - 资源ID
   * @returns {Promise} API响应Promise
   */
  getDetail(resourceType, id) {
    const apiMap = {
      document: apiServices.document.getDocument,
      project: apiServices.project.getProject,
      budget: apiServices.finance.getBudget,
      cost: apiServices.finance.getCost,
      payment: apiServices.finance.getPayment,
      invoice: apiServices.finance.getInvoice,
      supplier: apiServices.supplier.getSupplier,
      equipment: apiServices.equipment.getEquipmentDetail,
      attendance: apiServices.attendance.getAttendance,
      material: apiServices.material.getMaterial
    };
    
    const apiMethod = apiMap[resourceType];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    return apiMethod(id);
  },
  
  /**
   * 创建资源
   * @param {string} resourceType - 资源类型
   * @param {Object} data - 资源数据
   * @returns {Promise} API响应Promise
   */
  create(resourceType, data) {
    const apiMap = {
      permission: apiServices.permission.createPermission,
      document: apiServices.document.createDocument,
      project: apiServices.project.createProject,
      budget: apiServices.finance.createBudget,
      cost: apiServices.finance.createCost,
      payment: apiServices.finance.createPayment,
      invoice: apiServices.finance.createInvoice,
      supplier: apiServices.supplier.createSupplier,
      equipment: apiServices.equipment.createEquipment,
      material: apiServices.material.createMaterial
    };
    
    const apiMethod = apiMap[resourceType];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    return apiMethod(data);
  },
  
  /**
   * 更新资源
   * @param {string} resourceType - 资源类型
   * @param {string|number} id - 资源ID
   * @param {Object} data - 更新数据
   * @returns {Promise} API响应Promise
   */
  update(resourceType, id, data) {
    const apiMap = {
      document: apiServices.document.updateDocument,
      project: apiServices.project.updateProject,
      budget: apiServices.finance.updateBudget,
      cost: apiServices.finance.updateCost,
      supplier: apiServices.supplier.updateSupplier,
      equipment: apiServices.equipment.updateEquipment,
      material: apiServices.material.updateMaterial
    };
    
    const apiMethod = apiMap[resourceType];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    return apiMethod(id, data);
  },
  
  /**
   * 删除资源
   * @param {string} resourceType - 资源类型
   * @param {string|number} id - 资源ID
   * @returns {Promise} API响应Promise
   */
  delete(resourceType, id) {
    const apiMap = {
      document: apiServices.document.deleteDocument,
      project: apiServices.project.deleteProject,
      cost: apiServices.finance.deleteCost
    };
    
    const apiMethod = apiMap[resourceType];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    return apiMethod(id);
  },
  
  /**
   * 执行自定义操作
   * @param {string} resourceType - 资源类型
   * @param {string} operation - 操作名称
   * @param {Array} args - 操作参数
   * @returns {Promise} API响应Promise
   */
  custom(resourceType, operation, ...args) {
    // 尝试从API服务中找到对应的方法
    const apiService = apiServices[resourceType];
    if (!apiService) {
      return Promise.reject(new Error(`未找到资源类型: ${resourceType}`));
    }
    
    const apiMethod = apiService[operation];
    if (!apiMethod) {
      return Promise.reject(new Error(`未找到操作: ${operation}`));
    }
    
    return apiMethod(...args);
  }
};

export default apiMapper; 