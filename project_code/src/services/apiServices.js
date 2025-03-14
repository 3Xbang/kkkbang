import api from './api';

// 1. 权限管理API
export const permissionApi = {
  // 1.1 权限基础操作
  createPermission(data) {
    return api.post('/v1/system/permissions', data);
  },
  
  getPermissions(params) {
    return api.get('/v1/system/permissions', { params });
  },
  
  createRole(data) {
    return api.post('/v1/system/roles', data);
  },
  
  getRoles(params) {
    return api.get('/v1/system/roles', { params });
  },
  
  assignUserRole(data) {
    return api.post('/v1/system/user-roles', data);
  },
  
  // 1.2 高级权限管理
  batchAssignPermissions(data) {
    return api.post('/v1/system/batch-assign', data);
  },
  
  createTemplate(data) {
    return api.post('/v1/system/templates', data);
  },
  
  getTemplates(params) {
    return api.get('/v1/system/templates', { params });
  },
  
  applyTemplate(data) {
    return api.post('/v1/system/templates/apply', data);
  },
  
  createDataRule(data) {
    return api.post('/v1/system/data-rules', data);
  },
  
  getDataRules(params) {
    return api.get('/v1/system/data-rules', { params });
  },
  
  getAuditLogs(params) {
    return api.get('/v1/system/audit-logs', { params });
  }
};

// 2. 文档管理API
export const documentApi = {
  // 2.1 基础操作
  createDocument(data) {
    return api.post('/v1/documents', data);
  },
  
  getDocuments(params) {
    return api.get('/v1/documents', { params });
  },
  
  getDocument(id) {
    return api.get(`/v1/documents/${id}`);
  },
  
  updateDocument(id, data) {
    return api.patch(`/v1/documents/${id}`, data);
  },
  
  deleteDocument(id) {
    return api.delete(`/v1/documents/${id}`);
  },
  
  // 2.2 文档流程
  updateDocumentStatus(id, data) {
    return api.post(`/v1/documents/${id}/status`, data);
  },
  
  setDocumentPermissions(id, data) {
    return api.post(`/v1/documents/${id}/permissions`, data);
  },
  
  createDocumentVersion(id, data) {
    return api.post(`/v1/documents/${id}/versions`, data);
  },
  
  approveDocumentVersion(id, version, data) {
    return api.post(`/v1/documents/${id}/versions/${version}/approve`, data);
  },
  
  borrowDocument(id, data) {
    return api.post(`/v1/documents/${id}/borrow`, data);
  },
  
  returnDocument(id, borrowingId) {
    return api.post(`/v1/documents/${id}/return/${borrowingId}`);
  },
  
  readDocument(id, data) {
    return api.post(`/v1/documents/${id}/read`, data);
  },
  
  archiveDocument(id, data) {
    return api.post(`/v1/documents/${id}/archive`, data);
  },
  
  obsoleteDocument(id, data) {
    return api.post(`/v1/documents/${id}/obsolete`, data);
  },
  
  // 2.3 文档查询与统计
  searchDocuments(params) {
    return api.get('/v1/documents/search', { params });
  },
  
  getDocumentStatsOverview() {
    return api.get('/v1/documents/stats/overview');
  },
  
  getDocumentReport(id) {
    return api.get(`/v1/documents/${id}/report`);
  }
};

// 3. 财务管理API
export const financeApi = {
  // 3.1 预算管理
  createBudget(data) {
    return api.post('/v1/finance/budgets', data);
  },
  
  getBudgets(params) {
    return api.get('/v1/finance/budgets', { params });
  },
  
  getBudget(id) {
    return api.get(`/v1/finance/budgets/${id}`);
  },
  
  updateBudget(id, data) {
    return api.patch(`/v1/finance/budgets/${id}`, data);
  },
  
  approveBudget(id, data) {
    return api.post(`/v1/finance/budgets/${id}/approve`, data);
  },
  
  getBudgetStats() {
    return api.get('/v1/finance/budgets/stats/overview');
  },
  
  // 3.2 成本管理
  createCost(data) {
    return api.post('/v1/finance/costs', data);
  },
  
  getCosts(params) {
    return api.get('/v1/finance/costs', { params });
  },
  
  getCost(id) {
    return api.get(`/v1/finance/costs/${id}`);
  },
  
  updateCost(id, data) {
    return api.patch(`/v1/finance/costs/${id}`, data);
  },
  
  deleteCost(id) {
    return api.delete(`/v1/finance/costs/${id}`);
  },
  
  getCostStats() {
    return api.get('/v1/finance/costs/stats/overview');
  },
  
  getCostTrend() {
    return api.get('/v1/finance/costs/stats/trend');
  },
  
  // 3.3 付款管理
  createPayment(data) {
    return api.post('/v1/finance/payments', data);
  },
  
  getPayments(params) {
    return api.get('/v1/finance/payments', { params });
  },
  
  getPayment(id) {
    return api.get(`/v1/finance/payments/${id}`);
  },
  
  approvePayment(id, data) {
    return api.post(`/v1/finance/payments/${id}/approve`, data);
  },
  
  confirmPayment(id, data) {
    return api.post(`/v1/finance/payments/${id}/confirm`, data);
  },
  
  getPaymentStats() {
    return api.get('/v1/finance/payments/stats/overview');
  },
  
  getPaymentPlan() {
    return api.get('/v1/finance/payments/stats/plan');
  },
  
  // 3.4 发票管理
  createInvoice(data) {
    return api.post('/v1/finance/invoices', data);
  },
  
  getInvoices(params) {
    return api.get('/v1/finance/invoices', { params });
  },
  
  getInvoice(id) {
    return api.get(`/v1/finance/invoices/${id}`);
  },
  
  verifyInvoice(id, data) {
    return api.post(`/v1/finance/invoices/${id}/verify`, data);
  },
  
  cancelInvoice(id, data) {
    return api.post(`/v1/finance/invoices/${id}/cancel`, data);
  },
  
  getInvoiceStats() {
    return api.get('/v1/finance/invoices/stats/overview');
  },
  
  getPendingInvoices() {
    return api.get('/v1/finance/invoices/pending/list');
  }
};

// 4. 供应商管理API
export const supplierApi = {
  // 4.1 基础操作
  createSupplier(data) {
    return api.post('/v1/suppliers', data);
  },
  
  getSuppliers(params) {
    return api.get('/v1/suppliers', { params });
  },
  
  getSupplier(id) {
    return api.get(`/v1/suppliers/${id}`);
  },
  
  updateSupplier(id, data) {
    return api.patch(`/v1/suppliers/${id}`, data);
  },
  
  // 4.2 供应商评估
  addEvaluation(id, data) {
    return api.post(`/v1/suppliers/${id}/evaluations`, data);
  },
  
  addTransaction(id, data) {
    return api.post(`/v1/suppliers/${id}/transactions`, data);
  },
  
  updateCooperation(id, data) {
    return api.patch(`/v1/suppliers/${id}/cooperation`, data);
  },
  
  updateBlacklist(id, data) {
    return api.patch(`/v1/suppliers/${id}/blacklist`, data);
  },
  
  addQualification(id, data) {
    return api.post(`/v1/suppliers/${id}/qualifications`, data);
  },
  
  // 4.3 供应商统计
  getSupplierStats() {
    return api.get('/v1/suppliers/stats/overview');
  },
  
  getExpiredDocs() {
    return api.get('/v1/suppliers/stats/expired-docs');
  }
};

// 5. 设备管理API
export const equipmentApi = {
  // 5.1 基础操作
  createEquipment(data) {
    return api.post('/v1/equipment', data);
  },
  
  getEquipment(params) {
    return api.get('/v1/equipment', { params });
  },
  
  getEquipmentDetail(id) {
    return api.get(`/v1/equipment/${id}`);
  },
  
  updateEquipment(id, data) {
    return api.patch(`/v1/equipment/${id}`, data);
  },
  
  // 5.2 设备使用
  recordUsage(id, data) {
    return api.post(`/v1/equipment/${id}/usage`, data);
  },
  
  recordMaintenance(id, data) {
    return api.post(`/v1/equipment/${id}/maintenance`, data);
  },
  
  getEquipmentStats() {
    return api.get('/v1/equipment/stats/overview');
  }
};

// 6. 考勤管理API
export const attendanceApi = {
  // 6.1 打卡管理
  checkIn(data) {
    return api.post('/v1/attendance/check-in', data);
  },
  
  checkOut(data) {
    return api.post('/v1/attendance/check-out', data);
  },
  
  // 6.2 考勤记录
  getAttendances(params) {
    return api.get('/v1/attendance', { params });
  },
  
  getAttendance(id) {
    return api.get(`/v1/attendance/${id}`);
  },
  
  addWorkContent(id, data) {
    return api.post(`/v1/attendance/${id}/work-content`, data);
  },
  
  recordBreak(id, data) {
    return api.post(`/v1/attendance/${id}/breaks`, data);
  },
  
  recordLeave(id, data) {
    return api.post(`/v1/attendance/${id}/leave`, data);
  },
  
  recordException(id, data) {
    return api.post(`/v1/attendance/${id}/exceptions`, data);
  },
  
  // 6.3 考勤统计
  getEmployeeStats(employeeId, params) {
    return api.get(`/v1/attendance/stats/employee/${employeeId}`, { params });
  },
  
  getProjectStats(projectId, params) {
    return api.get(`/v1/attendance/stats/project/${projectId}`, { params });
  },
  
  getExceptionReport(params) {
    return api.get('/v1/attendance/reports/exceptions', { params });
  }
};

// 7. 项目管理API
export const projectApi = {
  // 7.1 基础操作
  createProject(data) {
    return api.post('/v1/projects', data);
  },
  
  getProjects(params) {
    return api.get('/v1/projects', { params });
  },
  
  getProject(id) {
    return api.get(`/v1/projects/${id}`);
  },
  
  updateProject(id, data) {
    return api.patch(`/v1/projects/${id}`, data);
  },
  
  deleteProject(id) {
    return api.delete(`/v1/projects/${id}`);
  },
  
  // 7.2 项目里程碑
  getMilestones(projectId, params) {
    return api.get(`/v1/projects/${projectId}/milestones`, { params });
  },
  
  createMilestone(projectId, data) {
    return api.post(`/v1/projects/${projectId}/milestones`, data);
  },
  
  // 7.3 项目风险
  getRisks(projectId, params) {
    return api.get(`/v1/projects/${projectId}/risks`, { params });
  },
  
  addRisk(projectId, data) {
    return api.post(`/v1/projects/${projectId}/risks`, data);
  }
};

// 8. 物料管理API
export const materialApi = {
  // 8.1 基础操作
  createMaterial(data) {
    return api.post('/v1/materials', data);
  },
  
  getMaterials(params) {
    return api.get('/v1/materials', { params });
  },
  
  getMaterial(id) {
    return api.get(`/v1/materials/${id}`);
  },
  
  updateMaterial(id, data) {
    return api.patch(`/v1/materials/${id}`, data);
  },
  
  // 8.2 入库出库
  recordInbound(id, data) {
    return api.post(`/v1/materials/${id}/inbound`, data);
  },
  
  recordOutbound(id, data) {
    return api.post(`/v1/materials/${id}/outbound`, data);
  },
  
  // 8.3 物料统计
  getLowStockStats() {
    return api.get('/v1/materials/stats/low-stock');
  },
  
  getMaterialStats() {
    return api.get('/v1/materials/stats/overview');
  }
};

// 导出所有API服务
export default {
  permission: permissionApi,
  document: documentApi,
  finance: financeApi,
  supplier: supplierApi,
  equipment: equipmentApi,
  attendance: attendanceApi,
  project: projectApi,
  material: materialApi
}; 