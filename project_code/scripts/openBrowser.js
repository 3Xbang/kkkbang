const { exec } = require('child_process');
const os = require('os');

// 等待2秒让服务器启动
setTimeout(() => {
  const url = 'http://localhost:5173';
  let command;
  
  switch(os.platform()) {
    case 'darwin':  // macOS
      command = `open ${url}`;
      break;
    case 'win32':   // Windows
      command = `start ${url}`;
      break;
    default:        // Linux
      command = `xdg-open ${url}`;
      break;
  }
  
  console.log(`正在打开浏览器: ${url}`);
  exec(command);
}, 2000); 