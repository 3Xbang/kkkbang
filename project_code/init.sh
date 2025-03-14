#!/bin/bash
echo "===== 建筑工程管理系统一键启动 ====="

# 检查是否需要安装依赖
if [ ! -d "node_modules" ]; then
  echo "首次运行，正在安装依赖..."
  bash setup.sh
else
  echo "依赖已安装，跳过安装步骤..."
fi

# 启动开发服务器
echo "正在启动开发服务器..."
npm run dev:open

echo "===== 程序已启动! =====" 