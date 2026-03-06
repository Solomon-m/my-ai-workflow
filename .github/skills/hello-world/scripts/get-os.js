import os from "os";

const systemInfo = {
  platform: os.platform(),
  arch: os.arch(),
  cpus: os.cpus().length,
  totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + " GB",
  freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + " GB",
  hostname: os.hostname(),
  uptime: Math.round(os.uptime() / 3600) + " hours",
  userInfo: os.userInfo(),
};

console.log(JSON.stringify(systemInfo, null, 2));