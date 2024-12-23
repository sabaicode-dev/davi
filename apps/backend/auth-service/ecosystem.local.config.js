// apps/backend/auth-service/ecosystem.local.config.js

module.exports = {
  apps: [
    {
      name: "auth-service",
      script: "./build/server.js", // Path already correct
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
