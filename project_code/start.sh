#!/bin/bash
echo "===== 启动建筑工程管理系统开发服务器 ====="
npm run dev

# 自动打开浏览器（macOS/Linux）
if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open http://localhost:5173
fi 