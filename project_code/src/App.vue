<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>建筑工程管理系统</h1>
      <nav class="app-nav">
        <router-link to="/">首页</router-link> | 
        <router-link to="/about">关于</router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
    <footer class="app-footer">
      © 2023 3X BANG 建筑工程管理. 保留所有权利.
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  background-color: #1e40af;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  text-align: center;
}

.app-nav {
  margin-top: 15px;
}

.app-nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.app-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.app-nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.app-content {
  background-color: white;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  min-height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.home-view,
.about-view {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
