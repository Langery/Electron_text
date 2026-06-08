// 全局错误日志: 捕获未处理的 Promise 拒绝 + 同步错误, 写入主进程文件
// 日志路径 (主进程决定): ~/Library/Application Support/electron-ant/logs/error.log
//                       %APPDATA%\electron-ant\logs\error.log  (Windows)
//                       ~/.config/electron-ant/logs/error.log  (Linux)

const writeLog = (line) => {
  if (typeof window !== 'undefined' && window.electronAPI?.writeErrorLog) {
    window.electronAPI.writeErrorLog(line);
  } else {
    // 浏览器 dev 环境 / 未通过 Electron 加载时 fallback 到 console
    // eslint-disable-next-line no-console
    console.error('[Logger]', line);
  }
};

if (typeof window !== 'undefined') {
  // 未处理的 Promise 拒绝 (e.g. await fetch(...) 失败但没 try/catch)
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const stack = reason?.stack || (typeof reason === 'object' ? JSON.stringify(reason) : String(reason));
    writeLog(`[UNHANDLED_REJECTION] ${stack}`);
  });

  // 未捕获的同步错误
  window.addEventListener('error', (event) => {
    const err = event.error;
    const stack = err?.stack || event.message || 'unknown error';
    writeLog(`[JS_ERROR] ${stack}`);
  });
}

// 业务侧主动调用的 logger
export const logger = {
  error: (context, detail) => writeLog(`[ERROR] ${context}: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`),
  warn: (context, detail) => writeLog(`[WARN] ${context}: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`),
  info: (context, detail) => writeLog(`[INFO] ${context}: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`)
};

export default logger;
