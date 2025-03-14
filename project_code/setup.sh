#!/bin/bash
echo "===== 开始安装建筑工程管理系统依赖 ====="

# 安装基础依赖
npm install

# 安装特定插件
echo "正在安装FontAwesome..."
npm install @fortawesome/fontawesome-free

echo "正在安装额外UI库..."
npm install element-plus

echo "正在安装其他必要依赖..."
npm install axios
npm install lodash
npm install moment

# 创建必要的目录结构
echo "正在创建资源目录..."
mkdir -p src/assets/images

# 下载示例图片
echo "正在下载示例图片..."
curl -o src/assets/images/hero-building.jpg https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200
curl -o src/assets/images/project1.jpg https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800
curl -o src/assets/images/project2.jpg https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800
curl -o src/assets/images/project3.jpg https://images.unsplash.com/photo-1530334565651-208b8de35df1?q=80&w=800

echo "===== 依赖安装完成! =====" 