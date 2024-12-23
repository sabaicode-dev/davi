// apps/backend/auth-service/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "auth-service",
      script: "./server.js", // Correct path to server.js
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
        SERVE_SWAGGER: "true",
      },
    },
  ],
};
