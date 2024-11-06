module.exports = {
  apps: [
    {
      name: "auth-service",
      script: "./build/server.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};
